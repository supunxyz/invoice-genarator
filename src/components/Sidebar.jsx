import React, { useState } from 'react';
import { Plus, Trash2, Settings, FileText, Image, LayoutTemplate, Palette, Building2, User } from 'lucide-react';

const Sidebar = ({ data, setData, selectedTemplate, setSelectedTemplate, templates }) => {
    const [activeTab, setActiveTab] = useState('general');

    const updateData = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const addItem = () => {
        setData(prev => ({
            ...prev,
            items: [...prev.items, { id: Date.now(), date: new Date().toISOString().split('T')[0], itemName: '', quantity: 1, price: 0 }]
        }));
    };

    const updateItem = (id, field, value) => {
        setData(prev => ({
            ...prev,
            items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
        }));
    };

    const removeItem = (id) => {
        if (data.items.length > 1) {
            setData(prev => ({
                ...prev,
                items: prev.items.filter(item => item.id !== id)
            }));
        }
    };

    const themeColors = ['#2563eb', '#16a34a', '#dc2626', '#eab308', '#9333ea', '#4f46e5', '#db2777', '#ea580c', '#334155'];

    return (
        <div className="w-80 bg-white border-r border-slate-200 h-screen overflow-y-auto flex flex-col shrink-0 custom-scrollbar shadow-lg z-10 print:hidden relative">
            <div className="p-6 border-b border-slate-100 bg-slate-50 sticky top-0 z-20">
                <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <FileText className="text-blue-600" size={24} /> Generator
                </h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Configure your invoice</p>
            </div>

            <div className="flex border-b border-slate-200 sticky top-[92px] bg-white z-20">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'general' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    Details
                </button>
                <button
                    onClick={() => setActiveTab('items')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'items' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    Items
                </button>
                <button
                    onClick={() => setActiveTab('style')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'style' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    Style
                </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'general' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                        {/* Invoice Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2 border-b pb-2"><FileText size={16} /> Invoice Info</h3>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Invoice Number</label>
                                <input type="text" value={data.invoiceNumber} onChange={(e) => updateData('invoiceNumber', e.target.value)} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Issue Date</label>
                                    <input type="date" value={data.dateIssued} onChange={(e) => updateData('dateIssued', e.target.value)} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Due Date</label>
                                    <input type="date" value={data.dueDate} onChange={(e) => updateData('dueDate', e.target.value)} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" />
                                </div>
                            </div>
                        </div>

                        {/* Company Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2 border-b pb-2"><Building2 size={16} /> Company Details</h3>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company Name</label>
                                <input type="text" value={data.companyName} onChange={(e) => updateData('companyName', e.target.value)} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tagline / Slogan</label>
                                <input type="text" value={data.companyTagline} onChange={(e) => updateData('companyTagline', e.target.value)} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Address</label>
                                <textarea value={data.companyAddress} onChange={(e) => updateData('companyAddress', e.target.value)} rows={2} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50 resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                                    <input type="text" value={data.companyPhone} onChange={(e) => updateData('companyPhone', e.target.value)} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                                    <input type="email" value={data.companyEmail} onChange={(e) => updateData('companyEmail', e.target.value)} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Website</label>
                                <input type="text" value={data.companyWebsite} onChange={(e) => updateData('companyWebsite', e.target.value)} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" />
                            </div>
                        </div>

                        {/* Client Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2 border-b pb-2"><User size={16} /> Client Details</h3>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Client Name</label>
                                <input type="text" value={data.clientName} onChange={(e) => updateData('clientName', e.target.value)} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Client Company</label>
                                <input type="text" value={data.clientCompany} onChange={(e) => updateData('clientCompany', e.target.value)} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Client Address</label>
                                <textarea value={data.clientAddress} onChange={(e) => updateData('clientAddress', e.target.value)} rows={2} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50 resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Project Description</label>
                                <textarea value={data.projectDescription} onChange={(e) => updateData('projectDescription', e.target.value)} rows={2} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50 resize-none" />
                            </div>
                        </div>

                        {/* Footer Notes */}
                        <div className="space-y-4 pb-8">
                            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2 border-b pb-2"><FileText size={16} /> Footer Notes</h3>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Notes / Terms</label>
                                <textarea value={data.notes} onChange={(e) => updateData('notes', e.target.value)} rows={3} className="w-full text-sm p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50 resize-none" />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'items' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300 pb-8">
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <span className="text-xs font-bold uppercase text-slate-600">Currency Symbol</span>
                            <input type="text" value={data.currency} onChange={(e) => updateData('currency', e.target.value)} className="w-16 text-center text-sm p-1 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div className="space-y-4">
                            {data.items.map((item, index) => (
                                <div key={item.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm relative group">
                                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">{index + 1}</div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="absolute -top-3 -right-3 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 border-2 border-white"
                                        title="Remove item"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Item Description"
                                            value={item.itemName}
                                            onChange={(e) => updateItem(item.id, 'itemName', e.target.value)}
                                            className="w-full text-sm font-medium p-2 border-b border-slate-100 focus:border-blue-500 outline-none transition-colors"
                                        />
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Date</label>
                                                <input
                                                    type="date"
                                                    value={item.date}
                                                    onChange={(e) => updateItem(item.id, 'date', e.target.value)}
                                                    className="w-full text-xs p-2 bg-slate-50 rounded border border-slate-100 outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Qty</label>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                                                    className="w-full text-xs p-2 bg-slate-50 rounded border border-slate-100 outline-none focus:border-blue-500 text-center"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Price</label>
                                                <input
                                                    type="number"
                                                    value={item.price}
                                                    onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                                                    className="w-full text-xs p-2 bg-slate-50 rounded border border-slate-100 outline-none focus:border-blue-500 text-right"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={addItem}
                            className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors border border-blue-200 border-dashed"
                        >
                            <Plus size={16} /> Add Line Item
                        </button>
                    </div>
                )}

                {activeTab === 'style' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300 pb-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2 border-b pb-2"><LayoutTemplate size={16} /> Select Template</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {templates.map((tpl) => (
                                    <button
                                        key={tpl.id}
                                        onClick={() => setSelectedTemplate(tpl.id)}
                                        className={`relative p-4 rounded-xl border-2 text-left flex items-start gap-4 transition-all ${selectedTemplate === tpl.id ? 'border-blue-600 bg-blue-50/50 shadow-md ring-4 ring-blue-600/10' : 'border-slate-200 hover:border-blue-300 bg-white'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${selectedTemplate === tpl.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                            <LayoutTemplate size={24} />
                                        </div>
                                        <div>
                                            <h4 className={`font-bold ${selectedTemplate === tpl.id ? 'text-blue-900' : 'text-slate-700'}`}>{tpl.name}</h4>
                                            <p className="text-xs text-slate-500 mt-1">{tpl.description}</p>
                                        </div>
                                        {selectedTemplate === tpl.id && (
                                            <div className="absolute top-2 right-2 w-3 h-3 bg-blue-600 rounded-full ring-2 ring-white"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2 border-b pb-2"><Palette size={16} /> Accent Color</h3>
                            <div className="flex flex-wrap gap-3">
                                {themeColors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => updateData('themeColor', color)}
                                        className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${data.themeColor === color ? 'ring-4 ring-offset-2 scale-110' : 'hover:scale-110 shadow-sm'}`}
                                        style={{ backgroundColor: color, ringColor: color }}
                                        title={color}
                                    >
                                        {data.themeColor === color && <div className="w-3 h-3 bg-white rounded-full"></div>}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3 mt-4">
                                <label className="text-xs font-bold text-slate-500 uppercase">Custom Hex:</label>
                                <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 overflow-hidden flex-1 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                                    <div className="w-8 h-8 m-1 rounded shadow-inner shrink-0 border border-slate-200" style={{ backgroundColor: data.themeColor }}></div>
                                    <input
                                        type="text"
                                        value={data.themeColor}
                                        onChange={(e) => updateData('themeColor', e.target.value)}
                                        className="w-full text-sm p-2 bg-transparent outline-none font-mono font-bold text-slate-700 uppercase"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2 border-b pb-2"><Image size={16} /> Logo Usage</h3>
                            <p className="text-xs text-slate-500 font-medium">
                                Click the logo area in the invoice preview to upload a custom logo image. The logo will automatically size to fit the template constraints.
                            </p>
                            {data.logo && (
                                <button
                                    onClick={() => updateData('logo', '')}
                                    className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-colors border border-red-100"
                                >
                                    Remove Logo
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
        </div>
    );
};

export default Sidebar;
