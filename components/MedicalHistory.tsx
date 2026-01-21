
import React, { useState } from 'react';
import { HealthLog } from '../types';

interface MedicalHistoryProps {
  logs: HealthLog[];
  onAdd: (log: Omit<HealthLog, 'id' | 'created_at' | 'user_id'>) => void;
  onDelete: (id: string) => void;
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ logs, onAdd, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<HealthLog, 'id' | 'created_at' | 'user_id'>>({
    date: new Date().toISOString().split('T')[0],
    type: 'symptom',
    title: '',
    description: '',
    severity: 'low',
  });

  const severityColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'symptom',
      title: '',
      description: '',
      severity: 'low',
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Health & Medicine Logs</h1>
          <p className="text-slate-500">Document symptoms, medications, and medical milestones.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
        >
          <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'}`}></i>
          {showForm ? 'Cancel' : 'Add Log Entry'}
        </button>
      </header>

      {showForm && (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 animate-in zoom-in-95 duration-200">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Log Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="symptom">Symptom Observation</option>
                <option value="medicine">Medicine Intake</option>
                <option value="checkup">Medical Checkup</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Migraine Episode"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Severity Level</label>
              <select
                value={formData.severity}
                onChange={e => setFormData({ ...formData, severity: e.target.value as any })}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low (Mild)</option>
                <option value="medium">Medium (Moderate)</option>
                <option value="high">High (Severe)</option>
                <option value="critical">Critical (Emergency)</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700">Description & Details</label>
              <textarea
                placeholder="Describe the symptoms or medication details..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-24 p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {logs.length > 0 ? (
          logs.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(log => (
            <div key={log.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-blue-200 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${log.type === 'medicine' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                    <i className={`fas ${log.type === 'medicine' ? 'fa-pills' : log.type === 'checkup' ? 'fa-user-md' : 'fa-notes-medical'} text-lg`}></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-slate-800 text-lg">{log.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${severityColors[log.severity]}`}>
                        {log.severity}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{log.date} • <span className="capitalize">{log.type}</span></p>
                  </div>
                </div>
                <button
                  onClick={() => onDelete(log.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
              {log.description && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-sm leading-relaxed">
                  {log.description}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="text-slate-200 mb-4 text-6xl">
              <i className="fas fa-book-medical"></i>
            </div>
            <p className="text-slate-500 font-medium">Your health log is empty.</p>
            <p className="text-slate-400 text-sm">Start tracking your health journey today.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
