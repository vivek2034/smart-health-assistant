
import React, { useEffect, useRef } from 'react';

// Extend the global Window interface to include the 'google' property provided by Google Identity Services
declare global {
  interface Window {
    google: any;
  }
}

interface LoginProps {
  onLogin: (fullName: string, email: string, avatar?: string) => void;
}

// Manual JWT decoder to extract user info from Google's credential string
const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode Google JWT", e);
    return null;
  }
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Google Identity Services
    const initializeGSI = () => {
      // Fix: Property 'google' does not exist on type 'Window & typeof globalThis'
      if (window.google) {
        window.google.accounts.id.initialize({
          // This would be your real Google Client ID from Google Cloud Console
          client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com", 
          callback: (response: any) => {
            const payload = decodeJwt(response.credential);
            if (payload) {
              onLogin(
                payload.name || "Google User",
                payload.email,
                payload.picture
              );
            }
          },
          auto_select: false,
          itp_support: true,
        });

        if (googleBtnRef.current) {
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'outline',
            size: 'large',
            width: 350,
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left'
          });
        }
        
        // Optional: Display the One Tap prompt
        window.google.accounts.id.prompt();
      }
    };

    // Small delay to ensure the script from index.html is fully parsed
    const timer = setTimeout(initializeGSI, 500);
    return () => clearTimeout(timer);
  }, [onLogin]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-blue-600 p-4 rounded-2xl shadow-xl shadow-blue-200 mb-6">
            <i className="fas fa-heartbeat text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">VitalityAI</h1>
          <p className="text-slate-500 mt-2">Your smart personal health assistant</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Sign In</h2>
          <p className="text-sm text-slate-500 mb-8">Securely access your health data using Google.</p>
          
          <div className="space-y-6">
            {/* The official Google Sign-In Button will be rendered here */}
            <div className="flex justify-center" ref={googleBtnRef}></div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium tracking-widest">Or</span>
              </div>
            </div>

            <button
              onClick={() => onLogin("Guest User", "guest@vitality.ai")}
              className="w-full py-3 rounded-xl font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-sm"
            >
              Continue as Guest
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50">
            <div className="flex items-start gap-4 text-[10px] text-slate-400 leading-relaxed">
              <i className="fas fa-lock text-slate-300 text-sm mt-0.5"></i>
              <p>
                By signing in, you agree to our privacy policy. VitalityAI stores your medical logs locally in your browser and never shares identifiable health data with Google.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
