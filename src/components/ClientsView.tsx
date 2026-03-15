import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  ExternalLink,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  StickyNote,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const initialClientsData = [
  { 
    id: 1, 
    name: 'Sarah Benali', 
    company: 'Luxura Cosmetics', 
    email: 'sarah@luxura.dz', 
    status: 'Active', 
    spend: '4,200 €', 
    engagement: '85%', 
    lastActive: 'Il y a 2h',
    avatar: 'https://picsum.photos/seed/client1/100/100',
    notes: [
      { id: 1, text: 'Intéressée par la nouvelle gamme bio.', date: '2024-03-10' },
      { id: 2, text: 'Prévoir un appel de suivi lundi prochain.', date: '2024-03-12' }
    ]
  },
  { 
    id: 2, 
    name: 'Karim Mansouri', 
    company: 'TechFlow Solutions', 
    email: 'k.mansouri@techflow.com', 
    status: 'Lead', 
    spend: '0 €', 
    engagement: '42%', 
    lastActive: 'Il y a 1j',
    avatar: 'https://picsum.photos/seed/client2/100/100',
    notes: []
  },
  { 
    id: 3, 
    name: 'Amine Ziri', 
    company: 'Ziri Digital', 
    email: 'amine@ziri.digital', 
    status: 'Active', 
    spend: '12,800 €', 
    engagement: '92%', 
    lastActive: 'En ligne',
    avatar: 'https://picsum.photos/seed/client3/100/100',
    notes: [
      { id: 1, text: 'Gros contrat en cours de renouvellement.', date: '2024-03-01' }
    ]
  },
  { 
    id: 4, 
    name: 'Lydia Hamidi', 
    company: 'EcoStyle Algeria', 
    email: 'lydia@ecostyle.dz', 
    status: 'Inactive', 
    spend: '1,500 €', 
    engagement: '12%', 
    lastActive: 'Il y a 2 sem.',
    avatar: 'https://picsum.photos/seed/client4/100/100',
    notes: []
  },
  { 
    id: 5, 
    name: 'Omar Farrah', 
    company: 'Farrah Logistics', 
    email: 'omar@farrah-log.com', 
    status: 'Active', 
    spend: '8,900 €', 
    engagement: '78%', 
    lastActive: 'Il y a 5h',
    avatar: 'https://picsum.photos/seed/client5/100/100',
    notes: []
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'Lead': return 'bg-amber-50 text-amber-700 border-amber-100';
    case 'Inactive': return 'bg-slate-50 text-slate-700 border-slate-100';
    default: return 'bg-slate-50 text-slate-700 border-slate-100';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Active': return <CheckCircle2 size={14} />;
    case 'Lead': return <Clock size={14} />;
    case 'Inactive': return <AlertCircle size={14} />;
    default: return null;
  }
};

export default function ClientsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState(initialClientsData);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [newNote, setNewNote] = useState('');

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedClient = clients.find(c => c.id === selectedClientId);

  const handleAddNote = () => {
    if (!newNote.trim() || selectedClientId === null) return;
    
    const note = {
      id: Date.now(),
      text: newNote.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setClients(prev => prev.map(c => 
      c.id === selectedClientId 
        ? { ...c, notes: [note, ...c.notes] }
        : c
    ));
    setNewNote('');
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Clients</h1>
          <p className="text-slate-500 text-sm">Gérez votre portefeuille client et suivez leur valeur marketing</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 rounded-2xl text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95">
          <Plus size={18} />
          Nouveau Client
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Clients', value: '1,240', trend: '+12%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Clients Actifs', value: '856', trend: '+5%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Nouveaux Leads', value: '42', trend: '+18%', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
              {stat.trend}
              <ArrowUpRight size={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un client ou une entreprise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            Filtres
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Client</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Dépenses (LTV)</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Engagement</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Dernière Activité</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={client.id} 
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={client.avatar} 
                        alt={client.name} 
                        className="w-10 h-10 rounded-2xl object-cover border-2 border-white shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{client.name}</p>
                        <p className="text-xs text-slate-500">{client.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(client.status)}`}>
                      {getStatusIcon(client.status)}
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-700">{client.spend}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full" 
                          style={{ width: client.engagement }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{client.engagement}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-500 font-medium">{client.lastActive}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedClientId(client.id)}
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all relative"
                        title="Notes privées"
                      >
                        <StickyNote size={16} />
                        {client.notes.length > 0 && (
                          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full border-2 border-white" />
                        )}
                      </button>
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <ExternalLink size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredClients.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Users size={32} />
            </div>
            <p className="text-slate-500 font-medium">Aucun client trouvé pour votre recherche.</p>
          </div>
        )}
      </div>

      {/* Notes Side Panel */}
      <AnimatePresence>
        {selectedClientId !== null && selectedClient && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClientId(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                    <StickyNote size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Notes Privées</h3>
                    <p className="text-xs text-slate-500">{selectedClient.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedClientId(null)}
                  className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {/* Add Note Input */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nouvelle Note</label>
                  <div className="relative">
                    <textarea 
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Saisissez une note importante sur ce client..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all min-h-[100px] resize-none"
                    />
                    <button 
                      onClick={handleAddNote}
                      disabled={!newNote.trim()}
                      className="absolute bottom-3 right-3 px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                {/* Notes List */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Historique des Notes</label>
                  {selectedClient.notes.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <StickyNote size={32} className="mx-auto text-slate-300 mb-2" />
                      <p className="text-sm text-slate-400">Aucune note pour le moment.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedClient.notes.map((note) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={note.id} 
                          className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl space-y-2"
                        >
                          <p className="text-sm text-slate-700 leading-relaxed">{note.text}</p>
                          <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">{note.date}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
