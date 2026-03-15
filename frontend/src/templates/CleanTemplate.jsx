import React from 'react';

const CleanTemplate = ({ data, handleLogoUpload, calculateSubtotal, isEditing }) => {
    const subtotal = calculateSubtotal();

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-[793.7px] min-h-[1056px] mx-auto flex flex-col font-sans relative overflow-hidden print:w-full print:shadow-none print:border-none print:min-h-0 print:h-auto break-words p-12 text-gray-800">

            {/* Header: Logo and Invoice Title */}
            <div className="flex justify-between items-start mb-8">
                {/* Logo Area */}
                <div className="w-1/2">
                    <div className="relative group/logo w-48 h-32 flex items-center justify-center bg-transparent border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-md cursor-pointer overflow-hidden transition-colors">
                        {isEditing && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 print:hidden"
                                title="Upload Logo"
                            />
                        )}
                        {data.logo ? (
                            <img src={data.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                        ) : (
                            <div className="flex items-center text-gray-400 font-medium">
                                <span className="mr-2 text-2xl font-light">+</span> Add Your Logo
                            </div>
                        )}
                    </div>
                </div>

                {/* INVOICE Title & Number */}
                <div className="w-1/2 flex flex-col items-end">
                    <h1 className="text-4xl font-normal text-gray-800 tracking-wide mb-4">INVOICE</h1>
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2 w-48 bg-white transition-colors hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                        <span className="text-gray-400 mr-3">#</span>
                        <span className="text-gray-800 flex-1 text-right font-medium">{data.invoiceNumber || '1'}</span>
                    </div>
                </div>
            </div>

            {/* Sender & Recipient Section */}
            <div className="flex justify-between items-start mb-10 gap-8 mt-4">
                {/* Left Side: From & To */}
                <div className="w-1/2 flex flex-col gap-8">
                    {/* From */}
                    <div>
                        <div className="border border-transparent hover:border-gray-200 p-3 -ml-3 rounded transition-colors text-gray-800">
                            {data.companyName && <div className="font-semibold">{data.companyName}</div>}
                            {data.companyAddress && <div className="whitespace-pre-wrap text-sm mt-1">{data.companyAddress}</div>}
                            {(data.companyEmail || data.companyPhone || data.companyWebsite) && (
                                <div className="mt-2 text-sm text-gray-600">
                                    {data.companyPhone && <span>{data.companyPhone}</span>}
                                    {data.companyPhone && data.companyEmail && <span className="mx-2">•</span>}
                                    {data.companyEmail && <span>{data.companyEmail}</span>}
                                    {data.companyWebsite && data.companyEmail && <span className="mx-2">•</span>}
                                    {data.companyWebsite && <span>{data.companyWebsite}</span>}
                                </div>
                            )}
                            {!data.companyName && !data.companyAddress && <span className="text-gray-400">Who is this from?</span>}
                        </div>
                    </div>

                    {/* To */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <h3 className="text-gray-600 font-medium mb-2 text-sm">Bill To</h3>
                            <div className="border border-gray-300 hover:border-gray-400 rounded p-3 min-h-[6rem] transition-colors">
                                {data.clientName && <div className="font-semibold">{data.clientName}</div>}
                                {data.clientCompany && <div className="text-sm mt-1">{data.clientCompany}</div>}
                                {data.clientAddress && <div className="whitespace-pre-wrap text-sm mt-1">{data.clientAddress}</div>}
                                {!data.clientName && !data.clientCompany && !data.clientAddress && <span className="text-gray-400">Who is this to?</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="w-[45%] flex flex-col gap-3 relative">
                    <div className="flex items-center justify-end gap-3 group">
                        <span className="text-gray-600 text-sm w-28 text-right">Date</span>
                        <div className="border border-gray-300 rounded px-3 py-2 w-48 text-right text-sm hover:border-blue-400 transition-colors">
                            {data.dateIssued}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 group">
                        <span className="text-gray-600 text-sm w-28 text-right">Payment Terms</span>
                        <div className="border border-gray-300 rounded px-3 py-2 w-48 text-right text-sm hover:border-blue-400 transition-colors">
                            {data.projectDescription || ''}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 group">
                        <span className="text-gray-600 text-sm w-28 text-right">Due Date</span>
                        <div className="border border-gray-300 rounded px-3 py-2 w-48 text-right text-sm hover:border-blue-400 transition-colors">
                            {data.dueDate}
                        </div>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#1a2433] text-white print:-webkit-print-color-adjust-exact">
                        <tr>
                            <th className="py-2.5 px-3 font-medium text-sm rounded-tl w-[60%] border-r border-[#1a2433]">Item</th>
                            <th className="py-2.5 px-3 font-medium text-sm text-center w-[10%]">Quantity</th>
                            <th className="py-2.5 px-3 font-medium text-sm text-right w-[15%]">Rate</th>
                            <th className="py-2.5 px-3 font-medium text-sm text-right rounded-tr w-[15%]">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {data.items.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors group">
                                <td className="py-3 px-3">
                                    <div className="font-medium">{item.itemName || 'Description of item/service...'}</div>
                                    {item.date && <div className="text-sm text-gray-500 mt-1">{item.date}</div>}
                                </td>
                                <td className="py-3 px-3 text-center align-top pt-4">{item.quantity}</td>
                                <td className="py-3 px-3 text-right align-top pt-4">
                                    <span className="text-gray-500 mr-1">{data.currency}</span>{Number(item.price).toLocaleString()}
                                </td>
                                <td className="py-3 px-3 text-right font-medium align-top pt-4">
                                    <span className="text-gray-500 mr-1">{data.currency}</span>{(item.quantity * item.price).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-3">
                    <button className="text-[#009e74] text-sm font-medium hover:text-green-700 flex items-center print:hidden transition-colors">
                        <span className="mr-1 text-lg leading-none">+</span> Line Item
                    </button>
                </div>
            </div>

            {/* Footer: Notes & Totals */}
            <div className="flex gap-12 mt-4 page-break-inside-avoid">
                {/* Notes & Terms */}
                <div className="w-1/2 flex flex-col gap-6">
                    {data.paymentInstructions && (
                        <div>
                            <h3 className="text-gray-600 font-medium mb-2 text-sm">Payment Instructions</h3>
                            <div className="text-gray-800 text-sm whitespace-pre-wrap hover:border-gray-300 border border-transparent p-2 -ml-2 rounded transition-colors">
                                {data.paymentInstructions}
                            </div>
                        </div>
                    )}
                    <div>
                        <h3 className="text-gray-600 font-medium mb-2 text-sm">Notes</h3>
                        <div className="text-gray-800 text-sm whitespace-pre-wrap hover:border-gray-300 border border-transparent p-2 -ml-2 rounded min-h-[4rem] transition-colors">{data.notes || 'Notes - any relevant information not already covered'}</div>
                    </div>
                </div>

                {/* Calculations */}
                <div className="w-[45%] flex-1">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center px-2 py-1 text-gray-700 text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span><span className="text-gray-400 mr-1">{data.currency}</span>{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="flex flex-col gap-2 my-2 w-full">
                            <div className="flex items-center justify-between px-2 text-sm">
                                <span className="text-[#009e74] font-medium print:text-gray-600">+ Discount</span>
                                <span className="text-[#009e74] font-medium print:text-gray-600">+ Shipping</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center px-2 py-1 text-gray-800 font-bold border-t border-gray-200 pt-3 text-sm">
                            <span>Total</span>
                            <span><span className="text-gray-500 mr-1 font-normal">{data.currency}</span>{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-center px-2 py-1 text-gray-700 mt-2 border-t border-gray-200 pt-3 group">
                            <span className="text-sm">Amount Paid</span>
                            <div className="border border-gray-300 rounded px-3 py-1.5 w-32 text-right text-sm hover:border-blue-400 transition-colors flex items-center">
                                <span className="text-gray-400 mr-1">{data.currency}</span>
                                <span className="flex-1">0</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center px-2 py-1 text-gray-800 font-bold mt-2">
                            <span>Balance Due</span>
                            <span><span className="text-gray-500 mr-1 font-normal">{data.currency}</span>{subtotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CleanTemplate;
