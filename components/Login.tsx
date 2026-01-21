
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (fullName: string, email: string, avatar?: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSimulating, setIsSimulating] = useState(false);

  // This simulates the Google Auth Popup for the demo environment
  const handleGoogleSignIn = () => {
    setIsSimulating(true);
    
    // Simulate a short network delay
    setTimeout(() => {
      setIsSimulating(false);
      // In a real app, this data would come from the Google JWT decode
      onLogin(
        "User Name", 
        "user@gmail.com", 
        "https://lh3.googleusercontent.com/a/default-user=s96-c"
      );
    }, 1200);
  };

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

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
          {isSimulating && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-bold text-slate-700">Connecting to Google...</p>
            </div>
          )}

          <h2 className="text-xl font-bold text-slate-800 mb-2">Sign In</h2>
          <p className="text-sm text-slate-500 mb-8">Access your health records and AI analysis securely.</p>
          
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium tracking-widest">Or continue as</span>
              </div>
            </div>

            <button
              onClick={() => onLogin("Guest User", "guest@vitality.ai")}
              className="w-full py-3.5 rounded-xl font-bold text-blue-600 border border-blue-50 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              Guest Access
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <i className="fas fa-shield-alt text-slate-300 text-base"></i>
              <p>Your connection is encrypted. We never share your medical data with Google or third parties.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
