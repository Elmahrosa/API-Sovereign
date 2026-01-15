
import React, { useState } from 'react';
import { Bot, ShieldAlert, FileText, Languages, Sparkles, Send, Loader2, ArrowRightLeft } from 'lucide-react';
import { generateGovernancePetition, auditCompliance, translateCivicText } from '../services/geminiService';

const languages = [
  { code: 'English', name: 'Global English' },
  { code: 'Classical Arabic', name: 'Classical Arabic' },
  { code: 'French', name: 'French (Institutional)' },
  { code: 'Spanish', name: 'Spanish (Official)' },
  { code: 'Mandarin Chinese', name: 'Mandarin (Administrative)' },
];

const AIAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'petition' | 'translate'>('audit');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Translation specific state
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Classical Arabic');

  const handleAction = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setOutput('');
    try {
      let result = '';
      if (activeTab === 'audit') {
        result = await auditCompliance(input);
      } else if (activeTab === 'petition') {
        result = await generateGovernancePetition(input);
      } else if (activeTab === 'translate') {
        result = await translateCivicText(input, sourceLang, targetLang);
      }
      setOutput(result);
    } catch (err) {
      setOutput('Error communicating with the Sovereign AI layer. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Bot size={200} className="text-amber-500" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-500 rounded-2xl shadow-lg shadow-amber-500/20">
              <Bot className="text-slate-900 w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Elmahrosa AI Auditor</h2>
              <p className="text-slate-400">Governance support powered by Gemini Sovereign Intelligence</p>
            </div>
          </div>

          <div className="flex gap-2 p-1 bg-slate-950/50 rounded-xl border border-slate-800 mb-8 w-fit">
            {[
              { id: 'audit', label: 'Compliance Audit', icon: ShieldAlert },
              { id: 'petition', label: 'Draft Petition', icon: FileText },
              { id: 'translate', label: 'Civic Translate', icon: Languages },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-amber-500 text-slate-950 shadow-lg' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {/* Language Selection - Only visible on Translate Tab */}
            {activeTab === 'translate' && (
              <div className="flex flex-col sm:flex-row items-center gap-4 animate-in slide-in-from-top-2 duration-300">
                <div className="w-full">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1">From</label>
                  <select 
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all appearance-none cursor-pointer"
                  >
                    {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                  </select>
                </div>
                
                <button 
                  onClick={swapLanguages}
                  className="mt-4 p-3 bg-slate-800 hover:bg-slate-700 text-amber-500 rounded-full transition-all active:scale-90 shadow-lg border border-slate-700"
                  title="Swap"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>

                <div className="w-full">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1">To</label>
                  <select 
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all appearance-none cursor-pointer"
                  >
                    {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                {activeTab === 'audit' && 'Paste transaction JSON or details for audit'}
                {activeTab === 'petition' && 'Enter the topic for your civic petition'}
                {activeTab === 'translate' && `Enter text for institutional translation from ${sourceLang} to ${targetLang}`}
              </label>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-40 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-100 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none font-serif"
                  placeholder={
                    activeTab === 'audit' 
                      ? '{ "from": "wallet_a", "to": "wallet_b", "amount": 1000000 }'
                      : activeTab === 'petition'
                      ? 'Establishing digital education vouchers for remote communities...'
                      : `e.g. Terms of Service for Sovereign Infrastructure...`
                  }
                />
                <button
                  onClick={handleAction}
                  disabled={isLoading}
                  className="absolute bottom-4 right-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-900 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-amber-500/10 active:scale-95"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {activeTab === 'translate' ? 'Translate' : 'Generate'}
                </button>
              </div>
            </div>

            {output && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 text-amber-500 mb-3 text-sm font-bold uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" />
                  Sovereign Result
                </div>
                <div className="bg-slate-950/50 border border-amber-500/20 rounded-2xl p-8 text-slate-200 leading-relaxed font-serif whitespace-pre-wrap relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Bot size={80} />
                  </div>
                  {output}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl group hover:border-amber-500/30 transition-all">
          <h4 className="font-bold mb-2 flex items-center gap-2 text-amber-500">
            <ShieldAlert className="w-4 h-4" /> 
            {activeTab === 'translate' ? 'Institutional Accuracy' : 'Compliance Middleware'}
          </h4>
          <p className="text-sm text-slate-400">
            {activeTab === 'translate' 
              ? 'Our translation engine utilizes jurisdictional legal lexicons to ensure sovereign intent remains unchanged across borders.'
              : 'All AI-assisted outputs are filtered through jurisdictional policy middleware defined in institutional governance layers.'
            }
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl group hover:border-amber-500/30 transition-all">
          <h4 className="font-bold mb-2 flex items-center gap-2 text-amber-500">
            <Languages className="w-4 h-4" /> Dialect Optimization
          </h4>
          <p className="text-sm text-slate-400">The i18n layer understands local administrative dialects and official civic terminology required for governmental documentation in {sourceLang} and {targetLang}.</p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
