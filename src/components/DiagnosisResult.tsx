import React, { useState } from 'react';
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  FlaskConical,
  Leaf,
  ShieldCheck,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { DiagnosisReport, SupportedLanguage } from '../types/farm';
import { LANGUAGE_OPTIONS, TRANSLATIONS } from '../data/translations';

interface DiagnosisResultProps {
  report: DiagnosisReport;
  language: SupportedLanguage;
  onOpenDosageModal: () => void;
  isAnalyzing: boolean;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  report,
  language,
  onOpenDosageModal,
  isAnalyzing,
}) => {
  const t = TRANSLATIONS[language];
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utteranceText = `${report.cropName}. ${report.diseaseName}. ${report.summary}. ${report.organicRemedies.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(utteranceText);
    const langMeta = LANGUAGE_OPTIONS.find((l) => l.code === language);
    utterance.lang = langMeta?.ttsLang || 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-emerald-700 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium text-slate-700">{t.analyzingLeaf}</p>
      </div>
    );
  }

  const severityLabel =
    report.severity === 'high'
      ? t.severityHigh
      : report.severity === 'moderate'
      ? t.severityModerate
      : report.severity === 'low'
      ? t.severityLow
      : t.severityHealthy;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      {/* Header Metadata & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-emerald-900">{report.cropName}</span>
            <span aria-hidden="true">·</span>
            <span className="italic">{report.pathogenName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-num">
              {t.confidenceLabel}: {report.confidence.toFixed(1)}%
            </span>
            <span aria-hidden="true">·</span>
            <span
              className={`font-semibold ${
                report.severity === 'high'
                  ? 'text-rose-700'
                  : report.severity === 'moderate'
                  ? 'text-amber-700'
                  : 'text-emerald-700'
              }`}
            >
              {t.severityLabel}: {severityLabel}
            </span>
          </div>

          <h2 className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">
            {report.diseaseName}
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed max-w-3xl">
            {report.summary}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleToggleSpeech}
            className="min-h-[44px] px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-700" />
                <span>{t.stopAudioBtn}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-800" />
                <span>{t.listenAudioBtn}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenDosageModal}
            className="min-h-[44px] px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Calculator className="w-4 h-4" />
            <span>{t.openDosageModalBtn}</span>
          </button>
        </div>
      </div>

      {/* 2x2 Clinical Protocol Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Observed Symptoms */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <h3>{t.symptomsHeader}</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {report.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="font-mono-num text-xs font-semibold text-slate-400 mt-1">
                  0{idx + 1}.
                </span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bio-Organic Control Protocol */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-950">
            <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />
            <h3>{t.organicTreatmentHeader}</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {report.organicRemedies.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chemical Fungicide / Pesticide Regimen */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <FlaskConical className="w-4 h-4 text-sky-700 shrink-0" />
            <h3>{t.chemicalTreatmentHeader}</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {report.chemicalRemedies.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="font-mono-num text-xs font-semibold text-sky-700 mt-1">
                  0{idx + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Agronomic Preventive Measures */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
            <h3>{t.preventionHeader}</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {report.preventiveSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="font-mono-num text-xs font-semibold text-teal-700 mt-1">
                  0{idx + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
