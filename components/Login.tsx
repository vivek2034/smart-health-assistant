
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (fullName: string, email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && email) {
      onLogin(fullName, email);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-blue-600 p-4 rounded-2xl shadow-xl shadow-blue-200 mb-6">
            <i className="fas fa-heartbeat text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome to VitalityAI</h1>
          <p className="text-slate-500 mt-2">Your smart personal health assistant</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Sign In / Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
            >
              Get Started
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-center text-xs text-slate-400 leading-relaxed">
              By continuing, you agree to VitalityAI's Terms of Service and Privacy Policy. 
              Your health data is stored locally in your browser for privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
