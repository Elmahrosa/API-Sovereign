
import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Plus, 
  Eye, 
  EyeOff, 
  Trash2, 
  Shield, 
  RefreshCw, 
  Copy, 
  Check, 
  Globe, 
  Languages, 
  Zap, 
  Lock,
  Loader2,
  Sparkles,
  X,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Activity,
  Crown,
  Heart,
  TrendingUp,
  Fingerprint,
  ArrowRightLeft,
  List,
  Network
} from 'lucide-react';
import { ApiKey, ApiKeyDetails } from '../types';
import { translateCivicText } from '../services/geminiService';

const mockKeys: ApiKey[] = [
  { id: '1', name: 'Main Sovereign Hub', key: 'elm_prod_ayman_seif_mainnet_auth', role: 'Institution', createdAt: '2024-05-20', lastUsed: 'Just Now' },
  { id: '2', name: 'Global Translation API', key: 'elm_inst_i18n_v1_83hf02j8f02j3f', role: 'Institution', createdAt: '2024-05-18', lastUsed: '1h ago' },
];

const languages = [
  { code: 'English', name: 'Global English' },
  { code: 'Classical Arabic', name: 'Classical Arabic' },
  { code: 'French', name: 'French (Institutional)' },
  { code: 'Spanish', name: 'Spanish (Official)' },
  { code: 'Mandarin Chinese', name: 'Mandarin (Administrative)' },
];

const Settings: React.FC = () => {
  const [keys, setKeys] = useState<ApiKey[]>(mockKeys);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Persistent Auth State
  const [isPersistent, setIsPersistent] = useState(true);
  
  // Key Generation State
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyRole, setNewKeyRole] = useState<'Public' | 'Authenticated' | 'Institution'>('Institution');
  const [newKeyScopes, setNewKeyScopes] = useState('read:civic, write:governance');
  const [newKeyIPs, setNewKeyIPs] = useState('0.0.0.0/0');
  const [generatedKeyResult, setGeneratedKeyResult] = useState<{key: ApiKey, details: ApiKeyDetails} | null>(null);

  // Elmahrosa International State
  const [transInput, setTransInput] = useState('Welcome to the Sovereign Era of Digital Infrastructure. Founded by Ayman Seif.');
  const [transOutput, setTransOutput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Classical Arabic');

  const toggleVisibility = (id: string) => {
    const next = new Set(visibleKeys);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setVisibleKeys(next);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateSecureKey = (prefix: string) => {
    const bytes = new Uint8Array(24);
    window.crypto.getRandomValues(bytes);
    const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    return `elm_${prefix}_${hex}`;
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const prefix = newKeyRole === 'Institution' ? 'inst' : newKeyRole === 'Authenticated' ? 'auth' : 'pub';
    const fullKeyString = generateSecureKey(prefix);
    
    const id = Math.random().toString(36).substring(7);
    const now = new Date().toISOString();
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);

    const newKey: ApiKey = {
      id,
      name: newKeyName,
      key: fullKeyString,
      role: newKeyRole,
      createdAt: now.split('T')[0],
      lastUsed: 'Never',
    };

    const details: ApiKeyDetails = {
      id,
      name: newKeyName,
      role: newKeyRole,
      scopes: newKeyScopes.split(',').map(s => s.trim()).filter(s => s),
      ipWhitelist: newKeyIPs.split(',').map(s => s.trim()).filter(s => s),
      rotatedAt: now,
      expiresAt: expiry.toISOString(),
      status: 'active'
    };

    setKeys([newKey, ...keys]);
    setGeneratedKeyResult({ key: newKey, details });
    setIsCreating(false);
    
    // Reset form
    setNewKeyName('');
    setNewKeyScopes('read:civic, write:governance');
    setNewKeyIPs('0.0.0.0/0');
  };

  const handleTranslateAction = async () => {
    if (!transInput.trim()) return;
    setIsTranslating(true);
    try {
      const res = await translateCivicText(transInput, sourceLang, targetLang);
      setTransOutput(res || '');
    } catch (e) {
      setTransOutput('Sovereign Intelligence failure. Check network integrity.');
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* FOUNDER'S CORNER */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-500/10 border border-slate-800 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform rotate-12">
          <Crown size={300} className="text-amber-500" />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-xl">
                  <Crown className="text-slate-950 w-6 h-6" />
                </div>
                <h2 className="text-4xl font-black tracking-tight text-white uppercase italic">Founder's Dashboard</h2>
              </div>
              <p className="text-slate-400 font-medium">Sovereign Principal: <span className="text-amber-500 font-bold">Ayman Seif</span> (aams1969@gmail.com)</p>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
               <div className="text-right">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Status</p>
                  <p className="text-lg font-bold text-green-500 uppercase tracking-tighter">Ready for Launch</p>
               </div>
               <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95 uppercase tracking-[0.1em] text-sm">
                  Launch Elmahrosa
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl space-y-2 group hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between">
                <TrendingUp className="text-amber-500 w-5 h-5" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Health</span>
              </div>
              <p className="text-3xl font-black text-white tabular-nums">100.0%</p>
              <p className="text-xs text-slate-500 font-medium italic">Sovereign infrastructure stable</p>
            </div>
            <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl space-y-2 group hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between">
                <Heart className="text-red-500 w-5 h-5" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network Pulse</span>
              </div>
              <p className="text-3xl font-black text-white tabular-nums">4.2k <span className="text-sm font-medium text-slate-500">tps</span></p>
              <p className="text-xs text-slate-500 font-medium italic">Peak institutional throughput</p>
            </div>
            <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-3xl space-y-2 group hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between">
                <Fingerprint className="text-blue-500 w-5 h-5" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Persistent Identity</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold text-slate-300 italic">Always Logged In</span>
                <div 
                  onClick={() => setIsPersistent(!isPersistent)}
                  className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${isPersistent ? 'bg-green-500' : 'bg-slate-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isPersistent ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Global API Key Management */}
          <section className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Key className="text-amber-500 w-6 h-6" />
                Infrastructure Gateways
              </h3>
              <button 
                onClick={() => { setIsCreating(true); setGeneratedKeyResult(null); }}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500 text-amber-500 px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-xl"
              >
                <Plus className="w-5 h-5" /> New Gateway
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl divide-y divide-slate-800/50">
              {keys.length > 0 ? keys.map((key) => (
                <div key={key.id} className="p-10 hover:bg-slate-800/20 transition-all group">
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="space-y-6 flex-1">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${key.role === 'Institution' ? 'bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                          <ShieldCheck className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-100 text-2xl tracking-tight">{key.name}</h4>
                          <span className="inline-block mt-1 px-3 py-1 bg-slate-950 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg border border-slate-800">
                            {key.role} Control
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-slate-950/80 border border-slate-800 rounded-2xl px-6 py-5 font-mono text-sm flex items-center justify-between group-hover:border-amber-500/30 transition-all shadow-inner">
                        <span className="truncate text-slate-500 group-hover:text-slate-300 transition-colors">
                          {visibleKeys.has(key.id) ? key.key : '••••••••••••••••••••••••••••••••••••••••'}
                        </span>
                        <div className="flex items-center gap-3 shrink-0 ml-6">
                          <button onClick={() => toggleVisibility(key.id)} className="p-3 hover:bg-slate-800 rounded-xl text-slate-500 hover:text-amber-500 transition-all">
                            {visibleKeys.has(key.id) ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                          <button onClick={() => copyToClipboard(key.id, key.key)} className="p-3 hover:bg-slate-800 rounded-xl text-slate-500 hover:text-amber-500 transition-all">
                            {copiedId === key.id ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-10 text-[10px] uppercase font-black tracking-[0.25em] text-slate-600">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-700">Creation:</span>
                          <span className="text-slate-400 font-mono">{key.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-700">Telemetry:</span>
                          <span className="text-slate-400 font-mono">{key.lastUsed}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-3 justify-end">
                      <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-slate-100 transition-all text-xs font-black uppercase tracking-widest border border-slate-700 hover:border-slate-500 shadow-xl">
                        <RefreshCw className="w-4 h-4" /> Cycle
                      </button>
                      <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-slate-950 transition-all text-xs font-black uppercase tracking-widest border border-red-500/20 shadow-xl">
                        <Trash2 className="w-4 h-4" /> Revoke
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-20 text-center text-slate-500 italic">No gateways configured. Issue your first sovereign key.</div>
              )}
            </div>
          </section>

          {/* Elmahrosa International */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Globe className="text-blue-500 w-6 h-6" />
                Elmahrosa International
              </h3>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/5 rounded-full border border-blue-500/10 text-[10px] font-black uppercase tracking-[0.15em] text-blue-400">
                <Sparkles className="w-4 h-4" /> Sovereign Translation
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] shadow-2xl space-y-10">
              <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-slate-800">
                <div className="flex-1 w-full space-y-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-1">Source Language</label>
                  <select 
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                  >
                    {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                  </select>
                </div>
                
                <button 
                  onClick={swapLanguages}
                  className="p-4 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-full transition-all active:rotate-180 shadow-xl border border-slate-700 mt-6 active:scale-90"
                  title="Swap Languages"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>

                <div className="flex-1 w-full space-y-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-1">Target Language</label>
                  <select 
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                  >
                    {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Document Input ({sourceLang})</label>
                  <textarea 
                    className="w-full h-44 bg-slate-950 border border-slate-800 rounded-3xl p-8 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none transition-all shadow-inner font-serif"
                    value={transInput}
                    onChange={(e) => setTransInput(e.target.value)}
                    placeholder="Enter institutional text..."
                  />
                  <button 
                    onClick={handleTranslateAction}
                    disabled={isTranslating}
                    className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-50"
                  >
                    {isTranslating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
                    Execute Sovereign Translation
                  </button>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Sovereign Output ({targetLang})</label>
                  <div className="w-full h-44 bg-slate-950/50 border border-slate-800 rounded-3xl p-8 text-base text-slate-100 font-serif leading-relaxed overflow-y-auto shadow-inner relative group">
                    {transOutput || <span className="text-slate-700 italic font-sans text-xs">Awaiting institutional translation request...</span>}
                    {transOutput && <div className="absolute top-4 right-4 animate-pulse"><Sparkles className="w-4 h-4 text-blue-400" /></div>}
                  </div>
                  <div className="p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10 flex gap-4">
                    <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
                    <p className="text-[11px] text-blue-400/80 leading-normal font-medium italic">
                      Precise, civic-grade terminology validated against global legal registries and Elmahrosa sovereign standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Policy Side Panel */}
        <div className="space-y-8">
          <section className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] space-y-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-amber-500 group-hover:bg-amber-400 transition-all duration-500"></div>
            <h3 className="text-2xl font-bold flex items-center gap-3"><Shield className="w-6 h-6 text-amber-500" /> Sovereign Guard</h3>
            
            <div className="space-y-10">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-200">Session Persistence</p>
                  <div onClick={() => setIsPersistent(!isPersistent)} className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${isPersistent ? 'bg-amber-500' : 'bg-slate-800'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-slate-950 transition-all ${isPersistent ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Identity vault maintains state for Principal Ayman Seif on this node footprint.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-200">Auto-Rotation</p>
                  <div className="w-12 h-6 bg-amber-500 rounded-full relative shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-slate-950 rounded-full"></div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Automatic lifecycle management for institutional keys every 90 days.</p>
              </div>
            </div>
            
            <div className="pt-10 border-t border-slate-800 space-y-4">
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] text-center">Protocol Zero</p>
              <button className="w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-slate-950 transition-all text-[10px] font-black uppercase tracking-[0.3em] border border-red-500/20 active:scale-95 group">
                <Zap className="w-4 h-4 group-hover:animate-ping" /> Emergency Shutdown
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Generation Modal - Form for new keys */}
      {isCreating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
             <form onSubmit={handleCreateKey} className="p-12 space-y-8">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h4 className="text-3xl font-black text-white italic tracking-tighter uppercase">Gateway Issue</h4>
                    <p className="text-slate-500 font-medium">Provision new sovereign access credentials.</p>
                  </div>
                  <button type="button" onClick={() => setIsCreating(false)} className="p-3 hover:bg-slate-800 rounded-full transition-all text-slate-500 hover:text-white">
                    <X className="w-8 h-8" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-1">Resource / Gateway Name</label>
                      <input 
                        autoFocus
                        type="text"
                        required
                        placeholder="e.g. Finance Hub Alpha"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 transition-all font-bold placeholder:text-slate-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-1">Institutional Scopes</label>
                      <div className="relative">
                        <List className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        <input 
                          type="text"
                          value={newKeyScopes}
                          onChange={(e) => setNewKeyScopes(e.target.value)}
                          placeholder="read:civic, write:governance"
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-1">IP Whitelist Policy</label>
                      <div className="relative">
                        <Network className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                        <input 
                          type="text"
                          value={newKeyIPs}
                          onChange={(e) => setNewKeyIPs(e.target.value)}
                          placeholder="0.0.0.0/0"
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-1">Clearance Level (Role)</label>
                    <div className="flex flex-col gap-2">
                      {(['Public', 'Authenticated', 'Institution'] as const).map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setNewKeyRole(role)}
                          className={`flex items-center justify-between p-4 rounded-2xl transition-all border-2 text-left ${
                            newKeyRole === role 
                              ? 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-lg shadow-amber-500/5' 
                              : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                          }`}
                        >
                          <div>
                             <p className="font-black text-sm uppercase tracking-tight">{role}</p>
                             <p className="text-[10px] opacity-60 italic font-medium">
                               {role === 'Institution' ? 'Full Sovereign Control' : role === 'Authenticated' ? 'Verified Gateway' : 'Public Discovery'}
                             </p>
                          </div>
                          {newKeyRole === role && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsCreating(false)} 
                    className="flex-1 py-5 rounded-3xl bg-slate-800 text-slate-400 font-black uppercase tracking-widest hover:bg-slate-700 transition-all"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-5 rounded-3xl bg-amber-500 text-slate-950 font-black uppercase tracking-widest hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/20 active:scale-95"
                  >
                    Generate Key
                  </button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* Success Modal - Display the generated key */}
      {generatedKeyResult && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden p-12 space-y-8 animate-in zoom-in-95 duration-500 relative">
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                   <ShieldCheck className="w-10 h-10 text-green-500 animate-pulse" />
                </div>
                <div>
                   <h4 className="text-3xl font-black text-white italic tracking-tighter uppercase">Gateway Operational</h4>
                   <p className="text-slate-500 font-medium tracking-tight">Access Token for <span className="text-amber-500 font-bold">{generatedKeyResult.key.name}</span></p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block text-center">Secret Access Credential</label>
                <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 font-mono text-amber-500 break-all relative group shadow-inner border-dashed">
                   <span className="text-lg">{generatedKeyResult.key.key}</span>
                   <button 
                      onClick={() => copyToClipboard('generated', generatedKeyResult.key.key)}
                      className="absolute -right-4 -top-4 p-5 bg-amber-500 rounded-2xl text-slate-950 hover:bg-amber-400 transition-all shadow-2xl active:scale-90"
                      title="Copy Key"
                   >
                      {copiedId === 'generated' ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                   </button>
                </div>
                <p className="text-[10px] text-amber-500/60 font-bold uppercase tracking-widest text-center">Caution: Store this safely. Elmahrosa does not store plaintext secrets.</p>
              </div>

              <div className="grid grid-cols-2 gap-6 bg-slate-950/50 p-8 rounded-3xl border border-slate-800">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Scopes</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                       {generatedKeyResult.details.scopes.length > 0 ? generatedKeyResult.details.scopes.map(s => (
                         <span key={s} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md text-[10px] font-mono border border-blue-500/20">{s}</span>
                       )) : <span className="text-slate-700 italic text-[10px]">None</span>}
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Network Whitelist</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                       {generatedKeyResult.details.ipWhitelist.length > 0 ? generatedKeyResult.details.ipWhitelist.map(ip => (
                         <span key={ip} className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded-md text-[10px] font-mono border border-green-500/20">{ip}</span>
                       )) : <span className="text-slate-700 italic text-[10px]">None</span>}
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Issued On</p>
                    <p className="text-xs text-slate-400 font-mono">{new Date(generatedKeyResult.details.rotatedAt).toLocaleDateString()}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Clearance Status</p>
                    <p className="text-xs text-green-500 font-bold uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      {generatedKeyResult.details.status}
                    </p>
                 </div>
              </div>

              <button 
                 onClick={() => setGeneratedKeyResult(null)}
                 className="w-full py-5 rounded-3xl bg-slate-800 text-white font-black uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700"
              >
                 Return to Vault
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
