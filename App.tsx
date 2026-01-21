
import React, { useState, useEffect } from 'react';
import { HealthLog, Reminder, ViewState, Profile, MedicalRecord } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import SymptomChecker from './components/SymptomChecker';
import MedicalHistory from './components/MedicalHistory';
import Reminders from './components/Reminders';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>(ViewState.DASHBOARD);
  const [user] = useState<Profile>({
    id: 'u-123',
    email: 'sarah.jones@example.com',
    full_name: 'Sarah Jones',
    updated_at: new Date().toISOString()
  });

  // LocalStorage Persistence Layer
  const [logs, setLogs] = useState<HealthLog[]>(() => {
    const saved = localStorage.getItem('v_health_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('v_reminders');
    return saved ? JSON.parse(saved) : [
      { id: 'r1', user_id: 'u-123', type: 'water', title: 'Daily Hydration', time: '09:00', interval_minutes: 60, is_active: true },
    ];
  });

  useEffect(() => {
    localStorage.setItem('v_health_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('v_reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Web Notification Scheduler
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentH = now.getHours().toString().padStart(2, '0');
      const currentM = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${currentH}:${currentM}`;

      reminders.forEach(reminder => {
        if (reminder.is_active && reminder.time === currentTime) {
          if (Notification.permission === 'granted') {
            new Notification(`VitalityAI: ${reminder.title}`, {
              body: reminder.type === 'water' ? "Time to drink a glass of water!" : "It's time for your scheduled medication.",
              icon: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png'
            });
          }
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [reminders]);

  // Handlers for CRUD
  const handleAddLog = (data: Omit<HealthLog, 'id' | 'created_at' | 'user_id'>) => {
    const newLog: HealthLog = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      user_id: user.id,
      created_at: new Date().toISOString()
    };
    setLogs([newLog, ...logs]);
  };

  const handleDeleteLog = (id: string) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  const handleAddReminder = (data: Omit<Reminder, 'id' | 'user_id' | 'is_active'>) => {
    const newReminder: Reminder = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      user_id: user.id,
      is_active: true
    };
    setReminders([...reminders, newReminder]);
  };

  const handleToggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, is_active: !r.is_active } : r));
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const renderContent = () => {
    switch (activeView) {
      case ViewState.DASHBOARD:
        // Map logs to MedicalRecord interface format for Dashboard component
        const records: MedicalRecord[] = logs.map(l => ({
          id: l.id,
          condition: l.title,
          date: l.date,
          doctor: l.description.substring(0, 30) || 'Observation'
        }));
        return <Dashboard records={records} reminders={reminders} />;
      case ViewState.SYMPTOMS:
        return <SymptomChecker />;
      case ViewState.HISTORY:
        return <MedicalHistory logs={logs} onAdd={handleAddLog} onDelete={handleDeleteLog} />;
      case ViewState.REMINDERS:
        return <Reminders reminders={reminders} onAdd={handleAddReminder} onToggle={handleToggleReminder} onDelete={handleDeleteReminder} />;
      default:
        return <Dashboard records={[]} reminders={reminders} />;
    }
  };

  return (
    <Layout activeView={activeView} onNavigate={setActiveView} user={user}>
      {renderContent()}
    </Layout>
  );
};

export default App;