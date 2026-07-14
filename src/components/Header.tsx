import React from 'react';
import { ChevronDown } from 'lucide-react';
import { categoriesData } from '../data/categories';

interface HeaderProps {
  onFeedbackClick?: () => void;
  isEmbed?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onFeedbackClick, isEmbed = false }) => {
  
  const notifyParentResize = (isExpanded: boolean) => {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'easytools-header-resize',
        height: isExpanded ? 360 : 64
      }, '*');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-header transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo - absolute URL for subdomain compatibility */}
          <a href="https://easytools.kr/" target={isEmbed ? "_blank" : "_self"} className="flex items-center gap-2">
            <img 
              src="https://easytools.kr/logo.png" 
              alt="EasyTools" 
              className="h-9 w-auto object-contain hover:opacity-90 transition-opacity" 
            />
          </a>

          {/* Navigation with hover dropdowns */}
          <nav className="hidden md:flex items-center gap-6" aria-label="메인 카테고리 메뉴">
            {categoriesData.map(cat => {
              return (
                <div 
                  key={cat.id} 
                  className="relative group"
                  onMouseEnter={() => notifyParentResize(true)}
                  onMouseLeave={() => notifyParentResize(false)}
                >
                  <button className="flex items-center gap-1.5 py-4 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors hover:cursor-pointer">
                    {cat.nameKo}
                    <ChevronDown className="h-3.5 w-3.5 opacity-55 group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block w-60 rounded-xl bg-white border border-slate-100 shadow-xl py-1.5 text-left mt-0.5 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                    <div className="px-3 py-1.5 bg-slate-50/50 border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {cat.nameKo} 도구 목록
                    </div>
                    {cat.tools.map(tool => (
                      <a
                        key={tool.id}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        {tool.name}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Feedback/CTA button */}
          <div className="flex items-center gap-2">
            {onFeedbackClick && (
              <button
                onClick={onFeedbackClick}
                className="rounded-xl border border-slate-200 bg-white/50 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 transition-all hover:cursor-pointer"
              >
                피드백 보내기
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
