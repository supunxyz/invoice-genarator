import React from 'react';

const GeometricTemplate = ({ data, handleLogoUpload, calculateSubtotal, isEditing }) => {
    const subtotal = calculateSubtotal();
    const tColor = data.themeColor || '#1e40af';

    return (
        <div className="bg-white shadow-sm w-[793.7px] min-h-[1056px] mx-auto flex flex-col font-sans relative overflow-hidden print:w-full print:shadow-none print:min-h-0 print:h-auto break-words border-8 border-slate-50">
            {/* Top Header */}
            <div className="flex h-48 relative w-full mb-8">
                <div className="w-[35%] p-8 flex items-start">
                    <div className="flex items-center gap-3">
                        <div className="relative group/logo w-12 h-12 flex items-center justify-center shrink-0 cursor-pointer rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: tColor }}>
                            {isEditing && (
                                <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 print:hidden" />
                            )}
                            {data.logo ? (
                                <img src={data.logo} alt="Logo" className="w-full h-full object-contain bg-white" />
                            ) : (
                                <span className="font-bold text-xl text-white">
                                    {data.companyName.charAt(0)}
                                </span>
                            )}
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-slate-800 uppercase tracking-wide">{data.companyName}</h2>
                            <p className="text-[9px] text-slate-500 tracking-widest uppercase">{data.companyTagline}</p>
                        </div>
                    </div>
                </div>
                <div className="w-[65%] rounded-bl-[80px] flex items-center justify-start p-10 relative overflow-hidden print:-webkit-print-color-adjust-exact shadow-lg" style={{ backgroundColor: tColor }}>
                    {/* Geometric Shapes */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-30">
                        <svg viewBox="0 0 400 200" className="absolute top-0 right-0 w-full h-full object-cover">
                            <circle cx="350" cy="50" r="60" fill="#fff" opacity="0.3" />
                            <rect x="250" y="80" width="80" height="80" rx="20" fill="#fff" opacity="0.4" />
                            <path d="M120 180 L200 40 L280 180 Z" fill="#fff" opacity="0.2" />
                            <circle cx="100" cy="40" r="20" fill="#fff" opacity="0.5" />
                            <rect x="30" y="80" width="40" height="40" fill="#fff" opacity="0.2" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-black text-white uppercase tracking-widest relative z-10 ml-8">Invoice:</h1>
                </div>
            </div>

            {/* Sub Header Details */}
            <div className="flex px-12 pb-8 mb-8 mx-4 pb-4">
                <div className="w-1/2 flex items-start">
                    <span className="text-xs font-black uppercase tracking-widest mr-4 mt-1" style={{ color: tColor }}>Invoice To :</span>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{data.clientName}</h3>
                        <p className="text-sm text-slate-500 mt-1 whitespace-pre-wrap">{data.clientAddress}</p>
                        {data.clientCompany && <p className="text-sm text-slate-600 font-medium mt-1">{data.clientCompany}</p>}
                    </div>
                </div>
                <div className="w-1/2 text-right">
                    <p className="text-xs text-slate-800 font-semibold mb-2"><span className="font-bold uppercase tracking-widest text-slate-400 mr-2">Invoice No:</span> {data.invoiceNumber}</p>
                    <p className="text-xs text-slate-800 font-semibold mb-2"><span className="font-bold uppercase tracking-widest text-slate-400 mr-2">Invoice Date:</span> {data.dateIssued}</p>
                    {data.dueDate && <p className="text-xs text-slate-800 font-semibold"><span className="font-bold uppercase tracking-widest text-slate-400 mr-2">Due Date:</span> {data.dueDate}</p>}
                </div>
            </div>

            <div className="flex flex-1 px-8 relative">
                {/* Left Column Background */}
                <div className="absolute top-0 bottom-0 left-8 w-[250px] bg-slate-100 rounded-tr-[40px] rounded-br-[40px] -z-10 print:-webkit-print-color-adjust-exact"></div>

                {/* Left Column Content */}
                <div className="w-[250px] pr-8 pt-6 pb-12 flex flex-col">
                    <div className="mb-10 pl-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-3 block border-b-2 border-slate-300 pb-1 w-max">Payment Method</h4>
                        {data.paymentInstructions ? (
                            <p className="text-xs text-slate-600 font-medium whitespace-pre-wrap">{data.paymentInstructions}</p>
                        ) : (
                            <div className="text-xs text-slate-600 font-medium space-y-2">
                                <p>Bank Account</p>
                                <p>Paypal</p>
                                <p>Master Card</p>
                            </div>
                        )}
                    </div>
                    <div className="pl-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-3 block border-b-2 border-slate-300 pb-1 w-max">Terms & Conditions:</h4>
                        <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-wrap">{data.notes}</p>
                    </div>
                </div>

                {/* Right Column Table */}
                <div className="flex-1 pl-8 pr-4">
                    <table className="w-full text-left mb-8 border-collapse mt-0 pt-0">
                        <thead>
                            <tr className="border-y-2" style={{ borderColor: tColor }}>
                                <th className="py-3 text-xs font-black uppercase tracking-widest text-slate-800">Product</th>
                                <th className="py-3 text-xs font-black uppercase tracking-widest text-slate-800 text-center">Price</th>
                                <th className="py-3 text-xs font-black uppercase tracking-widest text-slate-800 text-center">Qty</th>
                                <th className="py-3 text-xs font-black uppercase tracking-widest text-slate-800 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="border-b-2" style={{ borderColor: tColor }}>
                            {data.items.map((item) => (
                                <tr key={item.id} className="border-b border-slate-50 last:border-b-0">
                                    <td className="py-4 text-sm text-slate-700 font-medium bg-transparent">{item.itemName}</td>
                                    <td className="py-4 text-sm text-center text-slate-500">{data.currency}{Number(item.price).toLocaleString()}</td>
                                    <td className="py-4 text-sm text-center text-slate-500">{item.quantity}</td>
                                    <td className="py-4 text-sm text-right font-bold text-slate-800">{data.currency}{(item.quantity * item.price).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="w-64 ml-auto mb-16 space-y-2">
                        <div className="flex justify-between py-1">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Sub Total</span>
                            <span className="text-sm font-semibold">{data.currency}{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-1">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Tax</span>
                            <span className="text-sm font-semibold">{data.currency}0.00</span>
                        </div>
                        <div className="flex justify-between py-2 border-t mt-2 pt-2 border-slate-200">
                            <span className="text-sm font-black uppercase tracking-widest text-slate-900">Total</span>
                            <span className="text-lg font-black text-slate-800">{data.currency}{subtotal.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-sm font-semibold text-slate-600 mb-2">Carollina Devasya</p>
                        <div className="text-3xl font-signature text-slate-800 mb-2 italic px-4">Signature</div>
                        <div className="w-48 h-px bg-slate-300 ml-auto mb-2"></div>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-800">General Manager</p>
                    </div>
                </div>
            </div>

            {/* Footer Shapes */}
            <div className="h-28 w-full flex relative rounded-tl-[80px] overflow-hidden mt-8 print:-webkit-print-color-adjust-exact shadow-[0_-10px_20px_rgba(0,0,0,0.05)]" style={{ backgroundColor: tColor }}>
                <div className="w-[15%] absolute top-0 left-0 bg-slate-900 rounded-br-[50px] opacity-20 h-full"></div>
                <div className="w-[20%] absolute bottom-0 right-0 bg-white rounded-tl-[100px] opacity-10 h-full"></div>
                {/* More subtle shapes */}
                <div className="absolute top-1/2 left-20 w-12 h-12 bg-white rounded-lg opacity-20 rotate-45"></div>
                <div className="absolute top-6 right-20 w-8 h-8 bg-black rounded-full opacity-20"></div>

                <div className="w-full h-full flex flex-col items-center justify-center text-white/90 text-sm font-medium relative z-10">
                    <span className="font-bold tracking-widest">+ {data.companyPhone}</span>
                    <span>{data.companyEmail || 'studio@company.com'}</span>
                    <span>{data.companyWebsite || 'www.company.com'}</span>
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
        .font-signature { font-family: 'Caveat', cursive; }
      `}</style>
        </div>
    );
};

export default GeometricTemplate;
