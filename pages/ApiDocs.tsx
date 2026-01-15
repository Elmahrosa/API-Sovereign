
import React from 'react';
import { Copy, Terminal, ChevronRight, ShieldCheck, Search, Activity } from 'lucide-react';

const ApiDocs: React.FC = () => {
  const sections = [
    { title: 'Auth', endpoints: [
      { method: 'POST', path: '/auth/login', desc: 'Starts authentication and issues a token.' },
      { method: 'POST', path: '/auth/refresh', desc: 'Refreshes an access token.' },
    ]},
    { title: 'Wallet', endpoints: [
      { method: 'GET', path: '/wallet/balance', desc: 'Returns token balances for a wallet.' },
      { method: 'POST', path: '/wallet/transfer', desc: 'Transfers tokens across chains.' },
      { method: 'POST', path: '/wallet/mint', desc: 'Mints new sovereign tokens.' },
    ]},
    { title: 'Governance', endpoints: [
      { method: 'POST', path: '/governance/petition', desc: 'Creates a new public petition.' },
      { method: 'POST', path: '/governance/vote', desc: 'Casts a cryptographic vote.' },
    ]},
    { title: 'i18n', endpoints: [
      { method: 'POST', path: '/i18n/translate', desc: 'Institutional grade translation.' },
    ]},
  ];

  const limits = [
    { tier: 'Public', rate: '60 req/min', desc: 'Default for unauthenticated discovery.' },
    { tier: 'Authenticated', rate: '300 req/min', desc: 'Verified Citizens and developers.' },
    { tier: 'Institution', rate: '1200 req/min', desc: 'Sovereign entities and financial partners.' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold mb-2">API Reference</h2>
          <p className="text-slate-400">v0.1.0 Sovereign Service Layer Surface</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition-colors">
            <Copy className="w-4 h-4" /> SDK Docs
          </button>
          <button className="flex items-center gap-2 bg-amber-500 text-slate-950 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-600 transition-colors">
            <Terminal className="w-4 h-4" /> Open Playground
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1 space-y-4">
          <div className="sticky top-24">
            <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">Navigation</h4>
            <nav className="space-y-1">
              <a href="#traceability" className="block px-3 py-2 text-sm text-slate-400 hover:text-amber-500 hover:bg-slate-900 rounded-lg transition-all">Traceability</a>
              {sections.map(s => (
                <a key={s.title} href={`#${s.title.toLowerCase()}`} className="block px-3 py-2 text-sm text-slate-400 hover:text-amber-500 hover:bg-slate-900 rounded-lg transition-all">
                  {s.title}
                </a>
              ))}
              <a href="#limits" className="block px-3 py-2 text-sm text-slate-400 hover:text-amber-500 hover:bg-slate-900 rounded-lg transition-all">Rate Limits</a>
              <a href="#compliance" className="block px-3 py-2 text-sm text-slate-400 hover:text-amber-500 hover:bg-slate-900 rounded-lg transition-all">Compliance</a>
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-12">
          {/* Traceability Section */}
          <section id="traceability" className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2"><Search className="w-5 h-5 text-amber-500" /> Traceability & requestId</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every API response includes a <code>meta.requestId</code>. This unique identifier is the key to Elmahrosa's institutional transparency. It allows developers and auditors to trace the exact path of a request through our sovereign logic layers, including which compliance policies were triggered.
            </p>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs">
              <div className="text-amber-500 mb-1">// API Response Envelope</div>
              <div className="text-slate-400">
                {`{
  "ok": true,
  "data": { ... },
  "meta": {
    "requestId": "req_8f2d9a1c" // Use this for logs
  }
}`}
              </div>
            </div>
            <div className="pt-2">
              <button className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1">
                <Activity className="w-3 h-3" /> Visit Audit Logs to trace a request
              </button>
            </div>
          </section>

          {sections.map(section => (
            <section key={section.title} id={section.title.toLowerCase()} className="space-y-6">
              <h3 className="text-2xl font-bold border-b border-slate-800 pb-2">{section.title}</h3>
              <div className="space-y-4">
                {section.endpoints.map(ep => (
                  <div key={ep.path} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-amber-500/30 transition-all">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-black px-2 py-1 rounded-md ${
                          ep.method === 'GET' ? 'bg-blue-500/20 text-blue-500' : 'bg-green-500/20 text-green-500'
                        }`}>
                          {ep.method}
                        </span>
                        <code className="text-sm font-mono text-slate-100">{ep.path}</code>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-500 transition-all" />
                    </div>
                    <div className="px-4 pb-4">
                      <p className="text-sm text-slate-400">{ep.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Rate Limits Section */}
          <section id="limits" className="space-y-6">
            <h3 className="text-2xl font-bold border-b border-slate-800 pb-2">Rate Limits</h3>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-800/50 text-slate-400">
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Tier</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Limit</th>
                    <th className="px-6 py-4 font-semibold uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {limits.map((l) => (
                    <tr key={l.tier} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-200">{l.tier}</td>
                      <td className="px-6 py-4 font-mono text-amber-500">{l.rate}</td>
                      <td className="px-6 py-4 text-slate-400">{l.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="compliance" className="bg-amber-500/5 border border-amber-500/20 p-8 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-amber-500 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> 
              Policy Enforcement Layer
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every request to Elmahrosa-API is audited by the <code>ComplianceMiddleware</code>. 
              Policies are defined in institutional YAML files and can block transactions based on 
              jurisdictional risk tiers, address blacklists, or volume limits.
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <pre className="text-xs font-mono text-slate-500">
{`# Example policy rule
- name: CBE.RISK.TX_LIMIT
  scope: Citizen
  limit: 50000 EGP
  action: REQUIRE_2FA`}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
