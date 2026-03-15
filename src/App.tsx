import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  TrendingUp, 
  PenTool, 
  Target, 
  CreditCard, 
  Globe, 
  Send, 
  User, 
  Bot, 
  Users,
  ChevronRight, 
  Menu, 
  X, 
  Sparkles, 
  Lock, 
  Unlock,
  Image as ImageIcon,
  Download,
  Briefcase,
  Zap,
  Mail,
  LayoutDashboard,
  ShoppingCart,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateExpertResponse, generateExpertImage, ACTIVATION_KEY } from './services/geminiService';
import Dashboard from './components/Dashboard';
import ClientsView from './components/ClientsView';
import ServicesView from './components/ServicesView';

type Module = 'chat' | 'strategy' | 'content' | 'ads' | 'finance' | 'smm' | 'image' | 'marketing' | 'automation' | 'dashboard' | 'clients' | 'services';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [activeModule, setActiveModule] = useState<Module>('chat');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Bonjour. Je suis **Aksil AI - Elite Marketing Academy**. Pour accéder à mes services d\'expert, veuillez saisir votre **Code d\'activation mensuel**.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    if (isLocked) {
      if (userMessage === ACTIVATION_KEY) {
        setIsLocked(false);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Accès Premium activé. Bienvenue chez l\'Élite du Marketing. Comment puis-je vous accompagner dans votre succès aujourd\'hui ?' 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Code d\'activation incorrect. Veuillez contacter l\'administrateur pour obtenir une licence mensuelle valide.' 
        }]);
      }
      return;
    }

    setIsLoading(true);

    try {
      if (activeModule === 'image') {
        const imageUrl = await generateExpertImage(userMessage);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Voici le visuel publicitaire généré pour : "${userMessage}"`,
          image: imageUrl
        }]);
      } else {
        const history = messages
          .filter(m => !m.image) // Filter out media messages for text history
          .map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }));
        
        const response = await generateExpertResponse(userMessage, history);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (error: any) {
      if (error.message?.includes("Requested entity was not found")) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Erreur d'accès API. Veuillez sélectionner à nouveau votre clé API via le menu de configuration." 
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, une erreur s'est produite lors du traitement de votre demande." }]);
      }
    } finally {
      setIsLoading(false);
      setLoadingStatus('');
    }
  };

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, description: 'KPIs & Analytics' },
    { id: 'services', name: 'Services Digitaux', icon: ShoppingCart, description: 'Netflix, Canva, IA...' },
    { id: 'clients', name: 'Clients', icon: Users, description: 'CRM & Portefeuille' },
    { id: 'chat', name: 'Mon Assistant IA', icon: MessageSquare, description: 'Votre Expert Personnel' },
    { id: 'marketing', name: 'Marketing Management', icon: Briefcase, description: 'Planning, Exécution & Tracking' },
    { id: 'automation', name: 'Digital Automation', icon: Zap, description: 'Email Marketing & Workflows' },
    { id: 'strategy', name: 'Stratégie', icon: TrendingUp, description: 'SWOT, PESTEL, Marché' },
    { id: 'content', name: 'Contenu', icon: PenTool, description: 'Copywriting & Scripts' },
    { id: 'image', name: 'Studio Image', icon: ImageIcon, description: 'Générateur de Visuels' },
    { id: 'ads', name: 'Publicité', icon: Target, description: 'Facebook Ads & Pixel' },
    { id: 'finance', name: 'Finance', icon: CreditCard, description: 'Cartes Visa & Binance' },
    { id: 'smm', name: 'SMM & Commerce', icon: Globe, description: 'SMM Panels & Digital' },
  ];

  const handleModuleChange = (modId: Module) => {
    if (isLocked) return;
    setActiveModule(modId);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
    
    const mod = modules.find(m => m.id === modId);
    if (mod) {
      let welcomeMessage = `Vous avez activé le module **${mod.name}**. Je suis prêt à vous aider spécifiquement sur : ${mod.description}.`;
      
      if (modId === 'image') {
        welcomeMessage += `\n\n**Exemples de prompts pour démarrer :**\n- *Un packshot de produit cosmétique de luxe sur un socle en marbre, éclairage cinématique, fond minimaliste.*\n- *Une scène de bureau moderne avec un entrepreneur utilisant une tablette, style high-tech, lumière naturelle.*\n- *Publicité pour une boisson énergisante, éclairage cinématique, dynamique.*\n- *Concept de logo futuriste pour une agence de marketing digital, minimaliste, bleu électrique et blanc.*`;
      }

      if (modId === 'marketing') {
        welcomeMessage += `\n\nJe peux vous aider à :\n- **Planifier** : Calendrier éditorial, budget prévisionnel, objectifs SMART.\n- **SEO Planning** : Recherche de mots-clés stratégiques, analyse de la concurrence SEO, suggestions d'optimisation On-Page.\n- **Exécuter** : Lancement de campagnes, coordination d'équipes, automatisation.\n- **Tracker** : Analyse des KPI, calcul du ROI, rapports de performance.\n- **Analyse Concurrentielle** : Benchmarking, surveillance des prix, analyse des parts de voix.`;
      }

      if (modId === 'automation') {
        welcomeMessage += `\n\nJe peux vous aider à automatiser votre croissance :\n- **Email Templates** : Bibliothèque de séquences pré-construites (Welcome, Nurturing, Re-engagement).\n- **Email Sequences** : Création de tunnels de vente personnalisés.\n- **Scheduling** : Planification intelligente des envois.\n- **Personnalisation** : Segmentation d'audience et contenu dynamique.\n- **Workflows** : Connexion entre vos outils marketing.`;
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: welcomeMessage 
      }]);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-slate-200"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed md:relative z-40 w-72 h-full bg-white border-r border-slate-200 flex flex-col shadow-xl md:shadow-none"
          >
            <div className="p-6 border-bottom border-slate-100">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg text-white ${isLocked ? 'bg-slate-400' : 'bg-indigo-600'}`}>
                  {isLocked ? <Lock size={24} /> : <Sparkles size={24} />}
                </div>
                <h1 className="font-bold text-xl tracking-tight leading-tight">Aksil AI</h1>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Elite Marketing Academy</p>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  disabled={isLocked}
                  onClick={() => handleModuleChange(mod.id as Module)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                    isLocked ? 'opacity-50 cursor-not-allowed' :
                    activeModule === mod.id 
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <mod.icon size={20} className={!isLocked && activeModule === mod.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
                  <div className="text-left">
                    <p className="font-semibold text-sm">{mod.name}</p>
                    <p className="text-[10px] opacity-70">{mod.description}</p>
                  </div>
                  {!isLocked && activeModule === mod.id && <ChevronRight size={16} className="ml-auto" />}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
              <div className={`p-4 rounded-2xl text-white ${isLocked ? 'bg-slate-800' : 'bg-indigo-900'} mb-4`}>
                <div className="flex items-center gap-2 mb-1">
                  {isLocked ? <Lock size={12} /> : <Unlock size={12} />}
                  <p className="text-xs font-bold">{isLocked ? 'Mode Verrouillé' : 'Accès Premium'}</p>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  {isLocked ? 'Saisissez votre clé pour débloquer les fonctionnalités d\'expert.' : 'Toutes les fonctionnalités d\'élite sont actives.'}
                </p>
              </div>
              
              <a 
                href="https://t.me/Aksilmanager" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (window.top === window.self) return;
                  e.preventDefault();
                  window.open('https://t.me/Aksilmanager', '_blank');
                }}
                className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all group"
              >
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  <Send size={16} className="text-slate-500 group-hover:text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-bold">Support Telegram</p>
                  <p className="text-[10px] text-slate-400">@Aksilmanager</p>
                </div>
              </a>

              <button 
                onClick={() => {
                  const shareUrl = window.location.origin;
                  navigator.clipboard.writeText(shareUrl).then(() => {
                    alert('Lien de partage copié : ' + shareUrl);
                  }).catch(() => {
                    const textArea = document.createElement("textarea");
                    textArea.value = shareUrl;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    alert('Lien de partage copié : ' + shareUrl);
                  });
                }}
                className="w-full mt-2 flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all group"
              >
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  <Share2 size={16} className="text-slate-500 group-hover:text-indigo-600" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold">Partager l'App</p>
                  <p className="text-[10px] text-slate-400">Copier le lien</p>
                </div>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
        </div>

        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-slate-800">
              {isLocked ? 'Activation Requise' : modules.find(m => m.id === activeModule)?.name}
            </h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isLocked ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {isLocked ? 'Locked' : 'Premium'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <Globe size={14} />
              <span>FR | AR | EN | DZ</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
              <User size={18} />
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 z-10 relative custom-scrollbar">
          {activeModule === 'dashboard' ? (
            <Dashboard />
          ) : activeModule === 'clients' ? (
            <ClientsView />
          ) : activeModule === 'services' ? (
            <ServicesView />
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              {messages.length === 0 && (
                <div className="text-center py-12 space-y-6">
                  <div className="w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-200 animate-pulse">
                    <Bot size={48} className="text-white" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900">Bienvenue dans votre Espace</h2>
                    <p className="text-slate-500 max-w-md mx-auto">Je suis votre assistant personnel Aksil AI. Comment puis-je vous aider aujourd'hui ?</p>
                  </div>
                </div>
              )}
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  key={idx}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md transition-transform hover:scale-110 ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-indigo-600'
                  }`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm transition-all ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-100' 
                      : 'bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}>
                    <div className={`prose prose-sm max-w-none leading-relaxed ${msg.role === 'user' ? 'prose-invert' : 'prose-slate'}`}>
                      <Markdown remarkPlugins={[remarkGfm]}>{msg.content}</Markdown>
                    </div>
                    {msg.image && (
                      <div className="mt-5 space-y-3">
                        <div className="relative group rounded-2xl overflow-hidden border border-slate-100 shadow-lg">
                          <img 
                            src={msg.image} 
                            alt="Generated marketing visual" 
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                            <a 
                              href={msg.image} 
                              download="aksil-ai-visual.png"
                              className="p-4 bg-white text-indigo-600 rounded-full hover:scale-110 transition-transform shadow-xl"
                            >
                              <Download size={24} />
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-1">
                          <div className="w-1 h-1 bg-indigo-400 rounded-full" />
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Aksil AI Studio Image</p>
                        </div>
                      </div>
                    )}
                    {msg.content.includes("sélectionner votre propre clé API") && (
                      <button
                        onClick={() => (window as any).aistudio?.openSelectKey()}
                        className="mt-5 w-full py-3.5 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
                      >
                        <Lock size={18} />
                        Configurer ma Clé API Google Cloud
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm animate-pulse">
                    <Bot size={20} />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm border border-slate-200 p-5 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <div className="flex gap-1">
                      <motion.div 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-2 h-2 bg-indigo-400 rounded-full" 
                      />
                      <motion.div 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-indigo-400 rounded-full" 
                      />
                      <motion.div 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-indigo-400 rounded-full" 
                      />
                    </div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-2">Aksil réfléchit...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={`p-4 md:p-8 bg-transparent z-10 shrink-0 ${['dashboard', 'clients', 'services'].includes(activeModule) ? 'hidden' : ''}`}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-4 rounded-[32px] shadow-2xl shadow-indigo-100/50 relative">
              {!isLocked && activeModule === 'image' && (
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                {[
                  "Produit cosmétique luxe",
                  "Bureau high-tech",
                  "Boisson dynamique",
                  "Logo futuriste"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
                    className="whitespace-nowrap px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold border border-indigo-100 hover:bg-indigo-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {!isLocked && activeModule === 'marketing' && (
              <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
                {[
                  "Plan SEO complet",
                  "Recherche de mots-clés",
                  "Analyse concurrentielle SEO",
                  "Optimisation On-Page",
                  "Audit SEO technique",
                  "Calendrier éditorial"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
                    className="whitespace-nowrap px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold border border-indigo-100 hover:bg-indigo-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {!isLocked && activeModule === 'automation' && (
              <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
                {[
                  "Template: Welcome Series",
                  "Template: Lead Nurturing",
                  "Template: Re-engagement",
                  "Template: Panier Abandonné",
                  "Template: Post-Achat",
                  "Créer séquence sur mesure"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
                    className="whitespace-nowrap px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold border border-indigo-100 hover:bg-indigo-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={isLocked ? "Saisissez votre code d'activation..." : "Posez votre question d'expert..."}
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-5 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none min-h-[60px] max-h-[200px] text-sm font-medium placeholder:text-slate-400"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`absolute right-2 bottom-2 p-3 text-white rounded-2xl transition-all shadow-lg ${
                    isLocked ? 'bg-slate-700 hover:bg-slate-800 shadow-slate-200' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed active:scale-90`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-[0.2em]">
              Aksil AI • Elite Marketing Academy • v2026
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
