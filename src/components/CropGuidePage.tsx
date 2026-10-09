import React, { useState } from 'react';
import { BookOpen, Droplets, Sprout } from 'lucide-react';
import { SupportedLanguage } from '../types/farm';
import { TRANSLATIONS } from '../data/translations';
import { CROP_GUIDES } from '../data/cropGuide';

interface CropGuidePageProps {
  language: SupportedLanguage;
}

export const CropGuidePage: React.FC<CropGuidePageProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedCropId, setSelectedCropId] = useState<string>(CROP_GUIDES[0].id);

  const activeGuide =
    CROP_GUIDES.find((g) => g.id === selectedCropId) || CROP_GUIDES[0];

  return (
    <section className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t.guidePageTitle}</h2>
            <p className="text-sm text-slate-600 mt-1">{t.guidePageSubtitle}</p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start">
            {CROP_GUIDES.map((guide) => (
              <button
                key={guide.id}
                type="button"
                onClick={() => setSelectedCropId(guide.id)}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  guide.id === activeGuide.id
                    ? 'bg-white text-emerald-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {guide.cropName[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Crop Parameters Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-5 border-b border-slate-100">
          <div>
            <div className="text-xs text-slate-500">{t.seasonLabel}</div>
            <div className="text-sm font-semibold text-slate-900 mt-1">
              {activeGuide.season[language]}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">{t.soilTypeLabel}</div>
            <div className="text-sm font-semibold text-slate-900 mt-1">
              {activeGuide.soilType[language]} (pH {activeGuide.optimalPh})
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-sky-600" />
              <span>{t.waterNeedLabel}</span>
            </div>
            <div className="text-sm font-semibold font-mono-num text-slate-900 mt-1">
              {activeGuide.waterRequirementMm}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">{t.harvestDaysLabel}</div>
            <div className="text-sm font-semibold font-mono-num text-emerald-800 mt-1">
              {activeGuide.harvestWindowDays}
            </div>
          </div>
        </div>

        {/* Threats & Nutrition Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5">
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>{t.keyThreatsLabel}</span>
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {activeGuide.keyDiseases[language].map((threat, index) => (
                <li key={index} className="flex items-center gap-2.5">
                  <span className="font-mono-num text-xs text-slate-400">
                    0{index + 1}.
                  </span>
                  <span>{threat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-7 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-700" />
              <span>{t.fertilizerScheduleLabel}</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              {activeGuide.nutritionSchedule[language].map((step, index) => (
                <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="font-mono-num text-xs font-semibold text-emerald-700 mt-1">
                    0{index + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
