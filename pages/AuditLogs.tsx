
import React, { useState } from 'react';
import { Search, Filter, Calendar, Activity, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { AuditLog } from '../types';

const mockLogs: AuditLog[] = [
  { id: '1', requestId: 'req_8f2d9a1c', principal: 'Ministry_Finance_01', endpoint: '/wallet/transfer', method: 'POST', status: 200, policyDecision: 'ALLOW', timestamp: '2024-05-20 14:22:01' },
  { id: '2', requestId: 'req_a2b3c4d5', principal: 'Citizen_Auth_99', endpoint: '/auth/login', method: 'POST', status: 200, policyDecision: 'ALLOW', timestamp: '2024-05-20 14:20:45' },
  { id: '3', requestId: 'req_e5f6g7h8', principal: 'Unknown_Anon_X', endpoint: '/wallet/mint', method: 'POST', status: 403, policyDecision: 'DENY', timestamp: '2024-05-20 14:18:12' },
  { id: '4', requestId: 'req_i9j0k1l2', principal: 'Ministry_Digital_04', endpoint: '/governance/proposal', method: 'POST', status: 202, policyDecision: 'REQUIRE_2FA', timestamp: '2024-05-20 14:15:33' },
  { id: '5', requestId: 'req_m3n4o5p6', principal: 'Bank_Sovereign_Cairo', endpoint: '/wallet/balance', method: 'GET', status: 200, policyDecision: 'ALLOW', timestamp: '2024-05-20 14:12:09' },
  { id: '6', requestId: 'req_q7r8s9t0', principal: 'Citizen_9218', endpoint: '/i18n/translate', method: 'POST', status: 200, policyDecision: 'ALLOW', timestamp: '2024-05-20 14:10:55' },
];

const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPolicy, setFilterPolicy] = useState<string>('ALL');

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.requestId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.principal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPolicy = filterPolicy === 'ALL' || log.policyDecision === filterPolicy;
    return matchesSearch && matchesPolicy;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
          <p className="text-slate-400">Institutional request tracing and policy enforcement history.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search ID or Principal..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
          <select 
            className="bg-slate-900 border border-slate-800 rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            value={filterPolicy}
            onChange={(e) => setFilterPolicy(e.target.value)}
          >
            <option value="ALL">All Decisions</option>
            <option value="ALLOW">Allow</option>
            <option value="DENY">Deny</option>
            <option value="REQUIRE_2FA">Require 2FA</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 font-medium">
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Principal</th>
                <th className="px-6 py-4">Method & Endpoint</th>
                <th className="px-6 py-4">Policy Decision</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-amber-500 font-mono">{log.requestId}</code>
                      <button title="Trace request detail" className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-700 rounded">
                        <Activity className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-300">
                    {log.principal}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                        log.method === 'GET' ? 'bg-blue-500/20 text-blue-500' : 'bg-green-500/20 text-green-500'
                      }`}>
                        {log.method}
                      </span>
                      <span className="text-slate-400 font-mono truncate max-w-[150px]">{log.endpoint}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${
                      log.policyDecision === 'ALLOW' ? 'bg-green-500/10 text-green-500' : 
                      log.policyDecision === 'DENY' ? 'bg-red-500/10 text-red-500' : 
                      'bg-amber-500/10 text-amber-500'
                    }`}>
                      {log.policyDecision}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={log.status >= 400 ? 'text-red-500' : 'text-slate-300'}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLogs.length === 0 && (
          <div className="p-20 text-center space-y-3">
            <div className="bg-slate-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <Info className="text-slate-500" />
            </div>
            <p className="text-slate-500">No logs found matching your filters.</p>
          </div>
        )}

        <div className="bg-slate-800/20 px-6 py-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Showing {filteredLogs.length} entries</span>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-slate-700 rounded disabled:opacity-30" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium">Page 1 of 1</span>
            <button className="p-1 hover:bg-slate-700 rounded disabled:opacity-30" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
