import React, { useState, useMemo } from 'react';
import {
  Baby,
  Coins,
  Home,
  Activity,
  Wrench,
  PawPrint,
  Search,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Info,
  Shield,
  Mail,
  HelpCircle
} from 'lucide-react';
import { TrustModals } from './components/TrustModals';

// Interfaces
interface Tool {
  id: number;
  name: string;
  url: string;
  description: string;
  keywords: string[];
}

interface Category {
  id: string;
  nameKo: string;
  nameEn: string;
  description: string;
  icon: React.ComponentType<any>;
  colorClass: string;
  iconColor: string;
  tools: Tool[];
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalType, setModalType] = useState<'about' | 'privacy' | 'contact' | null>(null);

  // Data Definition
  const categories: Category[] = useMemo(() => [
    {
      id: 'parenting',
      nameKo: '육아·가족',
      nameEn: 'Parenting & Family',
      icon: Baby,
      colorClass: 'from-pink-500/10 to-rose-500/10 border-pink-100 text-pink-700',
      iconColor: 'text-pink-600',
      description: '초보 엄마 아빠의 막막함을 덜어드립니다. 아이의 발달 단계를 파악할 수 있는 급성장기(원더윅스) 주기를 예측하고, 출산 전후 생계 안정을 돕는 복잡한 육아휴직 급여를 세분화하여 미리 계산해 드립니다. 또한 우리 아이 예상 키 예측과 연령별 평균 성장 도표 분석을 지원하여 똑똑하고 안정적인 육아 라이프를 세울 수 있도록 돕습니다.',
      tools: [
        {
          id: 1,
          name: '원더윅스 계산기',
          url: 'http://wonder.easytools.kr/',
          description: '우리 아이 성장 급등기 및 원더윅스 주기를 생년월일 기준 1초 만에 예측합니다.',
          keywords: ['아기 발달', 'wonder weeks', '성장 급등기', '신생아']
        },
        {
          id: 4,
          name: '육아휴직 급여 계산기',
          url: 'https://leave-salary.easytools.kr/',
          description: '통상 임금 정보를 기반으로 받을 수 있는 실질 육아휴직 급여와 사후지급금을 자동 산정합니다.',
          keywords: ['고용보험', '육아휴직 수당', '휴직 급여', '출산 혜택']
        },
        {
          id: 6,
          name: '우리 아이 예상 키 & 평균 성장 도표',
          url: 'https://growth.easytools.kr/',
          description: '부모님의 키를 기반으로 예상 신장을 구하고 소아청소년 표준 성장도표 대비 성장 단계를 측정합니다.',
          keywords: ['예상 키', '키 성장', '발육 표준', '성장 그래프']
        }
      ]
    },
    {
      id: 'tax',
      nameKo: '세금·복지',
      nameEn: 'Tax & Welfare',
      icon: Coins,
      colorClass: 'from-amber-500/10 to-orange-500/10 border-amber-100 text-amber-800',
      iconColor: 'text-amber-600',
      description: '매년 복잡하게 개정되는 세법과 복지 제도, 더 이상 헤매지 마세요. 갈수록 중요해지는 해외주식 투자자를 위한 양도소득세 간편 시뮬레이션부터, 13월의 월급을 스마트하게 챙기는 맞벌이 부부 연말정산 황금비율 확인기까지 맞춤형 솔루션을 제안합니다. 아울러 정부 복지 기준이 되는 2026년 기준 중위소득 1초 확인기와 건강보험 피부양자 자격 요건 판별기를 통해 본인에게 꼭 맞는 복지 혜택과 절세 혜택을 놓치지 않고 챙기실 수 있습니다.',
      tools: [
        {
          id: 2,
          name: '해외주식 양도소득세 계산기',
          url: 'https://stocktax.easytools.kr/',
          description: '해외 주식 매수/매도 실현 손익에 대한 양도세 세율과 연간 기본 공제를 적용한 세액을 계산합니다.',
          keywords: ['미국 주식', '양도세', '주식 세금', '기본 공제']
        },
        {
          id: 10,
          name: '맞벌이 부부 연말정산 황금비율 계산기',
          url: 'https://tax-couple.easytools.kr/',
          description: '부부 각자의 소득 수준에 맞춘 인적 공제 및 소비 몰아주기 황금비율을 제시하여 세액공제를 극대화합니다.',
          keywords: ['연말정산', '소득공제', '맞벌이 세금', '인적공제']
        },
        {
          id: 11,
          name: '2026년 가구 중위소득 1초 확인기',
          url: 'https://median-income.easytools.kr/',
          description: '정부 복지 정책의 선정 기준이 되는 2026년 가구별 기준 중위소득 값을 가구원 수에 맞게 바로 조회합니다.',
          keywords: ['중위소득', '복지 수급', '소득 기준', '정부 지원']
        },
        {
          id: 12,
          name: '2026 건강보험 피부양자 자격 확인기',
          url: 'https://health-dependent.easytools.kr/',
          description: '소득 및 재산 요건을 적용해 직장가입자의 건강보험 피부양자 등재 가능 여부를 즉시 판독합니다.',
          keywords: ['건보 피부양자', '건강보험료', '피부양자 자격', '재산 요건']
        }
      ]
    },
    {
      id: 'wealth',
      nameKo: '부동산·재테크',
      nameEn: 'Real Estate & Wealth',
      icon: Home,
      colorClass: 'from-emerald-500/10 to-teal-500/10 border-emerald-100 text-emerald-800',
      iconColor: 'text-emerald-600',
      description: '경제적 자유와 안정적인 내 집 마련을 향한 첫걸음을 돕습니다. 파이어족(FIRE)을 꿈꾸는 이들을 위한 조기 은퇴 자금 계산기부터 전세대출 이자와 월세의 실질 비용을 비교 분석해 주는 시뮬레이션까지 합리적인 선택을 도와줍니다. 자녀를 위해 마련하는 2천만 원 비과세 증여 및 장기 복리의 마법을 시각화해 드리고, 숨만 쉬고 돈 모으기를 통해 평생 동안 내 집 마련에 걸리는 현실적인 소요 시간과 필요한 저축액을 명쾌하게 진단해 드립니다.',
      tools: [
        {
          id: 5,
          name: '파이어족(FIRE) 조기 은퇴 계산기',
          url: 'https://fire.easytools.kr/',
          description: '연간 지출액과 목표 투자 수익률을 설정하여 조기 은퇴를 위해 필요한 순자산 규모와 은퇴 가능 연도를 확인합니다.',
          keywords: ['파이어족', '조기은퇴', '재정적자유', '은퇴자금']
        },
        {
          id: 7,
          name: '전세대출 vs 월세 절대 비교 계산기',
          url: 'https://rent-compare.easytools.kr/',
          description: '기회비용과 금리를 연동하여 전세 자금 대출 이자와 월세 납입액 중 실질 경제성이 높은 선택을 알려드립니다.',
          keywords: ['월세 비교', '전세대출 이자', '부동산 기회비용', '주거비']
        },
        {
          id: 8,
          name: '자녀 2천만원 증여 & 복리 마법 계산기',
          url: 'https://child-invest.easytools.kr/',
          description: '자녀 비과세 한도액을 증여하고 주기별로 해외 지수 추종 ETF 등에 거치/복리 적립 시 20년 뒤 예상 적립액을 시뮬레이션합니다.',
          keywords: ['자녀 증여', '복리 계산', '미국 ETF', '비과세 증여']
        },
        {
          id: 16,
          name: "내 집 마련 '팩폭' 계산기 (숨만 쉬고 모으기)",
          url: 'https://house.easytools.kr/',
          description: '현재 수입과 지역별 평균 아파트 가격을 대조하여 지출을 최소화하고 내 집을 마련하는 데 걸리는 절대 시간을 계산합니다.',
          keywords: ['주택 구입', '내집 마련', '저축 기간', '현실 타격']
        }
      ]
    },
    {
      id: 'health',
      nameKo: '건강·식단',
      nameEn: 'Health & Diet',
      icon: Activity,
      colorClass: 'from-sky-500/10 to-indigo-500/10 border-sky-100 text-sky-800',
      iconColor: 'text-sky-600',
      description: '건강한 일상의 시작은 일상 속 신뢰도 높은 라이프 데이터 관리로부터 출발합니다. 사계절 제철을 맞이하여 최고의 영양을 선사하는 식단 가이드인 제철 음식 도감과, 건강한 음주 문화를 돕는 혈중알코올농도 기반 숙취 해소 시간 계산기를 제공합니다. 매일 개운한 아침을 선사하는 수면 주기 기반 취침/기상 시간 제안기, 그리고 야식의 즐거움 뒤에 따르는 칼로리를 청산하기 위한 팩폭 운동량 환산기를 통해 균형 잡힌 건강 라이프를 설계해 보세요.',
      tools: [
        {
          id: 3,
          name: '사계절 제철 음식 도감',
          url: 'https://seasonal.easytools.kr/',
          description: '봄, 여름, 가을, 겨울 각 계절별로 영양이 가장 우수한 제철 식재료와 건강 효능을 제공합니다.',
          keywords: ['제철 음식', '건강 식단', '영양제', '자연 식재료']
        },
        {
          id: 13,
          name: '알코올 분해(숙취 해소) 시간 계산기',
          url: 'https://alcohol.easytools.kr/',
          description: '위드마크 공식을 활용하여 체중, 주종, 음주량에 따른 체내 알코올 분해 완료 시간과 기상 가능 시점을 추정합니다.',
          keywords: ['위드마크', '알코올 분해 시간', '숙취해소', '음주 단속']
        },
        {
          id: 14,
          name: '개운한 기상 시간(수면 사이클) 계산기',
          url: 'https://sleep.easytools.kr/',
          description: '인간의 90분 수면 램(REM) 사이클을 계산해 잠들고 일어나기에 가장 상쾌하고 개운한 취침/기상 시간을 안내합니다.',
          keywords: ['수면 주기', '수면 시간', '램 수면', '불면증']
        },
        {
          id: 15,
          name: '팩폭 다이어트! 운동 ↔ 야식 칼로리 환산기',
          url: 'https://calorie.easytools.kr/',
          description: '어젯밤 먹은 치킨, 피자 등 야식 칼로리를 소모하기 위해 달리기, 스쿼트 등 운동을 몇 분이나 해야 하는지 환산합니다.',
          keywords: ['야식 칼로리', '운동량 환산', '다이어트', '소모 칼로리']
        }
      ]
    },
    {
      id: 'utility',
      nameKo: '생활·유틸리티',
      nameEn: 'Life & Utilities',
      icon: Wrench,
      colorClass: 'from-slate-500/10 to-zinc-500/10 border-slate-200 text-slate-800',
      iconColor: 'text-slate-600',
      description: '평소 일상생활 속에서 불쑥 찾아오는 소소하지만 귀찮은 계산을 신속하게 해결해 드립니다. 일일이 공식을 찾기 번거로웠던 다양한 단위 환산기부터 직장인 개개인의 내 실질 가치를 진단하는 연봉-시급 팩폭 계산기를 만나보세요. 아울러 해외여행이나 글로벌 협업 비즈니스 시 반드시 챙겨야 할 글로벌 비행 거리 및 국가 간 시차 계산 도구, 영문 사용자 전용 글로벌 시차 도구 등을 통해 스마트한 시간 관리가 가능해집니다.',
      tools: [
        {
          id: 17,
          name: '세상에서 가장 심플한 단위 환산기',
          url: 'https://unit.easytools.kr/',
          description: '길이, 넓이, 무게, 부피 등의 단위를 직관적이고 군더더기 없는 UI를 통해 실시간으로 변환합니다.',
          keywords: ['단위 환산', '미터 평수', '무게 변환', '길이 변환']
        },
        {
          id: 18,
          name: '내 노동의 가치, 연봉 시급 팩폭 계산기',
          url: 'https://clock.easytools.kr/',
          description: '연봉과 실제 하루 근로시간, 야근시간 등을 반영해 실질적인 실수령액 기준 시급을 낱낱이 파악합니다.',
          keywords: ['시급 환산', '실수령 연봉', '야근 수당', '임금 가치']
        },
        {
          id: 19,
          name: '글로벌 거리 & 시차 계산기',
          url: 'https://flight.easytools.kr/',
          description: '전 세계 도시 간 비행 거리 및 현지 시차, 비행 소요 시간 등을 실시간 위치 기반으로 계산합니다.',
          keywords: ['해외여행', '도시 시차', '비행거리', '시차 계산']
        },
        {
          id: 20,
          name: '글로벌 시차 계산기 (영문)',
          url: 'https://flight-en.easytools.kr/',
          description: 'Global flight time and timezone converter optimized for international travelers and remote workers (English version).',
          keywords: ['timezone converter', 'global time', 'flight duration', 'time diff']
        }
      ]
    },
    {
      id: 'pet',
      nameKo: '반려동물',
      nameEn: 'Pet Care',
      icon: PawPrint,
      colorClass: 'from-purple-500/10 to-violet-500/10 border-purple-100 text-purple-800',
      iconColor: 'text-purple-600',
      description: '가족 구성원인 우리 집 소중한 댕댕이와 냥냥이의 시간을 더 깊게 이해해 봅니다. 반려동물의 실제 나이를 인간의 생애 주기로 정확하게 1대1 변환해 보고, 이를 기반으로 시기별 필요한 예방접종과 건강검진 요소를 함께 알아볼 수 있습니다. 생애 전반에 걸친 올바른 건강 관리 가이드를 참고하여, 사랑하는 반려동물과 더 오랫동안 건강하고 행복하게 동행할 수 있도록 준비해 보세요.',
      tools: [
        {
          id: 9,
          name: '멍냥이 사람 나이 환산 & 건강 계산기',
          url: 'https://pet-age.easytools.kr/',
          description: '반려견 및 반려묘의 품종과 무게, 탄생연도를 통해 인간 나이 환산 및 생애 단계별 유의 질환을 진단합니다.',
          keywords: ['반려동물 나이', '강아지 나이', '고양이 건강', '사람 나이 환산']
        }
      ]
    }
  ], []);

  // Search Logic
  const allTools = useMemo(() => {
    return categories.flatMap(cat =>
      cat.tools.map(tool => ({
        ...tool,
        categoryKo: cat.nameKo,
        categoryEn: cat.nameEn,
        categoryId: cat.id
      }))
    );
  }, [categories]);

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

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white hero-gradient pb-10">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 w-full glass-header transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-200">
                <span className="text-lg font-bold text-white font-heading">ET</span>
              </div>
              <span className="text-xl font-extrabold text-slate-800 tracking-tight font-heading">
                Easy<span className="text-indigo-600">Tools</span>
              </span>
            </div>

            {/* Navigation links for categories */}
            <nav className="hidden md:flex items-center gap-6" aria-label="메인 카테고리 메뉴">
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    <Icon className="h-4 w-4 opacity-70" />
                    {cat.nameKo}
                  </a>
                );
              })}
            </nav>

            {/* Quick trust buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalType('contact')}
                className="rounded-xl border border-slate-200 bg-white/50 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 transition-all hover:cursor-pointer"
              >
                피드백 보내기
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20 w-full" id="main-content">
        
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100/60 px-3.5 py-1.5 text-xs font-medium text-indigo-700 mb-6">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-indigo-600" />
            <span>일상 속 계산을 1초 만에 무료로 해결하세요</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 font-heading leading-tight">
            세상의 모든 생활 밀착형 <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent">
              무료 계산기 플랫폼
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            초보 엄마 아빠의 육아휴직 혜택부터 세금, 부동산 월세 비교, 숙취 해소 시간, 반려동물의 건강 나이까지 매번 복잡하게 직접 계산할 필요 없습니다. EasyTools의 20개 전문 계산기들이 단 1초 만에 깔끔하게 해결해 드립니다.
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
                  <span>클릭 시 해당 서브도메인 도구로 이동</span>
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
                        <div className="mt-0.5 rounded-lg bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600 shrink-0 font-sans">
                          {tool.id}호기
                        </div>
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
          {categories.map(category => {
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
                  {/* Strategic 3-4 sentence narrative description for SEO & AdSense crawlers */}
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
                        {/* Card Header with Tool Number */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50/80 px-2.5 py-1 rounded-lg font-sans">
                            {tool.id}호기
                          </span>
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
                <span className="text-sm font-bold pr-4 leading-snug">Q. 각 계산기 주소(Subdomain)가 독립적으로 구성된 이유는 무엇인가요?</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-open:rotate-180 shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-white rounded-b-2xl">
                EasyTools는 각 유틸리티의 핵심 연산 로직과 속도를 고도로 최적화하기 위해 계산기마다 전용 서버와 독립된 도메인(예: wonder.easytools.kr)을 사용하여 운영하고 있습니다. 이 덕분에 복잡한 코드 꼬임이 없으며, 모바일 데이터 통신망에서도 각 도구가 1초 만에 쾌적하게 로딩되는 탁월한 반응성을 얻었습니다.
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

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-12 mt-12 text-slate-500 text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <span className="text-xs font-bold text-white font-heading">ET</span>
              </div>
              <span className="font-bold text-slate-700 font-heading">EasyTools.kr</span>
            </div>

            {/* Trust Pages Links */}
            <nav className="flex items-center gap-6" aria-label="푸터 신뢰정보 메뉴">
              <button
                onClick={() => setModalType('about')}
                className="hover:text-indigo-600 transition-colors font-medium flex items-center gap-1 hover:cursor-pointer"
              >
                <Info className="h-3.5 w-3.5" />
                소개 (About Us)
              </button>
              <button
                onClick={() => setModalType('privacy')}
                className="hover:text-indigo-600 transition-colors font-medium flex items-center gap-1 hover:cursor-pointer"
              >
                <Shield className="h-3.5 w-3.5" />
                개인정보처리방침 (Privacy Policy)
              </button>
              <button
                onClick={() => setModalType('contact')}
                className="hover:text-indigo-600 transition-colors font-medium flex items-center gap-1 hover:cursor-pointer"
              >
                <Mail className="h-3.5 w-3.5" />
                문의하기 (Contact Us)
              </button>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-slate-400">
            <p>© {new Date().getFullYear()} EasyTools.kr. All rights reserved.</p>
            <p className="text-[11px] text-center sm:text-right max-w-md font-sans">
              EasyTools는 인터넷상의 공인 고시 지침 및 수식을 기반으로 편의를 제공하는 무료 시뮬레이션 서비스 플랫폼입니다.
            </p>
          </div>
        </div>
      </footer>

      {/* Trust Pages Modals overlay */}
      <TrustModals type={modalType} onClose={() => setModalType(null)} />
      
    </div>
  );
}

export default App;
