
import React from 'react';
import { Activity, Server, Database, Globe, AlertTriangle, Info } from 'lucide-react';
import { ChainStatus, ChainType } from '../types';

const mockChains: ChainStatus[] = [
  { name: ChainType.TEOS, status: 'operational', blockHeight: 12849502, latency: '42ms' },
  { name: ChainType.SOLANA, status: 'operational', blockHeight: 254891102, latency: '12ms' },
  { name: ChainType.ETHEREUM, status: 'operational', blockHeight: 19482031, latency: '150ms' },
  { name: ChainType.PI, status: 'operational', blockHeight: 489201, latency: '85ms' },
  { name: ChainType.BASE, status: 'operational', blockHeight: 10482931, latency: '35ms' },
  { name: ChainType.BITCOIN, status: 'congested', blockHeight: 835291, latency: '600ms' },
];

const ChainStatusGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockChains.map((chain) => (
        <div key={chain.name} className={`bg-slate-900 border ${chain.status === 'congested' ? 'border-amber-500/50 shadow-lg shadow-amber-500/5' : 'border-slate-800'} p-6 rounded-2xl hover:border-amber-500/30 transition-all group relative`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-amber-500/10 transition-colors">
                <Globe className={`w-5 h-5 ${chain.status === 'congested' ? 'text-amber-500' : 'text-slate-400'}`} />
              </div>
              <h3 className="font-bold text-lg">{chain.name}</h3>
            </div>
            <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wider ${
              chain.status === 'operational' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
            }`}>
              {chain.status === 'congested' && <AlertTriangle className="w-3 h-3 animate-pulse" />}
              {chain.status}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm group/tip">
              <span className="text-slate-500 flex items-center gap-2 cursor-help" title="The total number of blocks in the chain. Higher numbers indicate a more active/older network.">
                <Database className="w-4 h-4" /> Block Height <Info className="w-3 h-3 opacity-0 group-hover/tip:opacity-100 transition-opacity" />
              </span>
              <span className="font-mono text-slate-300">{chain.blockHeight.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm group/tip">
              <span className="text-slate-500 flex items-center gap-2 cursor-help" title="The time it takes for a data packet to travel from the user to the server and back. Lower is better.">
                <Activity className="w-4 h-4" /> Latency <Info className="w-3 h-3 opacity-0 group-hover/tip:opacity-100 transition-opacity" />
              </span>
              <span className={`font-mono ${chain.status === 'congested' ? 'text-amber-500' : 'text-slate-300'}`}>
                {chain.latency}
              </span>
            </div>
          </div>
          
          <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full ${chain.status === 'operational' ? 'bg-green-500' : 'bg-amber-500'}`}
              style={{ width: chain.status === 'congested' ? '70%' : '100%' }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChainStatusGrid;
