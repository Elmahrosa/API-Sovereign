
import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Gavel, 
  FileCode, 
  Bot, 
  Menu, 
  X, 
  ShieldCheck, 
  Globe,
  History,
  Settings as SettingsIcon,
  Crown,
  User as UserIcon,
  Lock
} from 'lucide-react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wallet' as Page, label: 'Wallet & Assets', icon: Wallet },
    { id: 'governance' as Page, label: 'Governance', icon: Gavel },
    { id: 'docs' as Page, label: 'API Reference', icon: FileCode },
    { id: 'ai-assistant' as Page, label: 'AI Auditor', icon: Bot },
    { id: 'audit-logs' as Page, label: 'Audit Logs', icon: History },
    { id: 'settings' as Page, label: 'Founder Controls', icon: SettingsIcon },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 selection:bg-amber-500/30">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 border-r border-slate-800 bg-slate-900 flex flex-col fixed h-full z-50`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="bg-amber-500 p-2 rounded-lg shadow-lg shadow-amber-500/20">
            <ShieldCheck className="text-slate-950 w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-xl tracking-tight text-amber-500">
              ELMAHROSA
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activePage === item.id 
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-lg shadow-amber-500/5' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
           {isSidebarOpen && (
            <div className="mb-4 px-2 py-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-xs">AS</div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold truncate text-slate-100">Ayman Seif</p>
                  <p className="text-[10px] text-amber-500 font-bold truncate tracking-tighter uppercase">Founder / Sovereign</p>
                </div>
              </div>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex justify-center p-2 text-slate-500 hover:text-slate-100 transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Navigation</span>
            <span className="text-sm font-bold text-slate-100 capitalize">{activePage.replace('-', ' ')}</span>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-lg text-[10px] font-black border border-amber-500/20 uppercase tracking-widest shadow-lg shadow-amber-500/5">
              <Crown className="w-3.5 h-3.5" />
              Founder Access
            </div>
             <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-lg text-[10px] font-bold border border-green-500/20 uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              Mainnet Sovereign
            </div>
            
            <div className="h-8 w-px bg-slate-800 mx-2"></div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-100">Ayman Seif</p>
                <p className="text-[10px] text-slate-500 font-medium">aams1969@gmail.com</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-amber-500 shadow-xl overflow-hidden group cursor-pointer hover:border-amber-500 transition-all">
                <UserIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 pb-32">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
