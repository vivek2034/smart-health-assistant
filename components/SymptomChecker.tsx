
import React, { useState } from 'react';
import { analyzeSymptoms } from '../services/geminiService';
import { SymptomAnalysis } from '../types';

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomAnalysis | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    setError('');
    try {
      const analysis = await analyzeSymptoms(symptoms);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">AI Symptom Checker</h1>
        <p className="text-slate-500">Describe your symptoms to receive an AI-powered preliminary assessment.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Describe how you feel</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., I have been feeling a dull headache behind my eyes for the past 2 days, accompanied by mild nausea..."
              className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading || !symptoms.trim()}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
              loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
            }`}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <i className="fas fa-search-plus"></i>
                Start Analysis
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-3">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Analysis Card */}
          <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-clipboard-check"></i>
              Assessment Summary
            </h3>
            <p className="leading-relaxed opacity-90">{result.assessment}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recommendations */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fas fa-lightbulb text-yellow-500"></i>
                Recommendations
              </h4>
              <ul className="space-y-3">
                {result.recommendations.map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-3">
                    <span className="text-blue-500 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cautions */}
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <h4 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle"></i>
                Important Cautions
              </h4>
              <ul className="space-y-3">
                {result.cautions.map((item, i) => (
                  <li key={i} className="text-sm text-orange-700 flex gap-3">
                    <i className="fas fa-caret-right mt-1"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-slate-800 text-slate-300 p-6 rounded-xl text-xs flex gap-4">
            <i className="fas fa-info-circle text-slate-500 text-lg mt-0.5"></i>
            <div>
              <p className="font-bold text-slate-100 mb-1 uppercase tracking-widest">Medical Disclaimer</p>
              <p className="italic opacity-80">{result.disclaimer}</p>
              <p className="mt-2 text-blue-400 font-semibold">In case of emergency, call 911 immediately.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
