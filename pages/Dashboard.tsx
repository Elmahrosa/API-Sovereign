
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Landmark, Zap, ShieldCheck, Gauge } from 'lucide-react';
import ChainStatusGrid from '../components/ChainStatusGrid';

const data = [
  { name: 'Mon', tx: 4000 },
  { name: 'Tue', tx: 3000 },
  { name: 'Wed', tx: 2000 },
  { name: 'Thu', tx: 2780 },
  { name: 'Fri', tx: 1890 },
  { name: 'Sat', tx: 2390 },
  { name: 'Sun', tx: 3490 },
];

const Dashboard: React.FC = () => {
  const rateLimits = [
    { tier: 'Public', current: 12, max: 60, color: 'bg-blue-500' },
    { tier: 'Authenticated', current: 145, max: 300, color: 'bg-green-500' },
    { tier: 'Institution', current: 982, max: 1200, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Verified Citizens', value: '1.2M+', icon: Users, color: 'text-blue-500' },
          { label: 'Sovereign Reserves', value: 'Ξ 45.2B', icon: Landmark, color: 'text-amber-500' },
          { label: 'Network Throughput', value: '42k tps', icon: Zap, color: 'text-green-500' },
          { label: 'Compliance Score', value: '99.8%', icon: ShieldCheck, color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                <h4 className="text-2xl font-bold tracking-tight">{stat.value}</h4>
              </div>
              <div className={`p-3 rounded-xl bg-slate-800 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Consensus Activity</h3>
            <select className="bg-slate-800 border border-slate-700 text-xs rounded-lg px-3 py-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#f59e0b' }}
                />
                <Area type="monotone" dataKey="tx" stroke="#f59e0b" fillOpacity={1} fill="url(#colorTx)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rate Limits Usage */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">API Consumption</h3>
            <Gauge className="w-5 h-5 text-amber-500" />
          </div>
          <div className="space-y-6">
            {rateLimits.map((limit) => (
              <div key={limit.tier} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{limit.tier} Tier</span>
                  <span className="text-slate-500">{limit.current} / {limit.max} req/min</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${limit.color} transition-all duration-1000`}
                    style={{ width: `${(limit.current / limit.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-500 italic">
                Usage is calculated across all connected institutional endpoints.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-6">Multi-Chain Sovereign Gateway</h3>
        <ChainStatusGrid />
      </div>
    </div>
  );
};

export default Dashboard;
