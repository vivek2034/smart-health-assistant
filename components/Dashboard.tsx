
import React from 'react';
import { MedicalRecord, Reminder } from '../types';

interface DashboardProps {
  records: MedicalRecord[];
  reminders: Reminder[];
}

const Dashboard: React.FC<DashboardProps> = ({ records, reminders }) => {
  const activeReminders = reminders.filter(r => r.is_active);
  const recentRecords = records.slice(0, 3);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Health Overview</h1>
        <p className="text-slate-500">Welcome back. Here is a summary of your health data.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl">
            <i className="fas fa-file-medical text-blue-600 text-xl"></i>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Records</p>
            <p className="text-2xl font-bold text-slate-800">{records.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <i className="fas fa-clock text-green-600 text-xl"></i>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Reminders</p>
            <p className="text-2xl font-bold text-slate-800">{activeReminders.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-xl">
            <i className="fas fa-shield-alt text-purple-600 text-xl"></i>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account Status</p>
            <p className="text-2xl font-bold text-slate-800">Healthy</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Reminders */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Today's Reminders</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {activeReminders.length > 0 ? (
              activeReminders.map(r => (
                <div key={r.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${r.type === 'water' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                      <i className={`fas ${r.type === 'water' ? 'fa-tint' : 'fa-pills'}`}></i>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{r.title}</p>
                      <p className="text-xs text-slate-500">Scheduled for {r.time}</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-green-500">
                    <i className="far fa-check-circle text-xl"></i>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-8 italic text-sm">No active reminders for today.</p>
            )}
          </div>
        </section>

        {/* Recent Medical History */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Recent Medical Entries</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">View Full History</button>
          </div>
          <div className="space-y-4">
            {recentRecords.length > 0 ? (
              recentRecords.map(rec => (
                <div key={rec.id} className="border-l-4 border-blue-500 bg-slate-50 p-4 rounded-r-xl">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-slate-800">{rec.condition}</p>
                    <span className="text-xs text-slate-400">{rec.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Doctor: {rec.doctor}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-8 italic text-sm">No medical records found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
