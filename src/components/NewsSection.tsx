import React, { useState } from 'react';
import { ArrowUpRight, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Language } from '../data/content';
import { NewsArticle, homedNewsArticles } from '../data/newsData';
import { ArticleModal } from './ArticleModal';

interface NewsSectionProps {
  lang: Language;
  onNavigate?: (path: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ lang, onNavigate }) => {
  const isEn = lang === 'en';
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Show 3 featured articles on the homepage preview
  const displayedArticles = homedNewsArticles.slice(0, 3);

  return (
    <section id="news" className="py-[3em] bg-[#FAFAFA] border-b border-neutral-200/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Header Wrapper */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-4 text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
            <span>{isEn ? 'News & Updates' : '宏济资讯'}</span>
          </div>

          <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] font-normal text-[#171A20] tracking-tight leading-tight text-center">
            {isEn ? (
              <>
                <span className="block">Insights, Clinical Updates</span>
                <span className="block mt-1 sm:mt-1.5">& Healthcare News</span>
              </>
            ) : (
              <>
                <span className="block">前沿动态 · 临床突破</span>
                <span className="block mt-1 sm:mt-1.5">与全球行业资讯</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-2xl text-center">
            {isEn
              ? 'Discover the latest medical device advancements, global exhibition highlights, clinical publications, and respiratory health innovations from HOMED.'
              : '实时获取宏济医疗在呼吸健康前沿技术研发、国际医疗盛会参展、临床诊疗方案探索及智能制造基地的最新权威动态。'}
          </p>

          <div className="pt-1">
            <a
              href="https://www.homedgroup.com/news.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#171A20] hover:bg-[#D80048] text-white transition-colors shadow-xs group cursor-pointer"
            >
              <span>{isEn ? 'Official News on homedgroup.com' : '前往官网浏览全部动态'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Freshbox Blog Cards Grid: 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.map((article) => {
            const title = isEn ? article.titleEn : article.titleZh;
            const excerpt = isEn ? article.excerptEn : article.excerptZh;
            const category = isEn ? article.categoryEn : article.categoryZh;
            const readTime = isEn ? article.readTimeEn : article.readTimeZh;

            return (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group bg-[#F8F7FA] hover:bg-white rounded-[22px] border border-neutral-200/80 p-5 sm:p-5.5 flex flex-col justify-between hover:border-neutral-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div>
                  {/* Article Image Container */}
                  <div className="aspect-[16/10.5] w-full rounded-xl overflow-hidden bg-neutral-100 relative mb-4 border border-neutral-200/50 shadow-2xs">
                    <img
                      src={article.image}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10.5px] font-semibold text-[#D80048] shadow-xs border border-white/60">
                      {category}
                    </div>
                  </div>

                  {/* Metadata Row: Read Time & Date (Freshbox style) */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-2 font-mono">
                    <span className="flex items-center gap-1.5 text-[#D80048] font-semibold">
                      <Clock className="w-3 h-3" />
                      {readTime}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>

                  {/* Article Headline */}
                  <h3 className="text-base sm:text-[17px] font-bold text-[#171A20] group-hover:text-[#D80048] transition-colors line-clamp-2 leading-snug">
                    {title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed font-normal">
                    {excerpt}
                  </p>
                </div>

                {/* Freshbox Signature Button */}
                <div className="mt-5 pt-4 border-t border-neutral-200/60 flex items-center justify-end">
                  {/* Freshbox Signature Button with diagonal asymmetric rounded corners */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(article);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#D80048] hover:bg-black group-hover:bg-black rounded-full transition-all shadow-xs group-hover:shadow-md cursor-pointer active:scale-98"
                  >
                    <span>{isEn ? 'Read Article' : '阅读全文'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Button leading to full Blog Page */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center">
          <button
            onClick={() => (onNavigate ? onNavigate('/news') : (window.location.href = '/news'))}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#D80048] hover:bg-black text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-[#D80048]/20 hover:shadow-black/20 cursor-pointer group active:scale-98"
          >
            <span>{isEn ? 'View All Articles' : '查看全部资讯'}</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

      </div>

      {/* Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        lang={lang}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};
