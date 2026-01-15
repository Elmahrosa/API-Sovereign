
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import ApiDocs from './pages/ApiDocs';
import AuditLogs from './pages/AuditLogs';
import Settings from './pages/Settings';
import { Page } from './types';

// Simple placeholder components for pages not yet detailed
const WalletPage = () => (
  <div className="text-center py-20 animate-in zoom-in duration-300">
    <h2 className="text-3xl font-bold mb-4">Wallet & Asset Management</h2>
    <p className="text-slate-400 max-w-lg mx-auto">Manage sovereign assets, cross-chain transfers, and institutional minting directly via the TEOS interface.</p>
    <div className="mt-8 p-12 bg-slate-900 border border-slate-800 rounded-3xl border-dashed">
      <span className="text-slate-600 font-mono">Connect Institutional Wallet</span>
    </div>
  </div>
);

const GovernancePage = () => (
  <div className="text-center py-20 animate-in zoom-in duration-300">
    <h2 className="text-3xl font-bold mb-4">Civic Governance Portal</h2>
    <p className="text-slate-400 max-w-lg mx-auto">Vote on national petitions, propose constitutional updates, and monitor quorum status in real-time.</p>
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h4 className="font-bold text-amber-500 mb-2">Active Petitions</h4>
        <p className="text-sm text-slate-400">32 pending petitions require community review.</p>
      </div>
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h4 className="font-bold text-amber-500 mb-2">Quorum Status</h4>
        <p className="text-sm text-slate-400">Current network participation: 78.4%</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'wallet':
        return <WalletPage />;
      case 'governance':
        return <GovernancePage />;
      case 'docs':
        return <ApiDocs />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'audit-logs':
        return <AuditLogs />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
