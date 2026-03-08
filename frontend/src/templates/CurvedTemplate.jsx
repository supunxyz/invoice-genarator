import React from 'react';

const CurvedTemplate = ({ data, handleLogoUpload, calculateSubtotal, isEditing }) => {
    const subtotal = calculateSubtotal();
    const primaryColor = data.themeColor || '#e11d48';

    return (
        <div className="bg-white rounded-lg shadow-sm w-[793.7px] min-h-[1056px] mx-auto flex flex-col font-sans relative overflow-hidden print:w-full print:shadow-none print:min-h-0 print:h-auto break-words pb-8">
            {/* Top Curvy Header */}
            <div className="relative h-48 w-full mb-12 print:-webkit-print-color-adjust-exact">
                {/* Primary color shape */}
                <div className="absolute top-0 right-0 w-full h-[60%] print:-webkit-print-color-adjust-exact" style={{ backgroundColor: primaryColor }}></div>
                {/* Dark curve */}
                <svg viewBox="0 0 800 120" className="absolute top-0 left-0 w-full h-full object-cover z-10" preserveAspectRatio="none">
                    <path d="M0,0 L800,0 L800,80 Q500,80 300,120 Q150,150 0,90 Z" fill="#1e293b" />
                </svg>
                {/* Contact info top right */}
                <div className="absolute top-4 right-10 z-20 flex gap-6 text-white text-[10px] font-medium opacity-90">
                    <span className="flex items-center gap-1">📞 {data.companyPhone}</span>
                    {data.companyEmail && <span className="flex items-center gap-1">✉️ {data.companyEmail}</span>}
                    <span className="flex items-center gap-1">📍 {data.companyAddress.substring(0, 30)}</span>
                </div>

                <div className="absolute top-10 left-10 z-30 flex items-center gap-4">
                    <div className="relative group/logo w-16 h-16 border-2 border-white rounded-xl flex items-center justify-center overflow-hidden cursor-pointer" style={{ backgroundColor: primaryColor }}>
                        {isEditing && (
                            <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 print:hidden" />
                        )}
                        {data.logo ? (
                            <img src={data.logo} alt="Logo" className="w-full h-full object-contain bg-white" />
                        ) : (
                            <span className="font-black text-2xl text-white">
                                {data.companyName.charAt(0)}
                            </span>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-widest text-white uppercase">{data.companyName}</h2>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">{data.companyTagline}</p>
                    </div>
                </div>
            </div>

            <div className="px-12 flex justify-between mb-10 pb-6 border-b border-slate-100">
                <div className="w-1/2">
                    <h3 className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: primaryColor }}>Invoice To:</h3>
                    <p className="text-xl font-black text-slate-800 uppercase">{data.clientName}</p>
                    <p className="text-sm font-semibold text-slate-600 mt-1 uppercase">{data.clientCompany}</p>

                    <table className="mt-4 text-xs">
                        <tbody>
                            <tr>
                                <td className="py-1 pr-4 font-bold text-slate-500">Phone:</td>
                                <td className="text-slate-600 font-medium whitespace-pre-wrap">{data.clientAddress.split('\n')[0] || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="py-1 pr-4 font-bold text-slate-500">Address:</td>
                                <td className="text-slate-600 font-medium whitespace-pre-wrap">{data.clientAddress}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-1/3 text-right">
                    <h1 className="text-4xl font-black uppercase tracking-wider text-slate-800 mb-6">Invoice</h1>
                    <table className="w-full text-xs text-right">
                        <tbody>
                            <tr>
                                <td className="py-1.5 font-bold text-slate-500 uppercase tracking-wider">Invoice No:</td>
                                <td className="font-semibold text-slate-800 pl-4">#{data.invoiceNumber}</td>
                            </tr>
                            <tr>
                                <td className="py-1.5 font-bold text-slate-500 uppercase tracking-wider">Issue Date:</td>
                                <td className="font-semibold text-slate-800 pl-4">{new Date(data.dateIssued).toLocaleDateString()}</td>
                            </tr>
                            {data.dueDate && (
                                <tr>
                                    <td className="py-1.5 font-bold text-slate-500 uppercase tracking-wider">Due Date:</td>
                                    <td className="font-semibold text-slate-800 pl-4">{new Date(data.dueDate).toLocaleDateString()}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Items Table */}
            <div className="px-12 flex-1 pb-16">
                <table className="w-full text-left border-collapse rounded-xl overflow-hidden print:-webkit-print-color-adjust-exact mb-8">
                    <thead style={{ backgroundColor: primaryColor }}>
                        <tr className="text-white">
                            <th className="py-3 px-4 text-xs font-black uppercase tracking-widest w-12 text-center">No.</th>
                            <th className="py-3 px-4 text-xs font-black uppercase tracking-widest">Item Description</th>
                            <th className="py-3 px-4 text-xs font-black uppercase tracking-widest text-center">Price</th>
                            <th className="py-3 px-4 text-xs font-black uppercase tracking-widest text-center">Qty.</th>
                            <th className="py-3 px-4 text-xs font-black uppercase tracking-widest text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 border border-t-0 border-slate-100 rounded-b-xl">
                        {data.items.map((item, idx) => (
                            <tr key={item.id} className="bg-slate-50/50">
                                <td className="py-4 px-4 text-sm text-center text-slate-400 font-mono font-bold">{(idx + 1).toString().padStart(2, '0')}</td>
                                <td className="py-4 px-4 text-sm font-semibold text-slate-700">{item.itemName}</td>
                                <td className="py-4 px-4 text-sm text-center text-slate-600">{data.currency}{Number(item.price).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-center text-slate-600">{item.quantity}</td>
                                <td className="py-4 px-4 text-sm text-right font-black text-slate-800">{data.currency}{(item.quantity * item.price).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-start mt-8 page-break-inside-avoid">
                    <div className="w-1/2 pr-12">
                        <p className="text-sm font-black text-slate-800 mb-6">Thank you for business with us.</p>
                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: primaryColor }}>Terms & Conditions:</h4>
                        <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-wrap font-medium">{data.notes || 'Payment is due within 30 days.'}</p>

                        <div className="mt-12 w-48 relative">
                            <div className="w-full border-b-2 border-slate-800 h-10 mb-2 relative">
                                <span className="font-signature text-3xl text-slate-800 absolute -bottom-2 left-4 italic">Signature</span>
                            </div>
                            <p className="text-xs font-black text-slate-800 mt-3 text-center">Your Name & Signature</p>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-1 text-center">Account Manager</p>
                        </div>
                    </div>

                    <div className="w-[300px]">
                        <table className="w-full text-right text-sm mb-4 pr-4">
                            <tbody>
                                <tr>
                                    <td className="py-2 text-slate-500 font-bold uppercase text-[10px] tracking-widest">Subtotal:</td>
                                    <td className="py-2 font-black text-slate-800">{data.currency}{subtotal.toLocaleString()}</td>
                                </tr>
                                <tr className="border-b-2 border-slate-100">
                                    <td className="py-3 text-slate-500 font-bold uppercase text-[10px] tracking-widest">Tax (0%):</td>
                                    <td className="py-3 font-black text-slate-800">{data.currency}0.00</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="w-full rounded-xl py-4 px-6 mt-4 print:-webkit-print-color-adjust-exact flex justify-between items-center shadow-lg" style={{ backgroundColor: primaryColor }}>
                            <span className="text-white font-black uppercase tracking-widest text-sm">Total:</span>
                            <span className="text-white font-black text-2xl">{data.currency}{subtotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Curvy Footer */}
            <div className="absolute bottom-0 left-0 h-24 w-full print:-webkit-print-color-adjust-exact">
                <svg viewBox="0 0 800 60" className="absolute bottom-0 left-0 w-full h-full object-cover" preserveAspectRatio="none">
                    <path d="M0,60 L800,60 L800,20 Q600,60 400,20 Q200,-20 0,20 Z" fill="#1e293b" />
                    <path d="M0,60 L400,60 L400,40 Q200,60 0,40 Z" fill={primaryColor} />
                </svg>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
        .font-signature { font-family: 'Caveat', cursive; }
      `}</style>
        </div>
    );
};

export default CurvedTemplate;
