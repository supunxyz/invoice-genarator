import React from 'react';
import { Upload } from 'lucide-react';

const ModernTemplate = ({ data, setData, handleLogoUpload, calculateSubtotal, isEditing }) => {
    const subtotal = calculateSubtotal();

    return (
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none flex flex-col min-h-[1056px] w-[793.7px] max-w-full mx-auto relative group print:w-full print:min-h-0 print:h-auto break-words">
            {/* Header Section */}
            <div
                className="text-white p-8 md:p-12 relative overflow-hidden print:-webkit-print-color-adjust-exact"
                style={{ backgroundColor: data.themeColor }}
            >
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="relative group/logo w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner shrink-0 cursor-pointer">
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
                                    <img src={data.logo} alt="Company Logo" className="w-full h-full object-contain bg-white p-1" />
                                ) : (
                                    <>
                                        <span
                                            className="font-black text-2xl italic group-hover/logo:opacity-0 transition-opacity duration-300 z-10"
                                            style={{ color: data.themeColor }}
                                        >
                                            {data.companyName.substring(0, 2).toUpperCase() || 'LOGO'}
                                        </span>
                                        {isEditing && (
                                            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 z-10 print:hidden text-blue-600">
                                                <Upload size={20} />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter uppercase">{data.companyName}</h2>
                                <p className="text-white/80 text-sm font-medium tracking-widest uppercase mt-1">
                                    {data.companyTagline}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <h1 className="text-5xl font-light tracking-widest uppercase mb-2">Invoice</h1>
                        <div className="h-1 w-16 bg-white ml-auto rounded-full"></div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -ml-16 -mb-16 pointer-events-none"></div>
            </div>

            {/* Client & Metadata Info */}
            <div className="p-8 md:p-12 flex-1 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: data.themeColor }}>Billed To:</h3>
                            <div className="text-xl font-bold text-slate-800">{data.clientName}</div>
                            {data.clientCompany && <div className="text-slate-600">{data.clientCompany}</div>}
                            <div className="text-slate-500 whitespace-pre-wrap text-sm mt-1 max-w-[250px]">{data.clientAddress}</div>
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-start space-y-3">
                        <div className="flex justify-between md:justify-end md:gap-8 w-full">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Invoice No</span>
                            <span className="text-sm font-mono font-semibold text-slate-800 text-right min-w-[120px]">{data.invoiceNumber}</span>
                        </div>
                        <div className="flex justify-between md:justify-end md:gap-8 w-full">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Date Issued</span>
                            <span className="text-sm font-semibold text-slate-800 text-right min-w-[120px]">{data.dateIssued}</span>
                        </div>
                        {data.dueDate && (
                            <div className="flex justify-between md:justify-end md:gap-8 w-full">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Due Date</span>
                                <span className="text-sm font-semibold text-slate-800 text-right min-w-[120px]">{data.dueDate}</span>
                            </div>
                        )}
                        {data.projectDescription && (
                            <div className="flex flex-col md:items-end mt-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Project</span>
                                <span className="text-sm font-medium text-slate-700 text-right max-w-[250px]">{data.projectDescription}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Line Items Table */}
                <div className="mb-8 flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2" style={{ borderBottomColor: data.themeColor }}>
                                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/5">Date</th>
                                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest w-2/5">Item Name</th>
                                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Qty / Days</th>
                                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Price</th>
                                <th className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.items.map((item) => (
                                <tr key={item.id} className="group transition-colors">
                                    <td className="py-4 px-2 text-sm text-slate-600">{item.date}</td>
                                    <td className="py-4 px-2 text-sm text-slate-800 font-medium break-words pr-4">{item.itemName}</td>
                                    <td className="py-4 px-2 text-sm text-center text-slate-600">{item.quantity}</td>
                                    <td className="py-4 px-2 text-sm text-right text-slate-600">
                                        {data.currency}{Number(item.price).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-2 text-sm text-right font-bold text-slate-800">
                                        {data.currency}{(item.quantity * item.price).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Totals & Summary */}
                <div className="flex flex-col md:flex-row justify-between gap-12 pt-8 border-t border-slate-100 mt-auto page-break-inside-avoid">
                    <div className="flex-1">
                        {data.paymentInstructions && (
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2" style={{ color: data.themeColor }}>Payment Instructions</h4>
                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{data.paymentInstructions}</p>
                            </div>
                        )}
                        {data.notes && (
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2" style={{ color: data.themeColor }}>Notes / Terms</h4>
                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{data.notes}</p>
                            </div>
                        )}

                        {/* Signature Section */}
                        <div className="w-48 border-t-2 pt-2 mt-16 print:mt-12" style={{ borderTopColor: data.themeColor }}>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Authorized Signatory</p>
                        </div>
                    </div>

                    <div className="min-w-[280px]">
                        <div
                            className="text-white rounded-xl p-6 shadow-lg relative overflow-hidden"
                            style={{ backgroundColor: data.themeColor }}
                        >
                            <div className="flex justify-between items-center mb-2 z-10 relative">
                                <span className="text-xs uppercase tracking-widest text-white/80">Subtotal</span>
                                <span className="text-lg font-light">{data.currency}{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="h-px bg-white/20 my-4 z-10 relative"></div>
                            <div className="flex justify-between items-end z-10 relative">
                                <span className="text-sm font-bold uppercase tracking-widest">Total Due</span>
                                <span className="text-3xl font-black">{data.currency}{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rotate-45 transform translate-x-16 -translate-y-16 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legal Footer */}
            <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 text-center flex flex-col items-center justify-center gap-1 mt-auto page-break-inside-avoid">
                <p className="text-sm text-slate-700 font-semibold">{data.companyName}</p>
                <p className="text-xs text-slate-500">
                    {data.companyAddress} {data.companyPhone && `• Tel: ${data.companyPhone}`} {data.companyEmail && `• Email: ${data.companyEmail}`} {data.companyWebsite && `• Web: ${data.companyWebsite}`}
                </p>
            </div>
        </div>
    );
};

export default ModernTemplate;
