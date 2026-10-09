import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { DiagnosisReport, SupportedLanguage } from '../types/farm';
import { TRANSLATIONS } from '../data/translations';

interface HistoryPageProps {
  history: DiagnosisReport[];
  language: SupportedLanguage;
  onSelectReport: (report: DiagnosisReport) => void;
  onClearHistory: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  language,
  onSelectReport,
  onClearHistory,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{t.historyPageTitle}</h2>
          <p className="text-sm text-slate-600 mt-1">{t.historyPageSubtitle}</p>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="min-h-[42px] px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1.5 self-start cursor-pointer whitespace-nowrap"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.clearHistoryBtn}</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="py-12 text-center text-sm text-slate-500">
          <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p>{t.emptyHistoryText}</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {history.map((item) => (
            <div
              key={item.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-emerald-900">{item.cropName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">{item.confidence.toFixed(1)}%</span>
                </div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  {item.diseaseName}
                </div>
                <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                  {item.summary}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectReport(item)}
                className="min-h-[40px] px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors self-start sm:self-center cursor-pointer whitespace-nowrap shrink-0"
              >
                {t.viewReportBtn}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
