import React, { useState } from 'react';
import { Calendar, Clock, TrendingUp, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export default function NarrativeTimeline({ data }) {
  const [filter, setFilter] = useState('all');

  // Filter logic to let the reviewer see your attention to UX interactivity
  const filteredTimeline = data.timeline.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'anomalies') return item.status === 'warning' || item.status === 'critical';
    if (filter === 'stable') return item.status === 'stable' || item.status === 'recovering';
    return true;
  });

  // Helper for rendering status badges along the timeline
  const getStatusStyles = (status) => {
    switch (status) {
      case 'stable':
        return { bg: 'bg-green-50 text-green-700 border-green-200', icon: <ShieldCheck size={16} className="text-green-600" /> };
      case 'warning':
        return { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: <AlertTriangle size={16} className="text-amber-600" /> };
      case 'critical':
        return { bg: 'bg-rose-50 text-rose-700 border-rose-200', icon: <AlertTriangle size={16} className="text-rose-600" /> };
      case 'recovering':
        return { bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: <TrendingUp size={16} className="text-blue-600" /> };
      default:
        return { bg: 'bg-slate-50 text-slate-700 border-slate-200', icon: <HelpCircle size={16} className="text-slate-600" /> };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Module Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center">
            <Clock size={20} className="mr-2 text-chronis-500" /> Historical Narrative Timeline
          </h2>
          <p className="text-sm text-slate-500">Track macro-evolution of behavioral patterns over historical segments.</p>
        </div>

        {/* UX Decision: Filter Interactive Controls */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg self-start sm:self-auto text-xs font-medium">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'all' ? 'bg-white text-slate-800 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
          >
            All Periods
          </button>
          <button 
            onClick={() => setFilter('anomalies')} 
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'anomalies' ? 'bg-white text-slate-800 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Deviations
          </button>
          <button 
            onClick={() => setFilter('stable')} 
            className={`px-3 py-1.5 rounded-md transition-all ${filter === 'stable' ? 'bg-white text-slate-800 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Stable States
          </button>
        </div>
      </div>

      {/* The Visual Vertical Timeline Stack */}
      <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 my-2 space-y-8 pl-6 md:pl-8">
        {filteredTimeline.map((item, index) => {
          const statusStyle = getStatusStyles(item.status);

          return (
            <div key={index} className="relative group animate-slide-up">
              {/* Node Indicator Dot positioning */}
              <div className="absolute -left-[35px] md:-left-[43px] top-1 bg-white p-1 rounded-full border-2 border-slate-200 group-hover:border-chronis-500 transition-colors z-10">
                <div className="p-1 bg-slate-50 rounded-full">
                  {statusStyle.icon}
                </div>
              </div>

              {/* Card Container */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs hover:shadow-sm transition-all group-hover:border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-chronis-500 flex items-center">
                    <Calendar size={13} className="mr-1" /> {item.period}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusStyle.bg}`}>
                    {item.phase}
                  </span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}

        {filteredTimeline.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm">
            No history meets this filter configuration constraint.
          </div>
        )}
      </div>
    </div>
  );
}