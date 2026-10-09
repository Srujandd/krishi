import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DiagnosisReport, SupportedLanguage } from '../types/farm';
import { TRANSLATIONS } from '../data/translations';

interface DosageModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: DiagnosisReport;
  language: SupportedLanguage;
}

export const DosageModal: React.FC<DosageModalProps> = ({
  isOpen,
  onClose,
  report,
  language,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];
  const [acres, setAcres] = useState(2);
  const [tankLiters, setTankLiters] = useState(16);

  const totalWater = acres * report.dosage.waterLitersPerAcre;
  const organicTotalMl = Math.round(totalWater * report.dosage.organicPerLiterMl);
  const chemicalTotalMl = Math.round(totalWater * report.dosage.chemicalPerLiterMl);
  const tanksCount = Math.ceil(totalWater / tankLiters);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{t.calcPageTitle}</h3>
            <p className="text-xs text-slate-500">{report.diseaseName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeBtn}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.fieldAreaAcres}
            </label>
            <input
              type="number"
              min="0.5"
              max="50"
              step="0.5"
              value={acres}
              onChange={(e) => setAcres(Math.max(0.5, Number(e.target.value) || 1))}
              className="w-full px-3 py-2 text-sm font-mono-num border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.tankCapacityLiters}
            </label>
            <select
              value={tankLiters}
              onChange={(e) => setTankLiters(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-mono-num border border-slate-200 rounded-xl bg-white"
            >
              <option value={15}>15 L</option>
              <option value={16}>16 L</option>
              <option value={20}>20 L</option>
              <option value={200}>200 L Drum</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">{t.totalWaterRequired}:</span>
            <strong className="font-mono-num text-slate-900">{totalWater} L ({tanksCount} Tanks)</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">{t.modeOrganic} ({report.dosage.organicName}):</span>
            <strong className="font-mono-num text-emerald-800">{organicTotalMl} ml/g</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">{t.modeChemical} ({report.dosage.chemicalName}):</span>
            <strong className="font-mono-num text-sky-800">{chemicalTotalMl} ml/g</strong>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
