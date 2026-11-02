import React, { useState } from 'react';
import { X, CheckCircle2, Building2, User, Mail, Phone, Globe, PackageCheck, Send } from 'lucide-react';
import { Language, siteContent } from '../data/content';

interface DistributorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialNotes?: string;
  initialProduct?: string;
}

export const DistributorModal: React.FC<DistributorModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialNotes,
  initialProduct,
}) => {
  const t = siteContent[lang].modalDistributor;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    country: '',
    products: initialProduct || 'Portable Oxygen Concentrators',
    volume: '500 – 2,000 units / year',
    message: initialNotes || '',
  });

  // Sync initialNotes/initialProduct if opened with new data
  React.useEffect(() => {
    if (isOpen) {
      if (initialNotes) {
        setFormData((prev) => ({ ...prev, message: initialNotes }));
      }
      if (initialProduct) {
        setFormData((prev) => ({ ...prev, products: initialProduct }));
      }
    }
  }, [isOpen, initialNotes, initialProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-[#FAFAFA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D80048]" />
              <h3 className="text-lg font-bold text-[#171A20] tracking-tight">{t.title}</h3>
            </div>
            <p className="text-xs text-neutral-500 mt-1 max-w-lg leading-relaxed">{t.desc}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-10 px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FFF1F5] text-[#D80048] flex items-center justify-center mx-auto mb-4 border border-[#D80048]/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#171A20]">{t.successTitle}</h4>
              <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto leading-relaxed">
                {t.successMessage}
              </p>
              <div className="mt-8 p-4 bg-neutral-50 rounded-xl text-left border border-neutral-100 text-xs text-neutral-500 max-w-md mx-auto space-y-1">
                <div><span className="font-semibold text-neutral-700">Company:</span> {formData.company || 'N/A'}</div>
                <div><span className="font-semibold text-neutral-700">Recipient:</span> {formData.email || 'N/A'}</div>
                <div><span className="font-semibold text-neutral-700">Market:</span> {formData.country || 'N/A'}</div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="mt-8 px-8 py-2.5 text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors shadow-sm cursor-pointer active:scale-98"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                    {t.company} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Health GmbH"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#D80048] focus:ring-1 focus:ring-[#D80048] transition-all text-[#171A20]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-neutral-400" />
                    {t.contact} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Schmidt"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#D80048] focus:ring-1 focus:ring-[#D80048] transition-all text-[#171A20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#D80048] focus:ring-1 focus:ring-[#D80048] transition-all text-[#171A20]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    placeholder="+49 40 1234 567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#D80048] focus:ring-1 focus:ring-[#D80048] transition-all text-[#171A20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-neutral-400" />
                    {t.country} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Germany / European Union"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#D80048] focus:ring-1 focus:ring-[#D80048] transition-all text-[#171A20]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
                    <PackageCheck className="w-3.5 h-3.5 text-neutral-400" />
                    {t.products}
                  </label>
                  <select
                    value={formData.products}
                    onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#D80048] focus:ring-1 focus:ring-[#D80048] transition-all text-[#171A20]"
                  >
                    <option value="Portable Oxygen Concentrators">Portable Oxygen Concentrators (FDA 510(k))</option>
                    <option value="Stationary Oxygen Concentrators 5L/10L">Stationary Oxygen Concentrators 5L/10L</option>
                    <option value="Vibrating Mesh Nebulizers">Vibrating Mesh Nebulizers (Handheld)</option>
                    <option value="Hospital Central Atomization Systems">Hospital Intelligent Atomization Workstations</option>
                    <option value="Portable Medical Suction Units">Portable Medical Suction Units</option>
                    <option value="OEM / ODM Contract Manufacturing">Custom OEM / ODM Manufacturing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  {t.message}
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your distribution channels, hospital network, or regulatory requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#D80048] focus:ring-1 focus:ring-[#D80048] transition-all text-[#171A20]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Protected by NDA & ISO 13485 privacy guidelines
                </span>
                <button
                  type="submit"
                  className="px-7 py-2.5 text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  {t.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
