import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Moon, Brain, ShieldAlert } from 'lucide-react';

export default function Dashboard({ data, onSelectInsight }) {
  const { user_profile, dashboard_summary, trends, insights } = data;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-chronis-900 to-chronis-500 rounded-2xl p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold">Welcome back, {user_profile.name}</h1>
        <p className="text-blue-100 mt-1">
          Tracking baseline data integrity since {user_profile.tracking_since} • System Confidence: 
          <span className="ml-1 bg-green-500/30 text-green-300 px-2 py-0.5 rounded-full text-xs font-semibold border border-green-500/40">
            {user_profile.confidence_rating}
          </span>
        </p>
      </div>

      {/* Summary Status Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4">
          <div className="p-3 bg-purple-50 rounded-lg text-purple-600"><Brain size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Cognitive Focus Status</p>
            <p className="text-lg font-semibold text-slate-800 mt-1">{dashboard_summary.focus_status}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><Moon size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Sleep Architecture</p>
            <p className="text-lg font-semibold text-slate-800 mt-1">{dashboard_summary.sleep_status}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4">
          <div className="p-3 bg-rose-50 rounded-lg text-rose-600"><Activity size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Stress Baseline</p>
            <p className="text-lg font-semibold text-slate-800 mt-1">{dashboard_summary.stress_status}</p>
          </div>
        </div>
      </div>

      {/* Interactive Trend Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">Behavioral Trend Insights</h2>
          <p className="text-sm text-slate-500">Correlation tracking across focus scores, stress, and sleep metrics.</p>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line type="monotone" dataKey="focus_score" name="Focus Score" stroke="#6366f1" strokeWidth={3} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="stress_level" name="Stress Level" stroke="#f43f5e" strokeWidth={2} />
              <Line type="monotone" dataKey="sleep_hours" name="Sleep (Hrs × 10)" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Actionable Insights Preview List */}
      <div className="space-y-3">
        <h3 className="text-md font-bold text-slate-700 flex items-center">
          <ShieldAlert size={18} className="mr-2 text-chronis-500" /> Urgent Discovered Anomalies
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {insights.map((insight) => (
            <div 
              key={insight.id}
              onClick={() => onSelectInsight(insight.id)}
              className="bg-white p-4 rounded-xl border border-slate-100 hover:border-chronis-500 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md flex justify-between items-center group"
            >
              <div className="space-y-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  insight.severity === 'high' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                }`}>
                  {insight.category} • Confidence {insight.confidence}%
                </span>
                <h4 className="font-semibold text-slate-800 group-hover:text-chronis-500 transition-colors">
                  {insight.title}
                </h4>
                <p className="text-sm text-slate-500 line-clamp-1">{insight.summary}</p>
              </div>
              <span className="text-chronis-500 font-medium text-sm group-hover:translate-x-1 transition-transform pl-4">
                Explore →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}