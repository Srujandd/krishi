import React, { useState } from 'react';
import { Calculator, Droplets, FlaskConical, Leaf } from 'lucide-react';
import { DiagnosisReport, SupportedLanguage } from '../types/farm';
import { TRANSLATIONS } from '../data/translations';

interface CalculatorPageProps {
  report: DiagnosisReport;
  language: SupportedLanguage;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ report, language }) => {
  const t = TRANSLATIONS[language];
  const [acres, setAcres] = useState<number>(2.5);
  const [mode, setMode] = useState<'organic' | 'chemical'>('organic');
  const [tankSize, setTankSize] = useState<number>(16);

  const dosePerLiter =
    mode === 'organic'
      ? report.dosage.organicPerLiterMl
      : report.dosage.chemicalPerLiterMl;
  const activeProductName =
    mode === 'organic' ? report.dosage.organicName : report.dosage.chemicalName;

  const totalWaterLiters = Math.round(acres * report.dosage.waterLitersPerAcre);
  const totalConcentrateMl = Math.round(totalWaterLiters * dosePerLiter);
  const totalTanks = Math.max(1, Math.ceil(totalWaterLiters / tankSize));
  const dosePerTankMl = Math.round(tankSize * dosePerLiter);

  return (
    <section className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium mb-1">
          <Calculator className="w-4 h-4" />
          <span>{report.cropName}</span>
          <span aria-hidden="true">·</span>
          <span>{report.diseaseName}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{t.calcPageTitle}</h2>
        <p className="text-sm text-slate-600 mt-1">{t.calcPageSubtitle}</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-5">
            {/* Field Area Slider & Number */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-slate-800 mb-2">
                <label htmlFor="acres-input">{t.fieldAreaAcres}</label>
                <span className="font-mono-num text-emerald-800 text-base">
                  {acres.toFixed(1)} Acres
                </span>
              </div>
              <input
                id="acres-input"
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={acres}
                onChange={(e) => setAcres( parseFloat(e.target.value) )}
                className="w-full accent-emerald-700 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 font-mono-num mt-1">
                <span>0.5 ac</span>
                <span>5.0 ac</span>
                <span>15.0 ac</span>
                <span>25.0 ac</span>
              </div>
            </div>

            {/* Treatment Mode Segmented Control */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                {t.treatmentMode}
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setMode('organic')}
                  className={`min-h-[44px] py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                    mode === 'organic'
                      ? 'bg-white text-emerald-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span>{t.modeOrganic}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('chemical')}
                  className={`min-h-[44px] py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap ${
                    mode === 'chemical'
                      ? 'bg-white text-sky-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FlaskConical className="w-4 h-4 text-sky-700" />
                  <span>{t.modeChemical}</span>
                </button>
              </div>
            </div>

            {/* Tank Size Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                {t.tankCapacityLiters}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 16, 20, 200].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setTankSize(size)}
                    className={`min-h-[42px] py-2 px-3 rounded-xl font-mono-num text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                      tankSize === size
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {size} L
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Telemetry Column */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs text-slate-500">Active Formulation</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                {activeProductName}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-600" />
                  <span>{t.totalWaterRequired}</span>
                </div>
                <div className="text-2xl font-bold font-mono-num text-slate-900 mt-1">
                  {totalWaterLiters} L
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">{t.totalConcentrateRequired}</div>
                <div className="text-2xl font-bold font-mono-num text-emerald-800 mt-1">
                  {totalConcentrateMl} ml/g
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">{t.tanksNeeded}</div>
                <div className="text-2xl font-bold font-mono-num text-slate-900 mt-1">
                  {totalTanks} × {tankSize}L
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">{t.perTankMixDose}</div>
                <div className="text-2xl font-bold font-mono-num text-amber-800 mt-1">
                  {dosePerTankMl} ml/g
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200">
              <span>
                {t.applicationIntervalNote}:{' '}
                <strong className="font-mono-num">{report.dosage.applicationIntervalDays}d</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {t.safetyIntervalNote}:{' '}
                <strong className="font-mono-num">{report.dosage.safetyIntervalDays}d</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
