import { Baby, Coins, Home, Activity, Wrench, PawPrint } from 'lucide-react';
import React from 'react';

export interface Tool {
  id: number;
  name: string;
  url: string;
  description: string;
  keywords: string[];
}

export interface Category {
  id: string;
  nameKo: string;
  nameEn: string;
  description: string;
  icon: React.ComponentType<any>;
  colorClass: string;
  iconColor: string;
  tools: Tool[];
}

export const categoriesData: Category[] = [
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
];
