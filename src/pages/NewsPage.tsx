import React, { useState, useMemo } from 'react';
import { homedNewsArticles, NewsArticle } from '../data/newsData';
import { Language } from '../data/content';
import { ArticleModal } from '../components/ArticleModal';
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface NewsPageProps {
  lang: Language;
  onNavigate?: (path: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ lang, onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 9; // 3 rows of 3 columns
  const isEn = lang === 'en';

  const categories = useMemo(() => {
    const set = new Set<string>();
    homedNewsArticles.forEach((a) => {
      set.add(isEn ? a.categoryEn : a.categoryZh);
    });
    return ['all', ...Array.from(set)];
  }, [isEn]);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return homedNewsArticles;
    return homedNewsArticles.filter((a) => {
      const cat = isEn ? a.categoryEn : a.categoryZh;
      return cat === activeCategory;
    });
  }, [activeCategory, isEn]);

  const totalPages = Math.ceil(filteredArticles.length / pageSize) || 1;

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredArticles.slice(startIndex, startIndex + pageSize);
  }, [filteredArticles, currentPage, pageSize]);

  const handleCategoryChange = (c: string) => {
    setActiveCategory(c);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    document.getElementById('articles-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* 1. Full-width Hero Section (Matches About Us hero) */}
      <section className="relative w-full overflow-hidden select-none bg-[#161614] text-white pt-[170px] pb-[70px] sm:pt-[190px] sm:pb-[85px] md:pt-[210px] md:pb-[95px] px-6 sm:px-8 min-h-[420px] sm:min-h-[460px] md:min-h-[480px] flex flex-col justify-center items-center mb-12 sm:mb-16">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80"
            alt={isEn ? 'Clinical inhalation trials and medical research' : '临床研究与前沿医疗'}
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(22, 22, 20, 0.45) 0%, rgba(22, 22, 20, 0.78) 55%, #161614 100%)',
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-castoro text-white tracking-tight leading-tight">
            {isEn ? 'Blog' : '临床资讯'}
          </h1>

          <div className="flex items-center gap-2 sm:gap-2.5 mt-3 sm:mt-4 text-sm sm:text-base font-medium text-white/90">
            <button
              onClick={() => onNavigate?.('/')}
              className="text-white/80 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              {isEn ? 'Home' : '首页'}
            </button>
            <span className="text-white/60 select-none text-xs sm:text-sm">»</span>
            <span className="text-white font-semibold">
              {isEn ? 'Blog' : '临床资讯'}
            </span>
          </div>
        </div>
      </section>

      {/* Centered Blog Header */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 mb-10">
        <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center gap-4 text-center mb-8">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
              <span>{isEn ? 'Clinical & Industry Blog' : '宏济医疗新闻与临床资讯'}</span>
            </div>
          </div>
          <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-normal text-[#161614] text-center max-w-3xl">
            {isEn
              ? 'Respiratory Technology Insights & Corporate Announcements'
              : '前沿呼吸医疗洞察、展会动态与企业快讯'}
          </h2>
          <p className="font-instrument text-base text-[#3B3B3B] leading-[1.5] max-w-[660px] text-center font-normal">
            {isEn
              ? 'Stay updated on clinical inhalation trials, international medical exhibitions (FIME, Arab Health), regulatory advancements, and respiratory technology milestones from Shenzhen Homed Medical.'
              : '实时追踪宏济医疗在呼吸慢病治疗领域的临床研究、国际医疗大展动态（美国FIME、中东Arab Health）、全球合规准入及核心技术成果。'}
          </p>
        </div>

        {/* Categories Bar Centered */}
        <div className="flex items-center justify-center gap-2 mt-8 overflow-x-auto no-scrollbar py-1">
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => handleCategoryChange(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === c
                  ? 'bg-[#D80048] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 hover:border-neutral-300'
              }`}
            >
              {c === 'all' ? (isEn ? 'All Articles' : '全部资讯') : c}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div id="articles-grid" className="max-w-[1300px] mx-auto px-6 sm:px-8 scroll-mt-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {paginatedArticles.map((article) => {
            const title = isEn ? article.titleEn : article.titleZh;
            const excerpt = isEn ? article.excerptEn : article.excerptZh;
            const category = isEn ? article.categoryEn : article.categoryZh;
            const readTime = isEn ? article.readTimeEn : article.readTimeZh;

            return (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group bg-[#F8F7FA] hover:bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-4.5 flex flex-col justify-between hover:border-neutral-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div>
                  {/* Article Image Container */}
                  <div className="aspect-[16/10] w-full rounded-lg sm:rounded-xl overflow-hidden bg-neutral-100 relative mb-3 border border-neutral-200/50 shadow-2xs">
                    <img
                      src={article.image}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://res.cloudinary.com/hbstqwkk/image/upload/v1791542796/Product_1_fvy69h.jpg';
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-semibold text-[#D80048] shadow-xs border border-white/60">
                      {category}
                    </div>
                  </div>

                  {/* Metadata Row: Read Time & Date */}
                  <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1.5 font-mono">
                    <span className="flex items-center gap-1 text-[#D80048] font-semibold">
                      <Clock className="w-2.5 h-2.5" />
                      {readTime}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <Calendar className="w-2.5 h-2.5" />
                      {article.date}
                    </span>
                  </div>

                  {/* Article Headline */}
                  <h3 className="text-sm sm:text-[15px] font-bold text-[#171A20] group-hover:text-[#D80048] transition-colors line-clamp-2 leading-snug">
                    {title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-neutral-600 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                    {excerpt}
                  </p>
                </div>

                {/* Signature Read Article Button */}
                <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(article);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold text-white bg-[#D80048] hover:bg-black group-hover:bg-black rounded-full transition-all shadow-xs group-hover:shadow-md cursor-pointer active:scale-98"
                  >
                    <span>{isEn ? 'Read Article' : '阅读全文'}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200">
            {/* Articles Count Summary */}
            <div className="text-xs text-neutral-500 font-medium">
              {isEn ? (
                <>
                  Showing{' '}
                  <span className="font-semibold text-neutral-900">
                    {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredArticles.length)}
                  </span>{' '}
                  of <span className="font-semibold text-neutral-900">{filteredArticles.length}</span> articles (Page {currentPage} of {totalPages})
                </>
              ) : (
                <>
                  显示第{' '}
                  <span className="font-semibold text-neutral-900">
                    {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredArticles.length)}
                  </span>{' '}
                  篇，共 <span className="font-semibold text-neutral-900">{filteredArticles.length}</span> 篇资讯（第 {currentPage} / {totalPages} 页）
                </>
              )}
            </div>

            {/* Pagination Navigation */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* First Page */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                title={isEn ? 'First Page' : '首页'}
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              {/* Prev Page */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                title={isEn ? 'Previous Page' : '上一页'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Numbered Page Buttons */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-9 h-9 px-3 flex items-center justify-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#D80048] text-white shadow-xs'
                          : 'border border-neutral-200 bg-white text-neutral-700 hover:text-neutral-950 hover:border-neutral-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Page */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                title={isEn ? 'Next Page' : '下一页'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Last Page */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                title={isEn ? 'Last Page' : '末页'}
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        lang={lang}
      />
    </div>
  );
};
