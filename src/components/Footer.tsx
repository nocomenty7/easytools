import React from 'react';
import { Info, Shield, Mail } from 'lucide-react';

interface FooterProps {
  onOpenModal: (type: 'about' | 'privacy' | 'contact') => void;
  isEmbed?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, isEmbed = false }) => {
  // Auto-resize footer iframe inside subdomains to avoid overflow or vertical scrollbars
  React.useEffect(() => {
    if (isEmbed) {
      const sendHeight = () => {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({
            type: 'easytools-footer-resize',
            height: document.body.scrollHeight || 260
          }, '*');
        }
      };
      
      // Send height on mount, layout load, and resize
      setTimeout(sendHeight, 150);
      window.addEventListener('resize', sendHeight);
      return () => window.removeEventListener('resize', sendHeight);
    }
  }, [isEmbed]);

  return (
    <footer className="w-full bg-white border-t border-slate-200/80 py-12 mt-12 text-slate-500 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          
          {/* Logo - absolute URL for subdomain compatibility */}
          <a href="https://easytools.kr/" target={isEmbed ? "_blank" : "_self"} className="flex items-center gap-2">
            <img 
              src="https://easytools.kr/logo.png" 
              alt="EasyTools" 
              className="h-7 w-auto object-contain hover:opacity-95" 
            />
          </a>

          {/* Trust Pages Links */}
          <nav className="flex items-center gap-6" aria-label="푸터 신뢰정보 메뉴">
            <button
              onClick={() => onOpenModal('about')}
              className="hover:text-indigo-600 transition-colors font-medium flex items-center gap-1.5 hover:cursor-pointer"
            >
              <Info className="h-4 w-4" />
              소개 (About Us)
            </button>
            <button
              onClick={() => onOpenModal('privacy')}
              className="hover:text-indigo-600 transition-colors font-medium flex items-center gap-1.5 hover:cursor-pointer"
            >
              <Shield className="h-4 w-4" />
              개인정보처리방침 (Privacy Policy)
            </button>
            <button
              onClick={() => onOpenModal('contact')}
              className="hover:text-indigo-600 transition-colors font-medium flex items-center gap-1.5 hover:cursor-pointer"
            >
              <Mail className="h-4 w-4" />
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
  );
};
