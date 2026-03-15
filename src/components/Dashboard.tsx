import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  TrendingUp, Users, MousePointer2, DollarSign, 
  ArrowUpRight, ArrowDownRight, Filter, Calendar,
  Share2, Eye, MessageSquare, ThumbsUp, Sparkles, Plus
} from 'lucide-react';
import { motion } from 'motion/react';

const campaignData = [
  { name: 'FB Ads Q1', spend: 4000, reach: 24000, conv: 240 },
  { name: 'Google Search', spend: 3000, reach: 13980, conv: 190 },
  { name: 'TikTok Viral', spend: 2000, reach: 98000, conv: 450 },
  { name: 'LinkedIn B2B', spend: 2780, reach: 3908, conv: 80 },
  { name: 'Insta Reels', spend: 1890, reach: 48000, conv: 310 },
];

const engagementData = [
  { date: '2024-01', engagement: 4000, reach: 2400 },
  { date: '2024-02', engagement: 3000, reach: 1398 },
  { date: '2024-03', engagement: 2000, reach: 9800 },
  { date: '2024-04', engagement: 2780, reach: 3908 },
  { date: '2024-05', engagement: 1890, reach: 4800 },
  { date: '2024-06', engagement: 2390, reach: 3800 },
  { date: '2024-07', engagement: 3490, reach: 4300 },
];

const contentPerformance = [
  { id: 1, title: 'Top 10 Marketing Trends 2026', type: 'Article', views: '12.4k', engagement: '8.2%', trend: 'up' },
  { id: 2, title: 'How to Scale Facebook Ads', type: 'Video', views: '45.2k', engagement: '12.5%', trend: 'up' },
  { id: 3, title: 'B2B Lead Gen Strategy', type: 'Case Study', views: '5.1k', engagement: '4.1%', trend: 'down' },
  { id: 4, title: 'AI in Content Creation', type: 'Webinar', views: '8.9k', engagement: '15.2%', trend: 'up' },
  { id: 5, title: 'Email Marketing Secrets', type: 'E-book', views: '3.2k', engagement: '6.8%', trend: 'down' },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Marketing Analytics Dashboard</h1>
          <p className="text-slate-500 text-sm">Performance globale de vos campagnes et contenus</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Calendar size={16} />
            Derniers 30 jours
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            <Filter size={16} />
            Filtrer
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Dépenses Totales', value: '14,560 €', trend: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Portée Totale', value: '189.2k', trend: '+24.2%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Conversions', value: '1,270', trend: '+8.1%', icon: MousePointer2, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Taux de Clic (CTR)', value: '3.42%', trend: '-2.4%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group"
          >
            <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-50 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200" title="Personnaliser l'indicateur">
              <Plus size={14} />
            </button>
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color}`}>
                <kpi.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {kpi.trend}
                {kpi.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campaign Performance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Performance des Campagnes</h3>
            <Share2 size={18} className="text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="conv" name="Conversions" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spend" name="Dépenses (€)" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audience Engagement */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Engagement de l'Audience</h3>
            <TrendingUp size={18} className="text-slate-400" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="engagement" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEngage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Content Performance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Performance du Contenu</h3>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Voir tout</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contenu</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vues</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contentPerformance.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Eye size={14} />
                      {item.views}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MessageSquare size={14} />
                      {item.engagement}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1 text-sm font-medium ${item.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {item.trend === 'up' ? 'Croissance' : 'Baisse'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-indigo-900 text-white p-8 rounded-3xl relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2">Objectif Mensuel</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-bold">84%</span>
              <span className="text-indigo-300 text-sm mb-1">atteint</span>
            </div>
            <div className="w-full bg-indigo-800 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '84%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="bg-white h-full" 
              />
            </div>
          </div>
          <Sparkles className="absolute -right-4 -bottom-4 text-indigo-800 w-32 h-32 opacity-50" />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 flex items-center justify-center">
            <Share2 size={24} className="text-indigo-600" />
          </div>
          <div>
            <h4 className="text-slate-900 font-bold">Partage Social</h4>
            <p className="text-slate-500 text-sm">Votre contenu a été partagé 1,240 fois cette semaine.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
            <ThumbsUp size={24} className="text-emerald-600" />
          </div>
          <div>
            <h4 className="text-slate-900 font-bold">Satisfaction Client</h4>
            <p className="text-slate-500 text-sm">Score NPS de 8.4/10 basé sur 450 retours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
