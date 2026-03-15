import React from 'react';

const ElegantTemplate = ({ data, handleLogoUpload, calculateSubtotal, isEditing }) => {
    const subtotal = calculateSubtotal();

    return (
        <div className="bg-white rounded-lg shadow-sm w-[793.7px] min-h-[1056px] mx-auto flex font-sans relative overflow-hidden print:w-full print:shadow-none print:min-h-0 print:h-auto break-words pb-8">
            {/* Sidebar */}
            <div
                className="w-[30%] flex flex-col justify-between p-8 text-white relative z-10 print:-webkit-print-color-adjust-exact"
                style={{ backgroundColor: data.themeColor || '#1e5f4c' }}
            >
                {/* Background shapes */}
                <div className="absolute top-10 -left-10 w-48 h-48 bg-white/10 rounded-full opacity-50 blur-lg pointer-events-none"></div>
                <div className="absolute bottom-20 -right-10 w-64 h-64 bg-white/10 rounded-full opacity-50 blur-lg pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-black/10 rounded-full opacity-30 blur-2xl pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex flex-col items-start gap-3 mb-12">
                        <div className="relative group/logo w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner cursor-pointer shrink-0">
                            {isEditing && (
                                <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 print:hidden" title="Upload Logo" />
                            )}
                            {data.logo ? (
                                <img src={data.logo} alt="Logo" className="w-full h-full object-contain p-1" />
                            ) : (
                                <div className="font-bold text-2xl" style={{ color: data.themeColor || '#1e5f4c' }}>
                                    {data.companyName.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="font-bold text-2xl leading-tight mt-2">{data.companyName}</div>
                    </div>
                    <div className="text-white/80 text-xs space-y-6">
                        <div>
                            <p className="font-bold uppercase tracking-widest text-[9px] mb-1 text-white/50">Address</p>
                            <p className="whitespace-pre-wrap">{data.companyAddress}</p>
                        </div>
                        <div>
                            <p className="font-bold uppercase tracking-widest text-[9px] mb-1 text-white/50">Contact</p>
                            <p>{data.companyPhone}</p>
                            <p>{data.companyEmail}</p>
                            <p>{data.companyWebsite}</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-12">
                    {data.paymentInstructions && (
                        <div className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-white/90">Payment Instructions</h3>
                            <p className="text-xs text-white/80 whitespace-pre-wrap leading-relaxed">{data.paymentInstructions}</p>
                        </div>
                    )}
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-white/90">Terms & Conditions</h3>
                    <p className="text-xs text-white/80 whitespace-pre-wrap leading-relaxed">{data.notes}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-[70%] p-10 flex flex-col relative z-8">
                <div className="text-right mb-12">
                    <h1 className="text-5xl font-black uppercase tracking-widest text-slate-800">Invoice</h1>
                </div>

                <div className="flex justify-between items-start mb-10">
                    <div className="w-1/2">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1">Invoice To</h2>
                        <p className="text-xl font-bold text-slate-800">{data.clientName}</p>
                        {data.clientCompany && <p className="text-sm font-semibold text-slate-600 mt-1">{data.clientCompany}</p>}
                        <p className="text-sm text-slate-500 whitespace-pre-wrap mt-1">{data.clientAddress}</p>
                    </div>
                    <div className="w-1/2 pl-8 flex justify-end">
                        <table className="text-xs text-right border-collapse">
                            <tbody>
                                <tr>
                                    <td className="py-2 pr-4 font-bold text-slate-500 uppercase tracking-wider">Invoice No:</td>
                                    <td className="font-semibold text-slate-800 text-sm">{data.invoiceNumber}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-4 font-bold text-slate-500 uppercase tracking-wider">Date:</td>
                                    <td className="font-semibold text-slate-800">{data.dateIssued}</td>
                                </tr>
                                {data.dueDate && (
                                    <tr>
                                        <td className="py-2 pr-4 font-bold text-slate-500 uppercase tracking-wider">Due Date:</td>
                                        <td className="font-semibold text-slate-800">{data.dueDate}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <table className="w-full text-left border-collapse mb-8 mt-4 print:-webkit-print-color-adjust-exact">
                    <thead style={{ backgroundColor: data.themeColor || '#1e5f4c' }}>
                        <tr className="text-white">
                            <th className="py-3 px-4 text-xs font-bold uppercase tracking-widest rounded-tl-lg">Item Description</th>
                            <th className="py-3 px-4 text-xs font-bold uppercase tracking-widest text-center">Price</th>
                            <th className="py-3 px-4 text-xs font-bold uppercase tracking-widest text-center">Qty</th>
                            <th className="py-3 px-4 text-xs font-bold uppercase tracking-widest text-right rounded-tr-lg">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, index) => (
                            <tr key={item.id} className={index % 2 === 0 ? 'bg-slate-100/50' : 'bg-white'}>
                                <td className="py-4 px-4 text-sm font-semibold text-slate-800">{item.itemName}</td>
                                <td className="py-4 px-4 text-sm text-center text-slate-600">{data.currency}{Number(item.price).toLocaleString()}</td>
                                <td className="py-4 px-4 text-sm text-center text-slate-600">{item.quantity}</td>
                                <td className="py-4 px-4 text-sm text-right font-bold text-slate-800">{data.currency}{(item.quantity * item.price).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-end mb-16 page-break-inside-avoid">
                    <div className="w-[300px]">
                        <div className="flex justify-between py-3 border-b border-slate-200">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sub Total</span>
                            <span className="text-sm font-semibold text-slate-800">{data.currency}{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-4 items-center bg-slate-50 px-4 rounded-b-xl border border-slate-100">
                            <span className="text-sm font-black text-slate-800 uppercase tracking-widest">Total</span>
                            <span className="text-2xl font-black" style={{ color: data.themeColor || '#1e5f4c' }}>{data.currency}{subtotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto page-break-inside-avoid flex justify-end">
                    <div className="text-center">
                        <div className="w-48 h-px bg-slate-300 my-2 print:border-t print:border-black"></div>
                        <p className="text-sm font-bold text-slate-800">Alpreo Saramaki</p>
                        <span className="text-[10px] text-white px-3 py-1 rounded-full uppercase font-bold tracking-widest mt-1 inline-block print:-webkit-print-color-adjust-exact" style={{ backgroundColor: data.themeColor || '#1e5f4c' }}>Manager</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElegantTemplate;
