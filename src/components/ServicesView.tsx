import React, { useState } from 'react';
import { 
  Tv, 
  Palette, 
  Zap, 
  ShieldCheck, 
  ShoppingCart, 
  Star, 
  Check,
  Search,
  Filter,
  Flame,
  Music,
  Code,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  {
    id: 1,
    name: 'Netflix Premium',
    category: 'Streaming',
    price: '1,500 DA',
    period: '/ mois',
    description: '4K Ultra HD + HDR, 4 écrans simultanés.',
    icon: Tv,
    color: 'bg-rose-500',
    popular: true,
    features: ['Ultra HD', '4 Écrans', 'Téléchargements', 'Sans pub']
  },
  {
    id: 2,
    name: 'Canva Pro',
    category: 'Design',
    price: '800 DA',
    period: '/ mois',
    description: 'Accès illimité aux contenus premium et outils magiques.',
    icon: Palette,
    color: 'bg-indigo-500',
    popular: true,
    features: ['Contenu illimité', 'Redimensionnement', 'Planificateur', '1 To Stockage']
  },
  {
    id: 3,
    name: 'Spotify Premium',
    category: 'Musique',
    price: '600 DA',
    period: '/ mois',
    description: 'Écoutez sans pub, hors connexion et en haute qualité.',
    icon: Music,
    color: 'bg-emerald-500',
    popular: false,
    features: ['Sans pub', 'Hors connexion', 'Sauts illimités', 'Haute qualité']
  },
  {
    id: 4,
    name: 'YouTube Premium',
    category: 'Streaming',
    price: '900 DA',
    period: '/ mois',
    description: 'YouTube et YouTube Music sans publicité.',
    icon: Tv,
    color: 'bg-red-600',
    popular: false,
    features: ['Sans pub', 'Arrière-plan', 'YouTube Music', 'Téléchargements']
  },
  {
    id: 5,
    name: 'ChatGPT Plus',
    category: 'IA',
    price: '4,500 DA',
    period: '/ mois',
    description: 'Accès prioritaire à GPT-4 et aux nouvelles fonctionnalités.',
    icon: Zap,
    color: 'bg-teal-600',
    popular: true,
    features: ['GPT-4', 'DALL-E 3', 'Browsing', 'Plugins']
  },
  {
    id: 6,
    name: 'Adobe Creative Cloud',
    category: 'Design',
    price: '5,500 DA',
    period: '/ mois',
    description: 'Plus de 20 applications créatives (Photoshop, AI, etc.).',
    icon: Palette,
    color: 'bg-blue-600',
    popular: false,
    features: ['Photoshop', 'Illustrator', 'Premiere Pro', '100 Go Cloud']
  }
];

const categories = ['Tous', 'Streaming', 'Design', 'Musique', 'IA', 'Productivité'];

export default function ServicesView() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'Tous' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative rounded-[40px] overflow-hidden bg-indigo-900 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Globe className="w-full h-full scale-150" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest"
          >
            <Flame size={14} className="text-orange-400" />
            Offres Exclusives
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black leading-tight"
          >
            Boostez votre Digital avec nos <span className="text-indigo-400">Services Premium</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-100 text-lg leading-relaxed"
          >
            Accédez aux meilleures plateformes de streaming, design et productivité à des tarifs préférentiels. Activation immédiate et support 24/7.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={20} />
              <span className="text-sm font-semibold">Garantie Totale</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-amber-400" size={20} />
              <span className="text-sm font-semibold">Support Expert</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="text-indigo-400" size={20} />
              <span className="text-sm font-semibold">Livraison Rapide</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white rounded-[32px] border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all relative flex flex-col"
          >
            {service.popular && (
              <div className="absolute -top-3 right-8 px-4 py-1 bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg z-10">
                Populaire
              </div>
            )}
            
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl ${service.color} text-white shadow-lg`}>
                <service.icon size={28} />
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-900">{service.price}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{service.period}</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{service.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-lg group-hover:scale-[1.02] active:scale-[0.98]">
              <ShoppingCart size={18} />
              Commander Maintenant
            </button>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-sm">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun service trouvé</h3>
          <p className="text-slate-500">Essayez de modifier vos filtres ou votre recherche.</p>
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-indigo-50 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-indigo-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-indigo-900">Paiement Sécurisé</h4>
            <p className="text-sm text-indigo-600">BaridiMob, CCP, Binance Pay & Cartes Visa.</p>
          </div>
        </div>
        <button className="px-8 py-3 bg-white text-indigo-600 rounded-2xl font-bold border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
          Besoin d'aide ?
        </button>
      </div>
    </div>
  );
}
