import React, { useState } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { categoriesData } from '../data/categories';

interface HeaderProps {
  onFeedbackClick?: () => void;
  isEmbed?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onFeedbackClick, isEmbed = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notifyParentResize = (isExpanded: boolean) => {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'easytools-header-resize',
        height: isExpanded ? 360 : 64
      }, '*');
    }
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: newState ? 'easytools-header-open' : 'easytools-header-close'
      }, '*');
    }
  };

  return (
    <>
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

            {/* Navigation with hover dropdowns (Desktop) */}
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

            {/* Mobile hamburger menu toggle + Feedback button */}
            <div className="flex items-center gap-2">
              {onFeedbackClick && (
                <button
                  onClick={onFeedbackClick}
                  className="hidden sm:inline-block rounded-xl border border-slate-200 bg-white/50 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 transition-all hover:cursor-pointer"
                >
                  피드백 보내기
                </button>
              )}

              {/* Hamburger Button (Mobile Only) */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden rounded-xl p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all focus:outline-none hover:cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300">
          {/* Drawer Panel */}
          <div className="relative w-full max-w-[280px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <a href="https://easytools.kr/" target={isEmbed ? "_blank" : "_self"}>
                <img src="https://easytools.kr/logo.png" alt="EasyTools" className="h-7 w-auto object-contain" />
              </a>
              <button
                onClick={toggleMobileMenu}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Categories List */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
              {categoriesData.map(cat => {
                return (
                  <div key={cat.id} className="space-y-2">
                    <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
                      {cat.nameKo}
                    </h3>
                    <div className="grid gap-1 pl-1">
                      {cat.tools.map(tool => (
                        <a
                          key={tool.id}
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 border-b border-slate-50 last:border-0"
                          onClick={() => {
                            if (isEmbed) toggleMobileMenu();
                          }}
                        >
                          <span>{tool.name}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-40 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer buttons inside mobile drawer */}
            {onFeedbackClick && (
              <div className="border-t border-slate-100 p-5 bg-slate-50/50">
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    onFeedbackClick();
                  }}
                  className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white text-center hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-md shadow-indigo-100 hover:cursor-pointer"
                >
                  피드백 보내기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
