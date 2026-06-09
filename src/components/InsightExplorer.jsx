import React from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, HelpCircle, Info } from 'lucide-react';

export default function InsightExplorer({ insightId, data, onBack }) {
  // Find the selected insight from our mock data engine
  const insight = data.insights.find((item) => item.id === insightId);

  // Fallback state if no insight is currently active or selected
  if (!insight) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-100 text-center space-y-3 animate-fade-in">
        <HelpCircle size={40} className="mx-auto text-slate-300" />
        <h3 className="text-lg font-semibold text-slate-700">No Insight Selected</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Select an anomaly from your dashboard list to view real-time architectural evidence and missing data variables.
        </p>
      </div>
    );
  }

  // Determine configuration styles based on severity levels
  const isHighSeverity = insight.severity === 'high';

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Navigation Header */}
      <button 
        onClick={onBack}
        className="flex items-center text-sm font-medium text-slate-600 hover:text-chronis-500 transition-colors group"
      >
        <ArrowLeft size={16} className="mr-1.5 group-hover:-translate-x-0.5 transition-transform" /> 
        Back to System Dashboard
      </button>

      {/* Main Insight Title Card */}
      <div className={`p-6 rounded-xl border bg-white shadow-sm ${isHighSeverity ? 'border-l-4 border-l-rose-500 border-slate-100' : 'border-l-4 border-l-amber-500 border-slate-100'}`}>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
            {insight.category}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            insight.confidence >= 80 ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
          }`}>
            Algorithm Confidence: {insight.confidence}%
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">{insight.title}</h2>
        <p className="text-slate-600 mt-2 text-sm leading-relaxed">{insight.summary}</p>
      </div>

      {/* Supporting Evidence Container */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-3">
        <h3 className="text-md font-bold text-slate-800 flex items-center">
          <Info size={18} className="mr-2 text-indigo-500" /> Supporting Telemetry Evidence
        </h3>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
          <p className="text-sm text-slate-700 leading-relaxed font-mono">
            {insight.evidence}
          </p>
        </div>
      </div>

      {/* Uncertainty & Missing Data Explanation Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-3">
        <h3 className="text-md font-bold text-slate-800 flex items-center">
          <AlertCircle size={18} className="mr-2 text-amber-500" /> Data Integrity & Uncertainty Engine
        </h3>
        
        {insight.confidence < 80 ? (
          <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100 flex items-start space-x-3">
            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-800">Incomplete Device Stream Detected</h4>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                {insight.missing_data_explanation}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-green-50/50 rounded-lg border border-green-100 flex items-start space-x-3">
            <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-green-800">Optimal Stream Coverage</h4>
              <p className="text-xs text-green-700 mt-1 leading-relaxed">
                {insight.missing_data_explanation}
              </p>
            </div>
          </div>
        )}
        <p className="text-xs text-slate-400 italic">
          *Chronis algorithm indicators scale automatically dynamically balancing contextual telemetry gaps.
        </p>
      </div>
    </div>
  );
}