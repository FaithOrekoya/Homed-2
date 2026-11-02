import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Clock, Send, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';
import { Language } from '../data/content';

interface ContactPageProps {
  lang: Language;
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang, onNavigate }) => {
  const isEn = lang === 'en';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    inquiryType: 'wholesale',
    productInterest: 'oxygen',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* 1. Full-width Hero Section (Matches About Us hero) */}
      <section className="relative w-full overflow-hidden select-none bg-[#161614] text-white pt-[170px] pb-[70px] sm:pt-[190px] sm:pb-[85px] md:pt-[210px] md:pb-[95px] px-6 sm:px-8 min-h-[420px] sm:min-h-[460px] md:min-h-[480px] flex flex-col justify-center items-center mb-12 sm:mb-16">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920&q=80"
            alt={isEn ? 'Medical consultation and communication' : '全球医疗咨询与服务'}
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
            {isEn ? 'Contact Us' : '联系我们'}
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
              {isEn ? 'Contact Us' : '联系我们'}
            </span>
          </div>
        </div>
      </section>

      {/* Centered Heading & Subheading */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-8 mb-12">
        <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center gap-4 text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F5] text-[#D80048] border border-[#D80048]/20 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#D80048] animate-pulse" />
              <span>{isEn ? 'Direct Contact & Wholesale Inquiry' : '联系宏济医疗 · 商务与大宗采购'}</span>
            </div>
          </div>
          <h2 className="font-castoro text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-normal text-[#161614] text-center max-w-3xl">
            {isEn
              ? "Let's Connect for Global Medical Device Partnerships"
              : '探讨全球医疗器械分销、采购及联合开发'}
          </h2>
          <p className="font-instrument text-base text-[#3B3B3B] leading-[1.5] max-w-[660px] text-center font-normal">
            {isEn
              ? 'Our international sales team, regulatory specialists, and engineering consultants respond to inquiries within 24 business hours.'
              : '宏济医疗海外商务部、法规注册部及技术工程师团队将在24小时内为您提供详尽回复与产品资料。'}
          </p>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Channels & Facilities */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-2xs space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF1F5] text-[#D80048] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    {isEn ? 'Corporate Headquarters' : '宏济医疗总部与研发'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Shenzhen Homed Medical Device Co., Ltd.
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D80048] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900 block">
                      {isEn ? 'Shenzhen R&D Hub' : '深圳研发运营总部'}
                    </span>
                    <span>
                      {isEn
                        ? 'Nanshan District, Shenzhen, Guangdong Province, China'
                        : '广东省深圳市南山区高新科技产业园'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D80048] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-neutral-900 block">
                      {isEn ? 'Dongguan Manufacturing Campus' : '东莞智能制造基地'}
                    </span>
                    <span>
                      {isEn
                        ? 'Dongguan City, Guangdong Province, China (Class 100,000 Cleanroom)'
                        : '广东省东莞市精密制造高新技术产业区（十万级洁净厂区）'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D80048] shrink-0" />
                  <a
                    href="mailto:sales@homedgroup.com"
                    className="hover:text-[#D80048] font-mono text-neutral-800"
                  >
                    sales@homedgroup.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D80048] shrink-0" />
                  <span className="font-mono text-neutral-800">+86 755 8600 0000</span>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-[#D80048] shrink-0" />
                  <span className="font-mono text-neutral-800">www.homedgroup.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#D80048] shrink-0" />
                  <span>
                    {isEn ? 'Mon – Fri: 08:30 – 18:00 (UTC+8)' : '周一至周五: 08:30 – 18:00 (UTC+8)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Regulatory Support Card */}
            <div className="bg-[#FFF5F8] rounded-2xl p-6 border border-[#D80048]/20">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D80048] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{isEn ? 'Wholesale & Tender Support' : '全球标书与法规注册协助'}</span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {isEn
                  ? 'We furnish full technical construction files, FDA 510(k) summary documentation, CE-MDR Declaration of Conformity, and ISO 13485 audit dossiers for national medical tenders and regional importer registrations.'
                  : '宏济医疗国际法规团队可为您所在国家或地区的卫生部进口注册、政府公立医院招投标提供全套CE-MDR符合性声明、FDA 510(k)技术档案及ISO 13485质量管理体系认证证书。'}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-castoro text-neutral-900">
                    {isEn ? 'Inquiry Submitted Successfully' : '咨询已成功送达'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    {isEn
                      ? `Thank you, ${form.name}. Our International Commercial Operations department has received your request regarding ${form.company || 'your organization'} and will contact you via ${form.email} within 24 hours.`
                      : `感谢您的垂询，${form.name}。国际商务团队已收到您关于 ${form.company || '贵机构'} 的采购意向，代表将通过 ${form.email} 在24小时内向您发送详细商务合作资料包。`}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        country: '',
                        inquiryType: 'wholesale',
                        productInterest: 'oxygen',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 text-xs font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors"
                  >
                    {isEn ? 'Send Another Inquiry' : '提交其他咨询'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {isEn ? 'Your Full Name *' : '您的姓名 *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={isEn ? 'e.g. Dr. Arthur Vance' : '如：李先生 / 采购代表'}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#D80048]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {isEn ? 'Corporate Email Address *' : '商务电子邮箱 *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={isEn ? 'arthur@hospital.org' : 'name@company.com'}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#D80048]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {isEn ? 'Company / Organization' : '企业 / 医院全称'}
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder={isEn ? 'e.g. Apex Health Distribution' : '如：某某医疗器械商贸有限公司'}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#D80048]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {isEn ? 'Country / Market *' : '所在国家 / 拟投放地区 *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        placeholder={isEn ? 'e.g. Germany, UAE, Brazil' : '如：德国、阿联酋、新加坡等'}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#D80048]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {isEn ? 'Inquiry Nature' : '合作类型'}
                      </label>
                      <select
                        value={form.inquiryType}
                        onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#D80048]"
                      >
                        <option value="wholesale">
                          {isEn ? 'Authorized Regional Distribution' : '区域授权代理分销'}
                        </option>
                        <option value="oem">
                          {isEn ? 'OEM / ODM Contract Manufacturing' : 'OEM / ODM 贴牌定制生产'}
                        </option>
                        <option value="hospital">
                          {isEn ? 'Hospital Ward & Clinical Tender' : '公立医院与院端批量直采'}
                        </option>
                        <option value="support">
                          {isEn ? 'Technical Support & Spare Parts' : '售后配件与技术支持'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {isEn ? 'Primary Product Interest' : '主要意向品类'}
                      </label>
                      <select
                        value={form.productInterest}
                        onChange={(e) => setForm({ ...form, productInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#D80048]"
                      >
                        <option value="oxygen">
                          {isEn ? 'Oxygen Therapy (POC-V5, OC-500 5L/10L)' : '氧疗设备 (便携POC-V5, 台式5L/10L)'}
                        </option>
                        <option value="nebulizer">
                          {isEn ? 'Mesh Nebulizers (Mini-Air Pro)' : '医用手持微网雾化器 (Mini-Air Pro)'}
                        </option>
                        <option value="suction">
                          {isEn ? 'Nasal Irrigation & Airway Care (NI-80)' : '鼻腔清洗与气道护理 (NI-80)'}
                        </option>
                        <option value="hospital">
                          {isEn ? 'Cardiopulmonary IVD & Diagnostics' : '心肺急诊快速检测 (NT-proBNP)'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {isEn ? 'Message & Project Details *' : '详细需求与采购规划 *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={
                        isEn
                          ? 'Please describe your distribution channel, estimated annual volume, registration requirements, or specific requests...'
                          : '请简要说明您的企业背景、拟代理区域、预计采购规模或特定法规认证要求...'
                      }
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#D80048]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 text-xs sm:text-sm font-semibold text-white bg-[#D80048] hover:bg-black rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? (isEn ? 'Sending...' : '正在发送...') : (isEn ? 'Submit Inquiry' : '递交合作咨询')}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
