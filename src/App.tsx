import { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { categoriesData } from './data/categories';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TrustModals } from './components/TrustModals';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalType, setModalType] = useState<'about' | 'privacy' | 'contact' | null>(null);

  // Check URL paths to render headers/footers independently for subdomains iframe embedding
  const path = window.location.pathname;

  // Flattened tools for search
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

  // Main Route: Render Full Hub Page
  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white hero-gradient pb-10">
      
      {/* Header component */}
      <Header onFeedbackClick={() => setModalType('contact')} />

      {/* Main Container */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20 w-full" id="main-content">
        
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100/60 px-3.5 py-1.5 text-xs font-medium text-indigo-700 mb-6">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-indigo-600" />
            <span>일상 속 계산을 1초 만에 무료로 해결하세요</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 font-heading leading-tight">
            세상의 모든 생활 밀착형 <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent">
              무료 계산기 플랫폼
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            초보 엄마 아빠의 육아휴직 혜택부터 세금, 부동산 월세 비교, 숙취 해소 시간, 반려동물의 건강 나이까지 매번 복잡하게 직접 계산할 필요 없습니다. EasyTools의 전문 계산기들이 단 1초 만에 깔끔하게 해결해 드립니다.
          </p>

          {/* Interactive Search Bar */}
          <div className="relative max-w-xl mx-auto z-30">
            <div className="relative flex items-center rounded-2xl bg-white border border-slate-200 shadow-xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="어떤 계산이 필요하신가요? (예: 육아휴직, 해외주식, 월세, 시차)"
                className="w-full rounded-2xl py-4.5 pl-12 pr-4 text-slate-800 text-sm sm:text-base placeholder-slate-400 focus:outline-none"
                aria-label="필요한 계산기 검색"
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
                      새로운 계산기 개발 건의하기
                    </button>
                  </div>
                )}
              </div>
            )}
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
                <div className="max-w-3xl mb-8">
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
                      className="group relative flex flex-col justify-between rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer"
                      onClick={() => window.open(tool.url, '_blank', 'noopener,noreferrer')}
                    >
                      <div>
                        {/* Card Header (Removed 호기 badge, keeping simple header with redirect icon) */}
                        <div className="flex items-center justify-end mb-4">
                          <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                            <ArrowUpRight className="h-4 w-4" />
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
          <div className="flex items-center gap-3 mb-6">
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
              <summary className="flex items-center justify-between p-5 font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer select-none">
                <span className="text-sm font-bold pr-4 leading-snug">Q. EasyTools는 정말 회원가입 없이 완전히 무료인가요?</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-white rounded-b-2xl">
                네, 그렇습니다! EasyTools는 불필요한 개인정보 제공 및 회원가입 절차 없이 모든 도구를 접속 즉시 제한 없이 안전하게 사용하실 수 있습니다. 이용 횟수나 기능상의 숨겨진 결제가 일절 없으므로 안심하고 마음껏 사용하셔도 됩니다.
              </div>
            </details>

            <details name="faq" className="group rounded-2xl border border-slate-100 hover:border-slate-200 transition-all [&_summary::-webkit-details-marker]:hidden bg-slate-50/30">
              <summary className="flex items-center justify-between p-5 font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer select-none">
                <span className="text-sm font-bold pr-4 leading-snug">Q. 계산기에 입력한 저의 세금이나 아기 정보가 서버에 저장되나요?</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-white rounded-b-2xl">
                절대 저장되지 않습니다. EasyTools의 모든 웹 툴은 클라이언트 사이드(이용자 브라우저) 방식으로 실시간 연산되도록 설계되어 있습니다. 입력하신 급여나 자녀 인적사항 등은 브라우저 메모리상에서만 활용되며 당사 데이터베이스나 서버 로그에 저장되지 않으므로 철저하게 프라이버시가 보장됩니다.
              </div>
            </details>

            <details name="faq" className="group rounded-2xl border border-slate-100 hover:border-slate-200 transition-all [&_summary::-webkit-details-marker]:hidden bg-slate-50/30">
              <summary className="flex items-center justify-between p-5 font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer select-none">
                <span className="text-sm font-bold pr-4 leading-snug">Q. 계산 결과의 오차 범위는 어떻게 확인하나요?</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-white rounded-b-2xl">
                본 서비스는 대한민국 법령 정보, 국세청 고시안, 보건복지부 중위소득 고시 데이터 등 신뢰할 수 있는 공식 행정 지침을 기반으로 정밀한 알고리즘을 구축했습니다. 다만 법령 개정 적용 시점의 미세한 지연이나 개인별 특수 조건(가산 혜택 등)에 따라 실무 결과와 일부 차이가 있을 수 있으므로, 최종 납세나 금융 계약 전 시뮬레이션 및 참고 자료로 유용하게 활용하시기 바랍니다.
              </div>
            </details>

            <details name="faq" className="group rounded-2xl border border-slate-100 hover:border-slate-200 transition-all [&_summary::-webkit-details-marker]:hidden bg-slate-50/30">
              <summary className="flex items-center justify-between p-5 font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer select-none">
                <span className="text-sm font-bold pr-4 leading-snug">Q. 계산기 이용 시 버그를 발견했거나 신규 계산기 건의는 어디로 하나요?</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-white rounded-b-2xl">
                하단 푸터 영역의 **[문의하기 (Contact Us)]** 버튼을 통해 건의 양식을 접수하시거나 공식 이메일 주소(`support@easytools.kr`)로 메일을 전송해 주시면 담당 엔지니어가 실시간 피드백을 전달받습니다. 검토를 거쳐 버그는 당일 즉시 픽스되며, 가치 있는 신규 계산기 기획안은 검토를 통해 신속하게 런칭 및 반영될 것입니다.
              </div>
            </details>

          </div>
        </section>

      </main>

      {/* Footer component */}
      <Footer onOpenModal={(type) => setModalType(type)} />

      {/* Trust Pages Modals overlay */}
      <TrustModals type={modalType} onClose={() => setModalType(null)} />
      
    </div>
  );
}

export default App;
