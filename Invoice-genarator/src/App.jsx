import React, { useState } from 'react';
import { Printer, Plus, Trash2, Upload } from 'lucide-react';

const App = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-2024-001',
    date: new Date().toISOString().split('T')[0],
    clientName: '',
    description: '',
    logo: '',
    items: [
      { id: 1, date: '', itemName: '', days: 1, price: 0 }
    ]
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData({ ...invoiceData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { id: Date.now(), date: '', itemName: '', days: 1, price: 0 }]
    });
  };

  const removeItem = (id) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData({
        ...invoiceData,
        items: invoiceData.items.filter(item => item.id !== id)
      });
    }
  };

  const updateItem = (id, field, value) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((acc, item) => acc + (item.days * item.price), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      {/* Action Bar - Hidden on Print */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap gap-4 justify-between items-center print:hidden">
        <h1 className="text-2xl font-bold text-slate-800">Invoice Editor</h1>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Printer size={18} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Main Invoice Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none flex flex-col">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="relative group w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner shrink-0 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 print:hidden"
                    title="Upload Company Logo"
                  />
                  {invoiceData.logo ? (
                    <img src={invoiceData.logo} alt="Company Logo" className="w-full h-full object-contain bg-white p-1" />
                  ) : (
                    <>
                      <span className="text-blue-900 font-black text-xl italic group-hover:opacity-0 transition-opacity duration-300 z-10">SRP</span>
                      <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-600 z-10 print:hidden">
                        <Upload size={20} />
                      </div>
                    </>
                  )}
                </div>
                <h2 className="text-2xl font-black tracking-tighter uppercase">SRP Creation</h2>
              </div>
              <p className="text-blue-100 text-sm font-medium tracking-widest uppercase">
                Media & Entertainment • Television • Equipment & Supplies
              </p>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-light tracking-widest uppercase mb-1">Invoice</h1>
              <div className="h-1 w-12 bg-white ml-auto"></div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full -ml-10 -mb-10"></div>
        </div>

        {/* Client & Metadata Info */}
        <div className="p-8 md:p-12 flex-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">To:</label>
                <input
                  type="text"
                  placeholder="Client Name (Ms/Mr:)"
                  className="w-full text-xl font-semibold border-b-2 border-slate-100 focus:border-blue-500 outline-none py-1 transition-all"
                  value={invoiceData.clientName}
                  onChange={(e) => setInvoiceData({ ...invoiceData, clientName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Project Description:</label>
                <textarea
                  placeholder="Detailed project description..."
                  className="w-full border-b-2 border-slate-100 focus:border-blue-500 outline-none py-1 transition-all resize-none"
                  rows="2"
                  value={invoiceData.description}
                  onChange={(e) => setInvoiceData({ ...invoiceData, description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col md:items-end justify-start space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Number</span>
                <input
                  type="text"
                  className="text-right font-mono bg-slate-50 px-2 py-1 rounded border border-slate-200"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date Issued</span>
                <input
                  type="date"
                  className="text-right bg-slate-50 px-2 py-1 rounded border border-slate-200"
                  value={invoiceData.date}
                  onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/5">Date</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest w-2/5">Item Name</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Days</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Price</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Total</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center print:hidden">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoiceData.items.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        placeholder="YYYY-MM-DD"
                        className="w-full bg-transparent outline-none focus:ring-1 focus:ring-blue-400 rounded px-1"
                        value={item.date}
                        onChange={(e) => updateItem(item.id, 'date', e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      <input
                        type="text"
                        placeholder="Service/Item Name"
                        className="w-full bg-transparent outline-none focus:ring-1 focus:ring-blue-400 rounded px-1"
                        value={item.itemName}
                        onChange={(e) => updateItem(item.id, 'itemName', e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        className="w-16 text-center bg-transparent outline-none focus:ring-1 focus:ring-blue-400 rounded px-1"
                        value={item.days}
                        onChange={(e) => updateItem(item.id, 'days', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end">
                        <span className="text-slate-400 mr-1 text-xs">Rs.</span>
                        <input
                          type="number"
                          className="w-24 text-right bg-transparent outline-none focus:ring-1 focus:ring-blue-400 rounded px-1"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-800">
                      Rs. {(item.days * item.price).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center print:hidden">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addItem}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm mb-12 print:hidden"
          >
            <Plus size={16} /> Add New Row
          </button>

          {/* Footer Totals & Signature */}
          <div className="flex flex-col md:flex-row justify-between gap-12 pt-8 mt-auto">
            <div className="flex-1">
              <p className="text-2xl font-serif text-slate-800 italic mb-12 print:mb-4">Thank you for your business!</p>

              {/* Signature Section */}
              <div className="w-48 text-center border-t border-dotted border-slate-400 pt-2 mt-20 print:mt-20">
                <div className="h-10 flex items-center justify-center italic text-blue-700 font-serif opacity-80 select-none">
                  {/* Mock signature - can be signed by hand after printing */}
                  <span className="text-xl">Signature</span>
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Authorized Signatory</p>
              </div>
            </div>

            <div className="min-w-[280px]">
              <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs uppercase tracking-widest text-slate-400">Net Total</span>
                  <span className="text-lg font-light">Rs. {calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="h-px bg-slate-700 my-4"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-widest">Grand Total</span>
                  <span className="text-3xl font-black">Rs. {calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rotate-45 transform translate-x-12 -translate-y-12"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Footer - Updated with address and phone */}
        <div className="bg-white px-8 py-6 border-t border-slate-100 text-center space-y-2">
          <div className="h-px bg-slate-200 w-full mb-4 mx-auto max-w-2xl"></div>
          <p className="text-sm text-slate-600 font-medium">No-679, Lake Road, Borelasgamuwa</p>
          <p className="text-sm text-slate-500 font-bold">Tel - 0714418637</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest pt-4">© 2024 SRP CREATION</p>
        </div>
      </div>

      <style>{`
        @page {
          size: A4 portrait;
          margin: 0mm;
        }
        @media print {
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .min-h-screen {
            background: white !important;
            padding: 0 !important;
            display: flex !important;
            justify-content: center !important;
          }
          .print\\:hidden { display: none !important; }
          
          /* Keep all styling exact, but scale beautifully to fit A4 */
          .max-w-4xl {
            width: 100% !important;
            max-width: 200mm !important;
            margin: 5mm auto !important;
            zoom: 0.8;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          /* Compress padding and margins aggressively to fit many items */
          .p-8, .md\\:p-12 { padding: 1.5rem !important; }
          .py-3, .py-4 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
          .mb-10, .mb-12, .mb-8, .mb-6 { margin-bottom: 0.75rem !important; }
          .pt-8 { padding-top: 0.75rem !important; }
          .mt-8 { margin-top: 0.75rem !important; }
          .mt-20 { margin-top: 5rem !important; }
          .gap-12, .gap-8, .gap-6 { gap: 0.5rem !important; }
          
          /* Prevent page breaks inside the main container */
          .max-w-4xl { page-break-inside: avoid; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; page-break-after: auto; }

          input, textarea { 
            border: none !important; 
            padding: 0 !important; 
            background: none !important; 
            resize: none !important;
            box-shadow: none !important;
            outline: none !important;
          }
          input[type="date"]::-webkit-calendar-picker-indicator { display: none; }
        }
      `}</style>
    </div>
  );
};

export default App;
