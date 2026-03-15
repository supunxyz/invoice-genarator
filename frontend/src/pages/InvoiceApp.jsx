import React, { useState } from 'react';
import { Printer } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';
import GeometricTemplate from '../templates/GeometricTemplate';
import CurvedTemplate from '../templates/CurvedTemplate';
import CleanTemplate from '../templates/CleanTemplate';

const templates = [
  { id: 'modern', name: 'Modern Profile', description: 'Clean, bold, and professional. Great for digital agencies.' },
  { id: 'classic', name: 'Classic Corporate', description: 'Traditional and structured. Ideal for consulting and B2B.' },
  { id: 'creative', name: 'Creative Agency', description: 'Stylish sidebed layout for freelancers and creatives.' },
  { id: 'elegant', name: 'Elegant Green', description: 'Sophisticated design with a strong accent sidebar.' },
  { id: 'geometric', name: 'Geometric Blue', description: 'Abstract, modern aesthetic with geometric shapes.' },
  { id: 'curved', name: 'Curved Red', description: 'Dynamic layout with curved headers and footers.' },
  { id: 'clean', name: 'Invoice Generator (Clean)', description: 'Minimalist layout inspired by invoice-generator.com.' },
];

const InvoiceApp = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [data, setData] = useState({
    invoiceNumber: '#2026-001',
    dateIssued: '2026-03-15',
    dueDate: '[Specific date or "Due on Receipt"]',
    clientName: '[Client Name or Organization]',
    clientCompany: '',
    clientAddress: '[Client Street, City, Zip Code]',
    projectDescription: '',
    logo: '',
    companyName: '[Your Business Name]',
    companyAddress: '[Your Street, City, Zip Code]',
    companyPhone: '[Phone Number / Email Address]',
    companyEmail: '',
    companyTagline: '',
    companyWebsite: '',
    currency: 'Rs. ',
    items: [
      { id: 1, date: '', itemName: '[Detailed list of products or services provided]', quantity: 1, price: 0 }
    ],
    notes: '[Warranty info, late fee policy, or thank you message]',
    paymentInstructions: '[Bank details, UPI, or preferred payment method]',
    themeColor: '#2563eb',
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateSubtotal = () => {
    return data.items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    const props = {
      data,
      setData,
      handleLogoUpload,
      calculateSubtotal,
      isEditing: true
    };

    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'elegant':
        return <ElegantTemplate {...props} />;
      case 'geometric':
        return <GeometricTemplate {...props} />;
      case 'curved':
        return <CurvedTemplate {...props} />;
      case 'clean':
        return <CleanTemplate {...props} />;
      case 'modern':
      default:
        return <ModernTemplate {...props} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 overflow-hidden print:h-auto print:block print:bg-white">
      {/* Sidebar Editor */}
      <Sidebar
        data={data}
        setData={setData}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        templates={templates}
      />

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden print:h-auto print:block">

        {/* Top Action Bar */}
        <div className="h-[92px] bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm shrink-0 print:hidden z-10 sticky top-0 relative">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Invoice Preview</h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
              {templates.find(t => t.id === selectedTemplate)?.name} Template
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide"
            >
              <Printer size={18} /> Print / Save PDF
            </button>
          </div>
          {/* Subtle gradient underneath */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        </div>

        {/* Scrollable Preview Container */}
        <div className="flex-1 overflow-y-auto w-full p-8 md:p-12 print:p-0 print:overflow-visible custom-scrollbar relative">

          <div className="relative z-10 print:transform-none">
            {renderTemplate()}
          </div>

          {/* Background decorative elements for the editing environment */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10 print:hidden"></div>
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
            width: 100% !important;
          }
          
          #root {
            width: 100% !important;
            height: auto !important;
          }

          input, textarea { 
            border: none !important; 
            padding: 0 !important; 
            background: none !important; 
            resize: none !important;
            box-shadow: none !important;
            outline: none !important;
            color: inherit !important;
            font: inherit !important;
          }

          input[type="date"]::-webkit-calendar-picker-indicator { display: none !important; }

          /* Scale down slightly to ensure it fits onto a single page */
          .print\\:transform-none > div {
             transform: scale(0.95) !important;
             transform-origin: top center !important;
             margin: 0 auto !important;
             width: 793.7px !important; /* A4 width at 96 DPI */
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default InvoiceApp;
