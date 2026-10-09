import React, { useState } from 'react';
import { Check, Copy, Smartphone, X } from 'lucide-react';
import { SupportedLanguage } from '../types/farm';
import { TRANSLATIONS } from '../data/translations';
import { FLUTTER_PROJECT_FILES } from '../data/flutterCode';

interface FlutterExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

export const FlutterExportModal: React.FC<FlutterExportModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];
  const [selectedPath, setSelectedPath] = useState(FLUTTER_PROJECT_FILES[0].path);
  const [copied, setCopied] = useState(false);

  const activeFile =
    FLUTTER_PROJECT_FILES.find((f) => f.path === selectedPath) ||
    FLUTTER_PROJECT_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full p-6 space-y-4 shadow-xl max-h-[88vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">{t.flutterModalTitle}</h3>
              <p className="text-xs text-slate-500">{t.flutterModalDesc}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {FLUTTER_PROJECT_FILES.map((file) => (
              <button
                key={file.path}
                type="button"
                onClick={() => setSelectedPath(file.path)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-num font-semibold transition-colors cursor-pointer ${
                  file.path === activeFile.path
                    ? 'bg-white text-emerald-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {file.path}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[38px] px-3.5 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.copiedLabel : t.copyCodeBtn}</span>
          </button>
        </div>

        <p className="text-xs text-slate-500">{activeFile.description}</p>

        <pre className="flex-1 overflow-auto p-4 rounded-xl bg-slate-950 text-slate-100 text-xs font-mono-num leading-relaxed">
          <code>{activeFile.content}</code>
        </pre>
      </div>
    </div>
  );
};
