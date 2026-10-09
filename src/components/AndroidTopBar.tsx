import React from 'react';
import { Cpu, MapPin } from 'lucide-react';
import { GpsCoordinates, SupportedLanguage } from '../types/farm';
import { LANGUAGE_OPTIONS, TRANSLATIONS } from '../data/translations';

interface AndroidTopBarProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  gps: GpsCoordinates;
  onOpenGpsModal: () => void;
  onOpenEngineModal: () => void;
}

export const AndroidTopBar: React.FC<AndroidTopBarProps> = ({
  language,
  onLanguageChange,
  gps,
  onOpenGpsModal,
  onOpenEngineModal,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-emerald-950 text-emerald-50 border-b border-emerald-900/60 px-4 sm:px-6 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 text-emerald-100/90">
          <button
            type="button"
            onClick={onOpenGpsModal}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-1"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-medium">{gps.district}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-num text-emerald-300/90">
              {gps.latitude.toFixed(3)}°N, {gps.longitude.toFixed(3)}°E
            </span>
          </button>
          <span aria-hidden="true" className="hidden sm:inline text-emerald-700">|</span>
          <button
            type="button"
            onClick={onOpenEngineModal}
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-1"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{t.aiEngineStatusBtn}</span>
          </button>
        </div>

        {/* Quick Language Switcher Strip including Gujarati */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5">
          {LANGUAGE_OPTIONS.map((item) => {
            const active = language === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => onLanguageChange(item.code)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-emerald-500 text-emerald-950 font-semibold'
                    : 'text-emerald-200 hover:bg-emerald-900 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
