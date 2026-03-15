import React from 'react';
import { Upload } from 'lucide-react';

const CreativeTemplate = ({ data, handleLogoUpload, calculateSubtotal, isEditing }) => {
    const subtotal = calculateSubtotal();

    return (
        <div className="bg-white rounded-lg shadow-sm w-[793.7px] min-h-[1056px] mx-auto flex font-sans relative overflow-hidden print:w-full print:shadow-none print:min-h-0 print:h-auto break-words pb-8">
            {/* Sidebar */}
            <div
                className="w-1/3 p-8 flex flex-col text-white print:-webkit-print-color-adjust-exact relative"
                style={{ backgroundColor: data.themeColor }}
            >
                <div className="relative z-10">
                    <div className="mb-12 relative group/logo w-32 h-32 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden shrink-0 cursor-pointer">
                        {isEditing && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 print:hidden"
                                title="Upload Company Logo"
                            />
                        )}
                        {data.logo ? (
                            <img src={data.logo} alt="Company Logo" className="w-full h-full object-contain p-2" />
                        ) : (
                            <>
                                <span className="font-black text-3xl opacity-80 z-10">LOGO</span>
                                {isEditing && (
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 z-10 print:hidden">
                                        <Upload size={24} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="mb-12">
                        <h2 className="text-2xl font-black tracking-tight uppercase mb-1">{data.companyName}</h2>
                        <p className="text-white/80 text-xs font-bold uppercase tracking-widest">{data.companyTagline}</p>
                    </div>
                    <div className="space-y-6 text-sm">
                        <div>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1 border-b border-white/20 pb-1 inline-block">Address</p>
                            <p className="font-medium whitespace-pre-wrap mt-1">{data.companyAddress}</p>
                        </div>
                        <div>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1 border-b border-white/20 pb-1 inline-block">Contact</p>
                            <p className="font-medium mt-1">{data.companyPhone}</p>
                            <p className="font-medium">{data.companyEmail}</p>
                            {data.companyWebsite && <p className="font-medium">{data.companyWebsite}</p>}
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-1/4 -right-16 w-32 h-32 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-10 flex flex-col">
                <div className="flex justify-between items-end mb-16 border-b-4 pb-4" style={{ borderColor: data.themeColor }}>
                    <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-900" style={{ color: data.themeColor }}>Invoice</h1>
                    <div className="text-right">
                        <div className="flex gap-4 justify-end mb-1">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Invoice No:</span>
                            <span className="text-sm font-bold text-slate-800">{data.invoiceNumber}</span>
                        </div>
                        <div className="flex gap-4 justify-end">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Date:</span>
                            <span className="text-sm font-bold text-slate-800">{data.dateIssued}</span>
                        </div>
                        {data.dueDate && (
                            <div className="flex gap-4 justify-end mt-1">
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Due:</span>
                                <span className="text-sm font-bold text-slate-800">{data.dueDate}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 border-b-2 block pb-1 border-slate-100 max-w-max">Billed To</h3>
                    <p className="text-xl font-black text-slate-800">{data.clientName}</p>
                    {data.clientCompany && <p className="text-slate-600 font-medium">{data.clientCompany}</p>}
                    <p className="text-slate-500 text-sm whitespace-pre-wrap mt-2 max-w-xs leading-relaxed">{data.clientAddress}</p>
                </div>

                {data.projectDescription && (
                    <div className="mb-8">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 max-w-max">Project Info</h4>
                        <p className="text-sm font-medium text-slate-700 bg-slate-50 p-4 rounded-lg">{data.projectDescription}</p>
                    </div>
                )}

                <div className="mb-8 flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100 rounded-lg text-slate-600">
                                <th className="py-3 px-4 text-xs font-bold uppercase tracking-widest rounded-l-lg">Item</th>
                                <th className="py-3 px-4 text-xs font-bold uppercase tracking-widest text-center">Qty</th>
                                <th className="py-3 px-4 text-xs font-bold uppercase tracking-widest text-right">Price</th>
                                <th className="py-3 px-4 text-xs font-bold uppercase tracking-widest text-right rounded-r-lg">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.items.map((item) => (
                                <tr key={item.id} className="page-break-inside-avoid group">
                                    <td className="py-4 px-4">
                                        <p className="text-sm font-bold text-slate-800 break-words">{item.itemName}</p>
                                        <p className="text-xs text-slate-500 mt-1">{item.date}</p>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-center font-medium text-slate-700">{item.quantity}</td>
                                    <td className="py-4 px-4 text-sm text-right font-medium text-slate-700">{data.currency}{Number(item.price).toLocaleString()}</td>
                                    <td className="py-4 px-4 text-sm text-right font-black text-slate-900">
                                        {data.currency}{(item.quantity * item.price).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mb-12 page-break-inside-avoid">
                    <div className="w-3/5 bg-slate-50 p-6 rounded-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Subtotal</span>
                            <span className="text-lg font-bold text-slate-700">{data.currency}{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="h-px w-full bg-slate-200 mb-4"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-black uppercase tracking-widest" style={{ color: data.themeColor }}>Total Due</span>
                            <span className="text-3xl font-black text-slate-900">{data.currency}{subtotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 page-break-inside-avoid flex flex-col justify-end">
                    {data.paymentInstructions && (
                        <div className="mb-6">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Payment Instructions</h4>
                            <p className="text-sm text-slate-700 whitespace-pre-wrap">{data.paymentInstructions}</p>
                        </div>
                    )}
                    <div className="flex justify-between items-end">
                        <p className="text-sm text-slate-500 font-medium whitespace-pre-wrap italic w-2/3 pr-4">{data.notes}</p>
                        <div className="w-1/3 text-center">
                            <div className="border-b-2 h-10 w-full mb-1" style={{ borderColor: data.themeColor }}></div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Authorized Signature</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
