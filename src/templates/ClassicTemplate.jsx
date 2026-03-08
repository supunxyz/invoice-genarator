import React from 'react';

const ClassicTemplate = ({ data, handleLogoUpload, calculateSubtotal, isEditing }) => {
    const subtotal = calculateSubtotal();

    return (
        <div className="bg-white rounded-lg shadow-sm w-[793.7px] min-h-[1056px] mx-auto p-12 text-gray-800 font-serif flex flex-col relative print:w-full print:shadow-none print:min-h-0 print:h-auto break-words print:p-8">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 pb-8 mb-8" style={{ borderColor: data.themeColor }}>
                <div className="flex gap-6 items-center flex-1">
                    {data.logo ? (
                        <img src={data.logo} alt="Logo" className="w-24 h-24 object-contain" />
                    ) : (
                        <div
                            className="w-24 h-24 border-2 flex items-center justify-center font-bold text-xl uppercase tracking-widest text-gray-400"
                            style={{ borderColor: data.themeColor }}
                        >
                            LOGO
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold uppercase tracking-widest mb-1" style={{ color: data.themeColor }}>
                            {data.companyName}
                        </h1>
                        <p className="text-sm text-gray-500 italic max-w-sm">{data.companyTagline}</p>
                    </div>
                </div>
                <div className="text-right flex-1">
                    <h2 className="text-4xl font-light uppercase tracking-widest text-gray-300 mb-4">Invoice</h2>
                    <div className="text-sm text-gray-600">
                        <p className="font-semibold">{data.companyAddress}</p>
                        <p>{data.companyPhone}</p>
                        <p>{data.companyEmail}</p>
                        {data.companyWebsite && <p>{data.companyWebsite}</p>}
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="flex justify-between mb-12">
                <div className="w-1/2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 border-b block pb-1 border-gray-100">Bill To</h3>
                    <p className="text-lg font-bold text-gray-800">{data.clientName}</p>
                    {data.clientCompany && <p className="text-gray-700">{data.clientCompany}</p>}
                    <p className="text-gray-500 text-sm whitespace-pre-wrap mt-1 max-w-[250px]">{data.clientAddress}</p>
                </div>
                <div className="w-1/2 flex justify-end">
                    <table className="text-sm text-right">
                        <tbody>
                            <tr>
                                <td className="pr-4 py-1 text-gray-500 font-bold uppercase text-xs tracking-wider">Invoice #</td>
                                <td className="font-mono text-gray-800 font-semibold">{data.invoiceNumber}</td>
                            </tr>
                            <tr>
                                <td className="pr-4 py-1 text-gray-500 font-bold uppercase text-xs tracking-wider">Date</td>
                                <td className="text-gray-800 font-medium">{new Date(data.dateIssued).toLocaleDateString()}</td>
                            </tr>
                            {data.dueDate && (
                                <tr>
                                    <td className="pr-4 py-1 text-gray-500 font-bold uppercase text-xs tracking-wider">Due</td>
                                    <td className="text-gray-800 font-medium">{new Date(data.dueDate).toLocaleDateString()}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {data.projectDescription && (
                <div className="mb-10 p-4 bg-gray-50 border-l-4" style={{ borderColor: data.themeColor }}>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Project</h4>
                    <p className="text-sm text-gray-700">{data.projectDescription}</p>
                </div>
            )}

            {/* Items Table */}
            <table className="w-full text-left mb-8 border-collapse mt-4 page-break-inside-auto">
                <thead>
                    <tr className="border-b" style={{ borderColor: data.themeColor }}>
                        <th className="py-2 text-xs font-bold uppercase tracking-wider text-gray-500">Date</th>
                        <th className="py-2 text-xs font-bold uppercase tracking-wider text-gray-500 w-1/2">Description</th>
                        <th className="py-2 text-center text-xs font-bold uppercase tracking-wider text-gray-500">Qty</th>
                        <th className="py-2 text-right text-xs font-bold uppercase tracking-wider text-gray-500">Price</th>
                        <th className="py-2 text-right text-xs font-bold uppercase tracking-wider text-gray-500">Total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.items.map((item) => (
                        <tr key={item.id} className="page-break-inside-avoid">
                            <td className="py-3 text-sm text-gray-600">{item.date}</td>
                            <td className="py-3 text-sm text-gray-800 break-words pr-2">{item.itemName}</td>
                            <td className="py-3 text-sm text-center text-gray-600">{item.quantity}</td>
                            <td className="py-3 text-sm text-right text-gray-600">{data.currency}{Number(item.price).toLocaleString()}</td>
                            <td className="py-3 text-sm text-right text-gray-800 font-semibold">
                                {data.currency}{(item.quantity * item.price).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Summary */}
            <div className="flex justify-end mb-16 page-break-inside-avoid">
                <div className="w-1/3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Subtotal</span>
                        <span className="text-gray-800 font-semibold">{data.currency}{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b-2" style={{ borderColor: data.themeColor }}>
                        <span className="text-gray-800 font-black uppercase tracking-widest">Total</span>
                        <span className="text-xl font-black text-gray-900">{data.currency}{subtotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8 border-t border-gray-200 page-break-inside-avoid">
                <div className="flex justify-between items-end">
                    <div className="w-1/2">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Notes</p>
                        <p className="text-sm text-gray-600 italic whitespace-pre-wrap">{data.notes || 'Thank you for your business.'}</p>
                    </div>
                    <div className="w-64 text-center">
                        <div className="border-b border-gray-400 h-10 w-full mb-2"></div>
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Authorized Signature</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassicTemplate;
