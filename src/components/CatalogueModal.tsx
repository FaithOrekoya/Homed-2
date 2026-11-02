import React, { useState } from 'react';
import { X, CheckCircle2, Download, FileText } from 'lucide-react';
import { Language, siteContent } from '../data/content';

interface CatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const CatalogueModal: React.FC<CatalogueModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = siteContent[lang].modalCatalogue;
  const [downloaded, setDownloaded] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#D80048]" />
            <h3 className="text-base font-bold text-[#171A20]">{t.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {downloaded ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#FFF1F5] text-[#D80048] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#171A20]">{t.successTitle}</h4>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                {t.successMessage}
              </p>
              <div className="mt-6 p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-neutral-600 flex items-center justify-between">
                <span className="font-mono text-neutral-700">HOMED_Product_Catalogue_2026.pdf</span>
                <span className="text-[11px] text-neutral-400">14.2 MB</span>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full py-2.5 text-xs font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors cursor-pointer active:scale-98"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-neutral-600 leading-relaxed">{t.desc}</p>
              
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t.name}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Ross"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#D80048] text-[#171A20]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {t.email}
                </label>
                <input
                  type="email"
                  required
                  placeholder="david@med-distributor.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-[#D80048] text-[#171A20]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.downloadBtn}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
