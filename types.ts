
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  updated_at: string;
}

// Added missing MedicalRecord interface to fix import error in Dashboard.tsx
export interface MedicalRecord {
  id: string;
  condition: string;
  date: string;
  doctor: string;
}

export interface HealthLog {
  id: string;
  user_id: string;
  date: string;
  type: 'symptom' | 'medicine' | 'checkup' | 'other';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
}

export interface Reminder {
  id: string;
  user_id: string;
  type: 'water' | 'medicine';
  title: string;
  time: string; // HH:mm format
  interval_minutes: number;
  is_active: boolean;
}

export interface SymptomAnalysis {
  assessment: string;
  recommendations: string[];
  cautions: string[];
  disclaimer: string;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  HISTORY = 'HISTORY',
  SYMPTOMS = 'SYMPTOMS',
  REMINDERS = 'REMINDERS'
}