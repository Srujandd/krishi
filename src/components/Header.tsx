import React from 'react';
import { Globe, Smartphone } from 'lucide-react';
import { AppTab, SupportedLanguage } from '../types/farm';
import { LANGUAGE_OPTIONS, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onOpenFlutterModal: () => void;
  scanCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  activeTab,
  onTabChange,
  onOpenFlutterModal,
  scanCount,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onTabChange('scanner')}
          className="text-lg sm:text-xl font-bold tracking-tight text-emerald-950 whitespace-nowrap shrink-0 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-700"
        >
          {t.appName}
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => onTabChange('scanner')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              activeTab === 'scanner'
                ? 'text-emerald-900 border-emerald-700 font-semibold'
                : 'border-transparent hover:text-emerald-900'
            }`}
          >
            {t.navScanner}
          </button>
          <button
            type="button"
            onClick={() => onTabChange('calculator')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              activeTab === 'calculator'
                ? 'text-emerald-900 border-emerald-700 font-semibold'
                : 'border-transparent hover:text-emerald-900'
            }`}
          >
            {t.navCalculator}
          </button>
          <button
            type="button"
            onClick={() => onTabChange('guide')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              activeTab === 'guide'
                ? 'text-emerald-900 border-emerald-700 font-semibold'
                : 'border-transparent hover:text-emerald-900'
            }`}
          >
            {t.navCropGuide}
          </button>
          <button
            type="button"
            onClick={() => onTabChange('history')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              activeTab === 'history'
                ? 'text-emerald-900 border-emerald-700 font-semibold'
                : 'border-transparent hover:text-emerald-900'
            }`}
          >
            {t.navHistory} ({scanCount})
          </button>
          <button
            type="button"
            onClick={onOpenFlutterModal}
            className="py-1 text-slate-600 hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Smartphone className="w-4 h-4 text-emerald-700" />
            <span>{t.exportFlutterBtn}</span>
          </button>
        </nav>

        {/* Zone 3: Top-right Language Selector */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative flex items-center">
            <Globe className="w-4 h-4 text-emerald-800 absolute left-3 pointer-events-none" />
            <select
              aria-label="Select application language"
              data-testid="language-selector"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="pl-9 pr-8 py-2 min-h-[42px] text-xs sm:text-sm font-semibold text-emerald-950 bg-emerald-50/90 hover:bg-emerald-100/80 border border-emerald-900/20 rounded-xl transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700 whitespace-nowrap shrink-0"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.label} ({opt.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
