import React from 'react';
import { BookOpen, Calculator, Clock, ScanLine } from 'lucide-react';
import { AppTab, SupportedLanguage } from '../types/farm';
import { TRANSLATIONS } from '../data/translations';

interface AndroidNavBarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  language: SupportedLanguage;
  scanCount: number;
}

export const AndroidNavBar: React.FC<AndroidNavBarProps> = ({
  activeTab,
  onTabChange,
  language,
  scanCount,
}) => {
  const t = TRANSLATIONS[language];

  const items: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'scanner', label: t.navScanner, icon: <ScanLine className="w-5 h-5" /> },
    { id: 'calculator', label: t.navCalculator, icon: <Calculator className="w-5 h-5" /> },
    { id: 'guide', label: t.navCropGuide, icon: <BookOpen className="w-5 h-5" /> },
    {
      id: 'history',
      label: `${t.navHistory} (${scanCount})`,
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200"
    >
      <div className="grid grid-cols-4 items-center h-16">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center px-1 transition-colors cursor-pointer ${
                isActive ? 'text-emerald-800 font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.icon}
              <span className="text-[11px] tracking-tight mt-1 truncate max-w-[85px] whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
