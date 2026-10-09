import React from 'react';
import { Cpu, Layers, Server, X } from 'lucide-react';
import { SupportedLanguage } from '../types/farm';
import { TRANSLATIONS } from '../data/translations';

interface AiEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

export const AiEngineModal: React.FC<AiEngineModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-bold text-slate-900">{t.engineModalTitle}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600">{t.engineModalDesc}</p>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Stage 1: Edge MobileNetV2 TFLite (Offline Ready)</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Quantized Float16 TensorFlow Lite model (`mobilenetv2_disease.tflite`) trained on 38 PlantVillage + regional Indian crop classes (Groundnut Tikka, Cotton CLCuV, Cumin Blight) with sub-45ms local inference.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-sky-700" />
              <span>Stage 2: Server-Side Gemini 3.8 Flash & 3.5 Transcribe</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Full-stack Express backend (`/api/diagnose` and `/api/transcribe`) returning structured JSON pathology reports and chemical/organic tank-mix dosages localized in English, Gujarati (ગુજરાતી), Hindi, Telugu, Kannada, and Tamil.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
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
