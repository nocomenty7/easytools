import React from 'react';
import { X, Shield, Info, Mail, CheckCircle2 } from 'lucide-react';

interface TrustModalProps {
  type: 'about' | 'privacy' | 'contact' | null;
  onClose: () => void;
}

export const TrustModals: React.FC<TrustModalProps> = ({ type, onClose }) => {
  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [type]);

  if (!type) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm transition-opacity duration-300"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            {type === 'about' && (
              <>
                <Info className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-800 font-heading">EasyTools 소개 (About Us)</h2>
              </>
            )}
            {type === 'privacy' && (
              <>
                <Shield className="h-5 w-5 text-teal-600" />
                <h2 className="text-xl font-bold text-slate-800 font-heading">개인정보처리방침 (Privacy Policy)</h2>
              </>
            )}
            {type === 'contact' && (
              <>
                <Mail className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-800 font-heading font-heading">문의하기 (Contact Us)</h2>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-slate-600 text-sm leading-relaxed scrollbar-thin">
          {type === 'about' && (
            <div className="space-y-4">
              <p className="font-semibold text-slate-800 text-base">
                "일상의 모든 번거로운 계산을 단 1초 만에!"
              </p>
              <p>
                EasyTools(이지툴스)는 초보 부모를 위한 육아 예측 도구부터 직장인을 위한 세금 계산기, FIRE족을 위한 조기 은퇴 계산기, 그리고 건강 관리를 위한 칼로리 환산기에 이르기까지 실생활에 밀접한 유틸리티를 한데 모은 <strong>무료 웹 툴 플랫폼</strong>입니다.
              </p>
              <p>
                우리는 매번 엑셀 파일을 켜거나 복잡한 수식을 검색할 필요 없이, 누구나 직관적으로 값을 입력하고 원하는 결과를 즉시 얻을 수 있는 세상을 꿈꿉니다. 각 서브도메인으로 전문화되어 배포된 20개 이상의 툴들은 모바일 환경에서도 최적의 속도와 사용성을 보장합니다.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> EasyTools의 3대 약속
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-1 text-xs">
                  <li><strong>100% 무료 제공</strong>: 모든 계산 기능은 제한 없이 평생 무료로 제공됩니다.</li>
                  <li><strong>회원가입 없음</strong>: 불필요한 회원가입 절차 없이 즉시 계산기를 사용할 수 있습니다.</li>
                  <li><strong>사용자 데이터 미보관</strong>: 입력된 데이터는 서버에 저장되지 않고 클라이언트 브라우저에서 안전하게 처리됩니다.</li>
                </ul>
              </div>
              <p>
                앞으로도 EasyTools는 100호기, 200호기 이상의 고품질 계산 툴을 지속적으로 업데이트하여 사용자 여러분의 삶의 질을 높여 나가겠습니다.
              </p>
            </div>
          )}

          {type === 'privacy' && (
            <div className="space-y-4 font-sans text-xs">
              <p className="font-semibold text-slate-800 text-sm">
                EasyTools는 이용자의 개인정보를 매우 소중하게 생각하며, 이를 보호하기 위해 최선을 다하고 있습니다.
              </p>
              <div>
                <h3 className="font-bold text-indigo-600 mb-1">1. 수집하는 개인정보 항목</h3>
                <p>EasyTools는 별도의 회원가입 절차가 없으므로 이름, 이메일, 전화번호 등의 개인정보를 원칙적으로 수집하지 않습니다. 다만, 서비스 이용 과정에서 쿠키, IP 주소, 방문 기록 등이 자동으로 생성되어 수집될 수 있습니다.</p>
              </div>
              <div>
                <h3 className="font-bold text-indigo-600 mb-1">2. 개인정보의 수집 및 이용 목적</h3>
                <p>수집된 자동 생성 데이터는 웹사이트 트래픽 분석, 사용자 맞춤 서비스 제공, 그리고 <strong>구글 애드센스(Google AdSense) 등 광고 게재의 목적으로만 활용</strong>됩니다. 이용자가 웹사이트에 입력한 계산 데이터는 서버에 절대 저장되지 않습니다.</p>
              </div>
              <div>
                <h3 className="font-bold text-indigo-600 mb-1">3. 쿠키(Cookie) 및 구글 애드센스 사용 안내</h3>
                <p>본 사이트는 서비스 최적화 및 타겟 맞춤 광고 노출을 위해 쿠키를 사용합니다. 특히 <strong>Google을 포함한 제3자 제공업체는 쿠키를 사용하여 사용자의 이전 방문을 기반으로 광고를 제공</strong>합니다. Google의 광고 쿠키 사용으로 Google 및 파트너사는 사용자가 이 사이트 및 기타 사이트를 방문한 기록을 바탕으로 관련성 높은 광고를 게재할 수 있습니다. 이용자는 Google 광고 설정 페이지나 브라우저 쿠키 설정을 통해 이를 거부할 수 있습니다.</p>
              </div>
              <div>
                <h3 className="font-bold text-indigo-600 mb-1">4. 개인정보의 보유 및 파기</h3>
                <p>이용자 계산 정보 등은 보유 기간이 없이 입력 즉시 브라우저 상에서 소멸됩니다. 문의 메일 등은 답변 목적 달성 후 즉시 안전하게 파기됩니다.</p>
              </div>
              <div>
                <h3 className="font-bold text-indigo-600 mb-1">5. 문의처</h3>
                <p>개인정보 처리와 관련하여 문의 사항이 있으시면 아래 이메일로 연락해 주시기 바랍니다.</p>
                <p className="mt-1 font-semibold">이메일: auroranest.official@gmail.com</p>
              </div>
            </div>
          )}

          {type === 'contact' && (
            <div className="space-y-4">
              <p>
                EasyTools 서비스를 이용하시면서 오류를 발견하셨거나, 새로운 계산기 추가 제안, 혹은 비즈니스 제휴 문의가 있으시다면 언제든 편하게 의견을 보내주세요.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert('소중한 의견이 접수되었습니다. (데모)'); onClose(); }} className="space-y-4 mt-2">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">답변받으실 이메일 주소</label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    placeholder="example@email.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1 font-sans">문의 내용</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="오류 제보, 계산기 건의 등 자유롭게 적어주세요."
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                  ></textarea>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-500 flex items-start gap-2">
                  <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <p>보내주신 내용은 서비스 개선 담당자에게 즉시 전송되며, 보통 영업일 기준 1~2일 내에 작성해 주신 이메일로 회신해 드립니다.</p>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-md hover:shadow-lg shadow-indigo-100 hover:cursor-pointer"
                >
                  보내기
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-6 py-4 flex justify-end bg-slate-50/50">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors hover:cursor-pointer"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
