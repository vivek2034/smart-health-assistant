
import React from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
  user: any;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, user }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-auto md:h-screen z-50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
              <i className="fas fa-heartbeat text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-slate-800">VitalityAI</span>
          </div>

          <div className="space-y-2">
            {[
              { id: ViewState.DASHBOARD, label: 'Dashboard', icon: 'fa-th-large' },
              { id: ViewState.SYMPTOMS, label: 'AI Symptom Checker', icon: 'fa-robot' },
              { id: ViewState.HISTORY, label: 'Medical History', icon: 'fa-file-medical' },
              { id: ViewState.REMINDERS, label: 'Health Reminders', icon: 'fa-bell' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <i className={`fas ${item.icon} w-5`}></i>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.full_name || 'User'}&background=0D8ABC&color=fff`}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-slate-200"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 truncate">{user?.full_name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button className="w-full text-left text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-2">
            <i className="fas fa-sign-out-alt"></i>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
