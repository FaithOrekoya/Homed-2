import React from 'react';
import { X, Calendar, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../data/content';
import { NewsArticle } from '../data/newsData';

interface ArticleModalProps {
  article: NewsArticle | null;
  lang: Language;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  lang,
  onClose,
}) => {
  if (!article) return null;

  const isEn = lang === 'en';
  const title = isEn ? article.titleEn : article.titleZh;
  const category = isEn ? article.categoryEn : article.categoryZh;
  const readTime = isEn ? article.readTimeEn : article.readTimeZh;
  const content = isEn ? article.contentEn : article.contentZh;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-[#FAFAFA]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D80048] bg-[#FFF1F5] px-2.5 py-1 rounded">
              {category}
            </span>
            <span className="text-xs text-neutral-500 font-mono flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              {article.date}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Article Image */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs relative">
            <img
              src={article.image}
              alt={title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#D80048]" />
                {readTime}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {isEn ? 'Official HOMED News' : '宏济医疗官方发布'}
              </span>
            </div>

            <h2
              id="article-modal-title"
              className="font-castoro text-2xl sm:text-3xl font-normal text-[#171A20] tracking-tight leading-tight"
            >
              {title}
            </h2>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal pt-2 border-t border-neutral-100">
            {content.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line">{p}</p>
            ))}
          </div>

          {/* Article Gallery Images if available */}
          {article.galleryImages && article.galleryImages.length > 0 && (
            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                {isEn ? 'Event & Clinical Photography' : '现场图文集锦'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {article.galleryImages.map((imgUrl, gIdx) => (
                  <div
                    key={gIdx}
                    className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-2xs group hover:shadow-md transition-shadow"
                  >
                    <img
                      src={imgUrl}
                      alt={`${title} - ${gIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source Link & Actions */}
          <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-500">
              {isEn ? 'Source: Shenzhen Homed Medical Device Co., Ltd.' : '来源：深圳市宏济医疗器械有限公司官网'}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <span>{isEn ? 'View on homedgroup.com' : '前往官网查看原文'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 text-xs font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors cursor-pointer active:scale-98"
              >
                {isEn ? 'Close' : '关闭'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
