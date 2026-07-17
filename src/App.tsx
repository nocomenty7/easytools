import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Flame,
  Zap,
  Lock,
  FileText,
  BookOpen,
  Calculator,
  Compass,
  DollarSign,
  Heart,
  Check
} from 'lucide-react';
import { categoriesData } from './data/categories';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TrustModals } from './components/TrustModals';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalType, setModalType] = useState<'about' | 'privacy' | 'contact' | null>(null);

  // Quick Mini-Calculator (Pyeong <-> m2) States
  const [pyeong, setPyeong] = useState('10');
  const [m2, setM2] = useState('33.06');

  // GDPR Cookie Consent State
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  // Check URL paths to render headers/footers independently for subdomains iframe embedding
  const path = window.location.pathname;

  // Check Cookie Consent, AdSense, & set transparent html/body background inside iframe routes
  useEffect(() => {
    const consent = localStorage.getItem('easytools-cookie-consent');
    if (!consent) {
      setShowCookieConsent(true);
    }
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense initialization error:', e);
    }

    // Force transparent background for embed endpoints inside the iframe
    if (path === '/header' || path === '/footer') {
      document.body.style.background = 'transparent';
      document.body.style.backgroundColor = 'transparent';
      const htmlEl = document.documentElement;
      if (htmlEl) {
        htmlEl.style.background = 'transparent';
        htmlEl.style.backgroundColor = 'transparent';
      }
    }
  }, [path]);

  const handleCookieAccept = () => {
    localStorage.setItem('easytools-cookie-consent', 'accepted');
    setShowCookieConsent(false);
  };

  // Convert Pyeong to m2
  const handlePyeongChange = (val: string) => {
    setPyeong(val);
    if (!val || isNaN(Number(val))) {
      setM2('');
      return;
    }
    setM2((parseFloat(val) * 3.305785).toFixed(2));
  };

  // Convert m2 to Pyeong
  const handleM2Change = (val: string) => {
    setM2(val);
    if (!val || isNaN(Number(val))) {
      setPyeong('');
      return;
    }
    setPyeong((parseFloat(val) / 3.305785).toFixed(2));
  };

  // Flattened tools for search and marquee
  const allTools = useMemo(() => {
    return categoriesData.flatMap(cat =>
      cat.tools.map(tool => ({
        ...tool,
        categoryKo: cat.nameKo,
        categoryEn: cat.nameEn,
        categoryId: cat.id
      }))
    );
  }, []);

  // Filtered tools in search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allTools.filter(
      tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.categoryKo.toLowerCase().includes(query) ||
        tool.keywords.some(kw => kw.toLowerCase().includes(query))
    );
  }, [searchQuery, allTools]);

  // Double list of tools for infinite marquee animation
  const marqueeTools = useMemo(() => {
    return [...allTools, ...allTools];
  }, [allTools]);

  // Route 1: Render Header Only for Embedding
  if (path === '/header') {
    return (
      <div className="bg-transparent">
        <Header isEmbed={true} />
      </div>
    );
  }

  // Route 2: Render Footer Only for Embedding
  if (path === '/footer') {
    return (
      <div className="bg-transparent">
        <Footer onOpenModal={(type) => setModalType(type)} isEmbed={true} />
        <TrustModals type={modalType} onClose={() => setModalType(null)} />
      </div>
    );
  }

  // Popular quick keywords for tags interaction
  const popularKeywords = ['원더윅스', '양도소득세', '전세대출', '수면 사이클', '반려동물 나이'];

  // Main Route: Render Full Hub Page
  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white hero-gradient bg-grid pb-10">
      
      {/* Header component */}
      <Header onFeedbackClick={() => setModalType('contact')} />

      {/* Main Container */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 pb-20 w-full" id="main-content">
        
        {/* Hero Section (Sleek Two-Column Layout) */}
        <section className="grid gap-12 lg:grid-cols-12 items-center mb-16 mt-4 sm:mt-8">
          
          {/* Left Column: Heading & Search */}
          <div className="lg:col-span-7 space-y-6 text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100/60 px-3.5 py-1.5 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
              <span>회원가입 없이 1초 완성 무료 계산기 모음</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight font-heading">
              세상의 모든 생활 밀착형 <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent">
                무료 계산기 플랫폼
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-sans">
              초보 부모를 위한 아기 발달 예측부터 주식 세금, 전세 기회비용 비교, 수면 사이클, 강아지 건강 나이 진단까지 번거로운 공식 검색 없이 단 1초 만에 깔끔하게 연산해 드립니다.
            </p>

            {/* Search Input Box */}
            <div className="relative max-w-xl z-30">
              <div className="relative flex items-center rounded-2xl bg-white border border-slate-200 shadow-xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <Search className="absolute left-4 h-5 w-5 text-slate-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="필요한 계산기를 입력해 보세요..."
                  className="w-full rounded-2xl py-4.5 pl-12 pr-4 text-slate-800 text-sm sm:text-base placeholder-slate-400 focus:outline-none"
                  aria-label="계산기 검색"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden max-h-96 overflow-y-auto text-left animate-in fade-in duration-100">
                  <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 flex justify-between">
                    <span>검색 결과 ({searchResults.length}건)</span>
                    <span>클릭 시 해당 도구로 이동</span>
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-slate-50">
                      {searchResults.map(tool => (
                        <a
                          key={tool.id}
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 p-4 hover:bg-slate-50/80 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                                {tool.name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                ({tool.categoryKo})
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate mt-1">
                              {tool.description}
                            </p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 transition-colors shrink-0 align-middle" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-sm">
                      "{searchQuery}"에 해당하는 계산기가 발견되지 않았습니다.
                      <button
                        onClick={() => {
                          setModalType('contact');
                          setSearchQuery('');
                        }}
                        className="block mx-auto mt-2 text-indigo-600 font-semibold hover:underline text-xs hover:cursor-pointer"
                      >
                        신규 계산기 제작 건의하기
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Action Tag Links */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold text-slate-400 mr-1">추천 키워드</span>
              {popularKeywords.map((kw, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(kw)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all shadow-sm hover:cursor-pointer"
                >
                  #{kw}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Premium 3D Mockup Graphic with dynamic floating */}
          <div className="lg:col-span-5 relative flex justify-center items-center lg:justify-end animate-fade-in-up duration-1000">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-teal-500 opacity-20 blur-2xl z-0"></div>
            <div className="relative z-10 p-2 bg-white/40 border border-white/60 rounded-3xl shadow-2xl animate-float">
              <img
                src="https://easytools.kr/hero-illustration.jpg"
                alt="EasyTools 3D Graphic"
                className="rounded-2xl max-w-full h-auto w-[460px] lg:w-[480px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* 🚀 Infinite Marquee Scroll Section (가로 애니메이션) */}
        <section className="relative w-full overflow-hidden py-4 bg-white/40 border-y border-slate-200/50 mb-20 z-10">
          {/* Edge Fade Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 marquee-fade-left z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 marquee-fade-right z-20 pointer-events-none"></div>

          {/* Scroll Track */}
          <div className="animate-marquee flex gap-6 py-1 select-none">
            {marqueeTools.map((tool, idx) => (
              <a
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-400 hover:shadow-indigo-50 transition-all duration-300 group font-sans text-xs font-bold text-slate-700 hover:text-indigo-600 hover:cursor-pointer"
              >
                <Calculator className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span>{tool.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-md">
                  {tool.categoryKo}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* 🔥 실시간 인기 계산기 & 맛보기 미니 계산기 (Grid Layout) */}
        <section className="grid gap-8 lg:grid-cols-12 mb-24 animate-fade-in-up items-start">
          
          {/* Left: Trending Section (8 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-extrabold text-slate-800 font-heading">실시간 인기 급상승 계산기</h2>
              </div>
              <span className="text-xs font-bold text-slate-400">실시간 유입 기반</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              
              {/* Trending Card 1 */}
              <a
                href="https://growth.easytools.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-pink-200 hover:shadow-lg transition-all duration-300 group h-32 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-50 text-pink-600 group-hover:scale-115 transition-transform">
                    <Flame className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-pink-50 text-pink-700 rounded-md">HOT 🔥</span>
                </div>
                <div className="mt-2">
                  <h3 className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition-colors">우리 아이 예상 키</h3>
                  <p className="text-[10px] text-slate-400 mt-1">성장 도표 및 키 예측</p>
                </div>
              </a>

              {/* Trending Card 2 */}
              <a
                href="https://stocktax.easytools.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-amber-200 hover:shadow-lg transition-all duration-300 group h-32 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 group-hover:scale-115 transition-transform">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md">인기 📈</span>
                </div>
                <div className="mt-2">
                  <h3 className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition-colors">해외주식 양도소득세</h3>
                  <p className="text-[10px] text-slate-400 mt-1">기본공제 자동 차감 계산</p>
                </div>
              </a>

              {/* Trending Card 3 */}
              <a
                href="https://pet-age.easytools.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-purple-200 hover:shadow-lg transition-all duration-300 group h-32 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 group-hover:scale-115 transition-transform">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md">NEW ✨</span>
                </div>
                <div className="mt-2">
                  <h3 className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition-colors">댕냥이 사람 나이</h3>
                  <p className="text-[10px] text-slate-400 mt-1">품종별 맞춤 수명 진단</p>
                </div>
              </a>

            </div>
          </div>

          {/* Right: Functional Mini Calculator Widget (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-extrabold text-slate-800 font-heading">1초 맛보기 간이 면적 계산기</h2>
            </div>

            <div className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4 text-left">
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans mb-1">
                평수(Pyeong)와 제곱미터(㎡) 간의 신속한 양방향 변환을 지원하는 내장형 툴입니다.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Pyeong Input */}
                <div className="space-y-1">
                  <label htmlFor="mini-pyeong" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">평수 (Pyeong)</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      id="mini-pyeong"
                      value={pyeong}
                      onChange={(e) => handlePyeongChange(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
                    />
                    <span className="absolute right-3 text-xs font-bold text-slate-400">평</span>
                  </div>
                </div>

                {/* Square Meters Input */}
                <div className="space-y-1">
                  <label htmlFor="mini-m2" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">제곱미터 (㎡)</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      id="mini-m2"
                      value={m2}
                      onChange={(e) => handleM2Change(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
                    />
                    <span className="absolute right-3 text-xs font-bold text-slate-400">㎡</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>표준 변환공식 적용: 1평 = 3.305785㎡</span>
              </div>
            </div>
          </div>
        </section>

        {/* 📚 Multi-Column Pillar Articles (애드센스 통과용 백과사전식 가이드 섹션 - 텍스트 부스터) */}
        <section className="bg-indigo-50/30 border border-indigo-100/50 rounded-3xl p-6 sm:p-10 mb-24 text-left animate-fade-in-up">
          <div className="flex items-center gap-2.5 mb-8">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 font-heading">EasyTools 실생활 가이드 & 재무 분석 정보</h2>
              <p className="text-xs text-slate-400 font-sans mt-0.5">일상의 중요한 결정들에 실질적인 도움이 되는 전문적인 가이드와 상식입니다</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Guide 1 */}
            <article className="space-y-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5 font-heading">
                <DollarSign className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                자녀를 위한 장기 복리 투자와 증여 세법 요약
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                어린 자녀에게 비과세 한도 내에서 현금을 증여하고 지수 추종 ETF 등에 투자하여 복리 마법을 일으키는 것은 훌륭한 자산 형성 전략입니다. 대한민국 세법상 미성년 자녀에게는 10년 주기마다 최대 2천만 원까지 증여세 없이 합법적 증여가 가능합니다. 이를 미리 계산하여 20년간 연평균 복리 8%로 운용할 시 예상 금액은 단순 합산의 3배 이상으로 늘어날 수 있습니다. 자녀 증여 계산기를 활용해 복리 결과를 눈으로 시뮬레이션해 보세요.
              </p>
            </article>

            {/* Guide 2 */}
            <article className="space-y-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5 font-heading">
                <Compass className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                전세대출 이자와 월세 기회비용 절대 비교
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                많은 청년들이 전세대출을 받아 전세로 거주하는 것과 다달이 월세를 내고 거주하는 것 중 어느 편이 이득인지 고민합니다. 전세를 선택할 경우 대출 이자뿐만 아니라 보증금 마련으로 기회비용을 잃게 되며, 월세는 현금 지출이 즉각 발생합니다. 이 두 조건의 실질 비용을 계산하기 위해서는 현재의 적격 금리, 투자 수익률 기준, 그리고 연간 재정 지출 현황을 정확히 대조해야 합니다. 전세대출 vs 월세 비교 계산기를 이용해 어떤 선택이 더 유리한지 1초 만에 확인하실 수 있습니다.
              </p>
            </article>

            {/* Guide 3 */}
            <article className="space-y-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5 font-heading">
                <Heart className="h-4.5 w-4.5 text-pink-500 shrink-0" />
                맞벌이 부부의 전략적 연말정산 및 절세 공식
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                맞벌이 부부의 연말정산은 각자의 급여 수준과 신용카드 소비 패턴에 맞춰 인적 공제 대상을 황금 비율로 배분하는 것이 중요합니다. 일반적으로 소득이 더 높은 배우자에게 소득 공제(부양 가족 등)를 몰아주는 것이 종합소득세 누진세율 구간을 낮춰 절세 효과를 늘릴 수 있습니다. 다만, 총급여액의 25% 이상을 초과해 지출해야 하는 신용카드 소득 공제 요건 등의 경우 급여가 낮은 배우자에게 몰아주는 것이 유리할 때도 있습니다. 이러한 복잡한 비례 구간을 시뮬레이션을 통해 환급 세액을 극대화해 보시기 바랍니다.
              </p>
            </article>
          </div>
        </section>

        {/* 📊 EasyTools 실시간 현황 (Interactive Stats Dashboard) */}
        <section className="grid gap-6 md:grid-cols-3 mb-24">
          <div className="p-6 bg-white/70 border border-slate-100 rounded-3xl shadow-sm text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800 mb-2 font-heading">로그인/회원가입 없음</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              개인정보 유출 걱정 없이 언제든 즉시 서비스를 이용하실 수 있습니다. 입력하신 소중한 데이터는 서버에 보관되지 않고 즉시 소멸합니다.
            </p>
          </div>

          <div className="p-6 bg-white/70 border border-slate-100 rounded-3xl shadow-sm text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800 mb-2 font-heading">초스피드 반응형 웹</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              모든 도구는 1초 미만으로 즉각 작동합니다. 3G 환경이나 노후한 모바일 디바이스에서도 쾌적하고 부드러운 반응성을 보장합니다.
            </p>
          </div>

          <div className="p-6 bg-white/70 border border-slate-100 rounded-3xl shadow-sm text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800 mb-2 font-heading">신뢰도 높은 최신 수식</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              대한민국 국세청 고시, 보건복지부 행정 정보 등 공신력 있는 공식 지침과 현행 수식을 분석하여 정기적인 패치를 실행합니다.
            </p>
          </div>
        </section>

        {/* 6 Category & Tools Grid */}
        <section className="space-y-20 mb-28">
          {categoriesData.map(category => {
            const Icon = category.icon;
            return (
              <section
                key={category.id}
                id={category.id}
                className="scroll-mt-20 border-t border-slate-100 pt-12 first:border-0 first:pt-0"
              >
                {/* Category Header */}
                <div className="max-w-3xl mb-8 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight font-heading">
                        {category.nameKo}
                      </h2>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold font-sans">
                        {category.nameEn}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-1 font-sans">
                    {category.description}
                  </p>
                </div>

                {/* Sub-tools Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map(tool => (
                    <article
                      key={tool.id}
                      className="group relative flex flex-col justify-between rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/40 hover:cursor-pointer text-left"
                      onClick={() => window.open(tool.url, '_blank', 'noopener,noreferrer')}
                    >
                      <div>
                        {/* Card Header */}
                        <div className="flex items-center justify-end mb-4">
                          <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                            <ArrowUpRight className="h-4.5 w-4.5" />
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors font-heading">
                          {tool.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-slate-500 leading-relaxed font-sans mb-4">
                          {tool.description}
                        </p>
                      </div>

                      {/* Keywords Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-slate-50">
                        {tool.keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="inline-block text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md font-medium"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 p-6 sm:p-10 max-w-4xl mx-auto scroll-mt-20" id="faq">
          <div className="flex items-center gap-3 mb-6 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-heading">
                자주 묻는 질문 (FAQ)
              </h2>
              <p className="text-xs text-slate-400 font-sans mt-0.5">EasyTools에 대해 무엇이든 물어보세요</p>
            </div>
          </div>

          <div className="space-y-4">
            
            <details name="faq" className="group rounded-2xl border border-slate-100 hover:border-slate-200 transition-all [&_summary::-webkit-details-marker]:hidden bg-slate-50/30">
              <summary className="flex items-center justify-between p-5 font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer select-none text-left">
                <span className="text-sm font-bold pr-4 leading-snug">Q. EasyTools는 정말 회원가입 없이 완전히 무료인가요?</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-white rounded-b-2xl text-left">
                네, 그렇습니다! EasyTools는 불필요한 개인정보 제공 및 회원가입 절차 없이 모든 도구를 접속 즉시 제한 없이 안전하게 사용하실 수 있습니다. 이용 횟수나 기능상의 숨겨진 결제가 일절 없으므로 안심하고 마음껏 사용하셔도 됩니다.
              </div>
            </details>

            <details name="faq" className="group rounded-2xl border border-slate-100 hover:border-slate-200 transition-all [&_summary::-webkit-details-marker]:hidden bg-slate-50/30">
              <summary className="flex items-center justify-between p-5 font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer select-none text-left">
                <span className="text-sm font-bold pr-4 leading-snug">Q. 계산기에 입력한 저의 세금이나 아기 정보가 서버에 저장되나요?</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-white rounded-b-2xl text-left">
                절대 저장되지 않습니다. EasyTools의 모든 웹 툴은 클라이언트 사이드(이용자 브라우저) 방식으로 실시간 연산되도록 설계되어 있습니다. 입력하신 급여나 자녀 인적사항 등은 브라우저 메모리상에서만 활용되며 당사 데이터베이스나 서버 로그에 저장되지 않으므로 철저하게 프라이버시가 보장됩니다.
              </div>
            </details>

            <details name="faq" className="group rounded-2xl border border-slate-100 hover:border-slate-200 transition-all [&_summary::-webkit-details-marker]:hidden bg-slate-50/30">
              <summary className="flex items-center justify-between p-5 font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer select-none text-left">
                <span className="text-sm font-bold pr-4 leading-snug">Q. 계산 결과의 오차 범위는 어떻게 확인하나요?</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-white rounded-b-2xl text-left">
                본 서비스는 대한민국 법령 정보, 국세청 고시안, 보건복지부 중위소득 고시 데이터 등 신뢰할 수 있는 공식 행정 지침을 기반으로 정밀한 알고리즘을 구축했습니다. 다만 법령 개정 적용 시점의 미세한 지연이나 개인별 특수 조건(가산 혜택 등)에 따라 실무 결과와 일부 차이가 있을 수 있으므로, 최종 납세나 금융 계약 전 시뮬레이션 및 참고 자료로 유용하게 활용하시기 바랍니다.
              </div>
            </details>

            <details name="faq" className="group rounded-2xl border border-slate-100 hover:border-slate-200 transition-all [&_summary::-webkit-details-marker]:hidden bg-slate-50/30">
              <summary className="flex items-center justify-between p-5 font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer select-none text-left">
                <span className="text-sm font-bold pr-4 leading-snug">Q. 계산기 이용 시 버그를 발견했거나 신규 계산기 건의는 어디로 하나요?</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-white rounded-b-2xl text-left">
                하단 푸터 영역의 **[문의하기 (Contact Us)]** 버튼을 통해 건의 양식을 접수하시거나 공식 이메일 주소(`nocomenty7@gmail.com`)로 메일을 전송해 주시면 담당 엔지니어가 실시간 피드백을 전달받습니다. 검토를 거쳐 버그는 당일 즉시 픽스되며, 가치 있는 신규 계산기 기획안은 검토를 통해 신속하게 런칭 및 반영될 것입니다.
              </div>
            </details>

          </div>
        </section>

        {/* Google AdSense Bottom Ad Slot */}
        <div className="adsense-slot adsense-bottom max-w-4xl mx-auto my-8 min-h-[100px] w-full flex justify-center items-center bg-slate-50/50 border border-slate-100/80 rounded-2xl p-4 overflow-hidden">
          <ins className="adsbygoogle"
               style={{ display: 'block', width: '100%' }}
               data-ad-client="ca-pub-3522634980237009"
               data-ad-slot="7310226958"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

      </main>

      {/* Footer component */}
      <Footer onOpenModal={(type) => setModalType(type)} />

      {/* Trust Pages Modals overlay */}
      <TrustModals type={modalType} onClose={() => setModalType(null)} />

      {/* GDPR Cookie Consent Toast for Google AdSense compliance */}
      {showCookieConsent && (
        <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm rounded-2xl bg-white/95 border border-slate-200/80 shadow-2xl p-5 backdrop-blur-md animate-in slide-in-from-bottom duration-300 text-left">
          <div className="flex items-start gap-3">
            <span className="text-xl">🍪</span>
            <div className="space-y-1.5 flex-1 min-w-0">
              <h4 className="text-xs font-black text-slate-800 font-heading">쿠키 사용 및 개인정보 동의</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                EasyTools는 사용자 경험 분석 및 맞춤형 광고(Google AdSense) 노출을 위해 브라우저 쿠키를 사용합니다. 동의하실 경우 [동의하고 시작하기]를 클릭해주세요.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2.5">
            <button
              onClick={() => setModalType('privacy')}
              className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors hover:cursor-pointer"
            >
              자세히 보기
            </button>
            <button
              onClick={handleCookieAccept}
              className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-[10px] font-black text-white hover:bg-indigo-700 transition-colors hover:cursor-pointer"
            >
              동의하고 시작하기
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
