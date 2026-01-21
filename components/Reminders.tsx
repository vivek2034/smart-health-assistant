
import React, { useState } from 'react';
import { Reminder } from '../types.ts';

interface RemindersProps {
  reminders: Reminder[];
  onAdd: (reminder: Omit<Reminder, 'id' | 'user_id' | 'is_active'>) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const Reminders: React.FC<RemindersProps> = ({ reminders, onAdd, onToggle, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>(Notification.permission);
  const [formData, setFormData] = useState({
    type: 'water' as 'water' | 'medicine',
    title: '',
    time: '09:00',
    interval_minutes: 60,
  });

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      type: 'water',
      title: '',
      time: '09:00',
      interval_minutes: 60,
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Health Reminders</h1>
          <p className="text-slate-500">Schedule custom alerts for hydration and medication.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
        >
          <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'}`}></i>
          {showForm ? 'Cancel' : 'Add Reminder'}
        </button>
      </header>

      {permission !== 'granted' && (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-xl text-yellow-700">
              <i className="fas fa-bell-slash text-xl"></i>
            </div>
            <div>
              <p className="font-bold text-yellow-800 text-sm">Notifications are disabled</p>
              <p className="text-xs text-yellow-700">Enable browser notifications to receive timely health alerts.</p>
            </div>
          </div>
          <button
            onClick={requestPermission}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-700 transition-colors"
          >
            Enable Notifications
          </button>
        </div>
      )}

      {showForm && (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 animate-in zoom-in-95 duration-200">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="water">Water Intake</option>
                <option value="medicine">Medicine / Supplement</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Reminder Title</label>
              <input
                type="text"
                required
                placeholder={formData.type === 'water' ? 'Drink Water' : 'Take Aspirin'}
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Start Time</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Repeat Interval (minutes)</label>
              <input
                type="number"
                min="0"
                placeholder="0 for once a day"
                value={formData.interval_minutes}
                onChange={e => setFormData({ ...formData, interval_minutes: parseInt(e.target.value) || 0 })}
                className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2 flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Create Reminder
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders.length > 0 ? (
          reminders.map(reminder => (
            <div key={reminder.id} className={`bg-white p-6 rounded-2xl shadow-sm border ${reminder.is_active ? 'border-slate-100' : 'border-slate-200 opacity-60'} transition-all`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl ${reminder.type === 'water' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                  <i className={`fas ${reminder.type === 'water' ? 'fa-tint' : 'fa-pills'} text-xl`}></i>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggle(reminder.id)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${reminder.is_active ? 'bg-green-500' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${reminder.is_active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                  <button
                    onClick={() => onDelete(reminder.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-slate-800 text-lg mb-1">{reminder.title}</h3>
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-4">
                {reminder.type === 'water' ? 'Hydration' : 'Medication'}
              </p>

              <div className="flex items-center gap-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <i className="far fa-clock"></i>
                  <span>{reminder.time}</span>
                </div>
                {reminder.interval_minutes > 0 && (
                  <>
                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-redo-alt"></i>
                      <span>Every {reminder.interval_minutes}m</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-3 text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="text-slate-300 mb-4">
              <i className="fas fa-bell text-6xl"></i>
            </div>
            <p className="text-slate-500 font-medium">No reminders set.</p>
            <p className="text-slate-400 text-sm">Stay healthy by scheduling alerts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminders;
