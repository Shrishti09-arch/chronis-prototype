import React, { useState } from 'react';
import mockData from './mockData.json';
import Dashboard from './components/Dashboard';
import InsightExplorer from './components/InsightExplorer';
import NarrativeTimeline from './components/NarrativeTimeline';
import { LayoutDashboard, Compass, Milestone, BrainCircuit } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInsightId, setSelectedInsightId] = useState(null);

  // UX Shortcut: Allows Dashboard interaction to jump straight into a specific insight deep-dive
  const handleSelectInsight = (id) => {
    setSelectedInsightId(id);
    setActiveTab('explorer');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased font-sans">
      
      {/* Universal Top Application Bar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-sky-500 rounded-lg text-white">
              <BrainCircuit size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-800">
              CHRONIS <span className="text-xs font-semibold text-indigo-500 px-1.5 py-0.5 bg-indigo-50 rounded ml-1 border border-indigo-100">PROTOTYPE</span>
            </span>
          </div>
          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            Chronis App Selection Track C Assessment
          </div>
        </div>
      </header>

      {/* Main Content & Navigation Wrapper */}
      <div className="max-w-6xl w-full mx-auto px-4 py-6 flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Navigation Control Panel */}
        <nav className="md:col-span-1 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible space-x-2 md:space-x-0 md:space-y-1 bg-white md:bg-transparent p-2 md:p-0 rounded-xl border border-slate-100 md:border-none sticky top-20 h-fit">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all w-full ${
              activeTab === 'dashboard' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => {
              // Retain last selected insight view context if it exists, otherwise fallbacks safely
              setActiveTab('explorer');
            }}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all w-full ${
              activeTab === 'explorer' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Compass size={18} />
            <span>Insight Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all w-full ${
              activeTab === 'timeline' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Milestone size={18} />
            <span>Narrative Timeline</span>
          </button>
        </nav>

        {/* Dynamic Window Component Render Area */}
        <main className="md:col-span-3">
          {activeTab === 'dashboard' && (
            <Dashboard 
              data={mockData} 
              onSelectInsight={handleSelectInsight} 
            />
          )}
          
          {activeTab === 'explorer' && (
            <InsightExplorer 
              insightId={selectedInsightId} 
              data={mockData} 
              onBack={() => setActiveTab('dashboard')} 
            />
          )}
          
          {activeTab === 'timeline' && (
            <NarrativeTimeline 
              data={mockData} 
            />
          )}
        </main>
      </div>

      {/* Subtle Footer branding */}
      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-100 bg-white mt-12">
        Designed by Shrishti Vaishnav for Chronis Internship Track Assessment. All rights reserved.
      </footer>
    </div>
  );
}