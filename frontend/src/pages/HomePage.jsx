import React, { useState } from 'react';
import { User, FileText, Upload, Download, ArrowRight, Zap, Palette, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [quickAmount, setQuickAmount] = useState('');
  const [quickClient, setQuickClient] = useState('');

  const handleQuickCreate = (e) => {
    e.preventDefault();
    // In a real app we'd pass this state via location or context. 
    // Here we just navigate to the app.
    navigate('/app');
  };

  const templates = [
    { id: 'modern', name: 'Modern Profile', theme: 'bg-blue-500' },
    { id: 'elegant', name: 'Elegant Green', theme: 'bg-emerald-500' },
    { id: 'creative', name: 'Creative Agency', theme: 'bg-purple-500' },
    { id: 'geometric', name: 'Geometric Blue', theme: 'bg-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <FileText className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-slate-800">
              Invoicify
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Designs', 'About', 'Pricing', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-600">
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section containing the Input Box Form the user asked for */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-6 shadow-sm">
            <Zap size={16} className="text-blue-500" /> V2.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            Create professional invoices in <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">seconds.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium">
            Everything you need to bill your clients, all in one beautifully crafted platform. Grab the input boxes below to start!
          </p>
        </div>

        {/* The large input/form box from the wireframe */}
        <div className="max-w-4xl mx-auto mt-12 mb-24">
          <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700"></div>
            
            <form onSubmit={handleQuickCreate} className="relative z-10 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Client Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Acme Corp" 
                    value={quickClient}
                    onChange={(e) => setQuickClient(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-white/80 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-medium text-lg shadow-sm placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Invoice Amount ($)</label>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={quickAmount}
                    onChange={(e) => setQuickAmount(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-white/80 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-medium text-lg shadow-sm placeholder:text-slate-400"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">Project Description</label>
                <textarea 
                  placeholder="Website redesign & branding..." 
                  rows={3}
                  className="w-full px-6 py-4 rounded-2xl bg-white/80 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-medium text-lg shadow-sm resize-none placeholder:text-slate-400"
                ></textarea>
              </div>

              <div className="mt-4 flex justify-between items-center group-hover:translate-y-0 transition-transform">
                <p className="text-sm font-semibold text-slate-500 hidden md:block">
                  No credit card required. Free forever.
                </p>
                <button 
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-blue-500/25"
                >
                  Generate Invoice Now <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 4 Cards Section from wireframe */}
        <div id="designs" className="max-w-7xl mx-auto pt-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Stunning Templates</h2>
            <p className="text-lg text-slate-500 font-medium">Choose from our curated collection of professional designs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template, index) => (
              <div 
                key={template.id}
                onClick={() => navigate('/app')}
                className="group cursor-pointer rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 border border-slate-100 flex flex-col items-center text-center h-[320px] relative overflow-hidden"
              >
                {/* Simulated template preview visual */}
                <div className={`w-full h-40 ${template.theme} rounded-2xl mb-6 opacity-90 group-hover:opacity-100 transition-opacity flex flex-col p-4 shadow-inner relative overflow-hidden`}>
                   {/* Abstract invoice lines */}
                   <div className="w-1/2 h-2 bg-white/50 rounded mt-2"></div>
                   <div className="w-3/4 h-2 bg-white/30 rounded mt-2"></div>
                   <div className="w-full h-12 bg-white/20 rounded mt-auto"></div>
                   
                   {/* decorative glare over the card area */}
                   <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{template.name}</h3>
                <p className="text-sm text-slate-500 font-medium">Preview Design {index + 1}</p>
                
                <div className="absolute bottom-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all font-bold text-blue-600 flex items-center gap-1">
                  Use Template <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-slate-200 mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between text-slate-500 font-medium">
          <p>© 2026 Invoicify. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
