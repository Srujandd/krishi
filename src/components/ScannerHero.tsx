import React, { useRef, useState } from 'react';
import { Camera, CloudRain, Droplets, Mic, Sparkles, Upload, Wind } from 'lucide-react';
import { CropSample, SupportedLanguage, WeatherAdvisory } from '../types/farm';
import { TRANSLATIONS } from '../data/translations';
import { CROP_SAMPLES } from '../data/cropSamples';
import { WEATHER_PRESETS } from '../services/weatherService';

interface ScannerHeroProps {
  language: SupportedLanguage;
  selectedSampleId: string;
  onSelectSample: (sampleId: string) => void;
  onUploadImage: (base64Image: string, mimeType: string, customNotes: string) => void;
  onOpenVoiceModal: () => void;
  isAnalyzing: boolean;
  weather: WeatherAdvisory;
  onSelectWeather: (weather: WeatherAdvisory) => void;
}

export const LeafSpecimenIllustration: React.FC<{ svgType: CropSample['svgType'] }> = ({
  svgType,
}) => {
  switch (svgType) {
    case 'groundnut_tikka':
      return (
        <svg viewBox="0 0 120 90" className="w-full h-28 rounded-xl bg-emerald-950/5 p-2">
          <path
            d="M20,45 C25,18 58,12 95,28 C88,65 55,78 20,45 Z"
            fill="#2f6f3e"
            stroke="#1b4325"
            strokeWidth="2"
          />
          <path d="M22,45 L88,30" stroke="#84cc16" strokeWidth="1.8" />
          <circle cx="45" cy="36" r="6" fill="#451a03" stroke="#facc15" strokeWidth="2.5" />
          <circle cx="66" cy="44" r="5" fill="#451a03" stroke="#facc15" strokeWidth="2.2" />
          <circle cx="55" cy="54" r="4" fill="#451a03" stroke="#facc15" strokeWidth="2" />
          <circle cx="76" cy="32" r="3.5" fill="#451a03" stroke="#facc15" strokeWidth="1.8" />
        </svg>
      );
    case 'cotton_leaf_curl':
      return (
        <svg viewBox="0 0 120 90" className="w-full h-28 rounded-xl bg-emerald-950/5 p-2">
          <path
            d="M60,75 C30,70 18,45 28,24 C42,30 50,15 60,12 C72,15 78,30 92,24 C102,45 90,70 60,75 Z"
            fill="#3b7a47"
            stroke="#14532d"
            strokeWidth="2"
          />
          <path
            d="M60,72 L60,18 M60,48 L34,32 M60,48 L86,32"
            stroke="#bef264"
            strokeWidth="2.5"
            strokeDasharray="3 2"
          />
          <path d="M32,26 Q45,38 56,22" fill="none" stroke="#fde047" strokeWidth="2" />
          <path d="M88,26 Q75,38 64,22" fill="none" stroke="#fde047" strokeWidth="2" />
        </svg>
      );
    case 'tomato_blight':
      return (
        <svg viewBox="0 0 120 90" className="w-full h-28 rounded-xl bg-emerald-950/5 p-2">
          <path
            d="M16,48 C28,16 68,14 102,38 C76,72 38,76 16,48 Z"
            fill="#366938"
            stroke="#1e3a1f"
            strokeWidth="2"
          />
          <circle cx="56" cy="44" r="11" fill="#78350f" stroke="#facc15" strokeWidth="2" />
          <circle cx="56" cy="44" r="7" fill="none" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="56" cy="44" r="3.5" fill="#291205" />
          <circle cx="78" cy="38" r="6" fill="#78350f" stroke="#facc15" strokeWidth="1.5" />
        </svg>
      );
    case 'rice_blast':
      return (
        <svg viewBox="0 0 120 90" className="w-full h-28 rounded-xl bg-emerald-950/5 p-2">
          <path
            d="M10,68 Q55,32 110,18 Q72,56 10,68 Z"
            fill="#3f8246"
            stroke="#164e27"
            strokeWidth="2"
          />
          <polygon
            points="48,46 58,41 68,45 58,50"
            fill="#e2e8f0"
            stroke="#7c2d12"
            strokeWidth="2"
          />
          <polygon
            points="72,34 80,30 88,33 80,38"
            fill="#e2e8f0"
            stroke="#7c2d12"
            strokeWidth="2"
          />
        </svg>
      );
    case 'wheat_rust':
      return (
        <svg viewBox="0 0 120 90" className="w-full h-28 rounded-xl bg-emerald-950/5 p-2">
          <path
            d="M12,64 Q60,26 108,22 Q68,58 12,64 Z"
            fill="#477d43"
            stroke="#1b4321"
            strokeWidth="2"
          />
          <line
            x1="32"
            y1="52"
            x2="86"
            y2="30"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray="4 3"
          />
          <line
            x1="40"
            y1="55"
            x2="92"
            y2="35"
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeDasharray="3 3"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 90" className="w-full h-28 rounded-xl bg-emerald-950/5 p-2">
          <path
            d="M18,52 C32,16 74,14 102,34 C82,70 42,74 18,52 Z"
            fill="#16a34a"
            stroke="#14532d"
            strokeWidth="2"
          />
          <path d="M22,50 L96,35" stroke="#bbf7d0" strokeWidth="2" />
          <path d="M48,44 L38,30 M66,41 L56,27 M70,42 L80,54" stroke="#86efac" strokeWidth="1.5" />
        </svg>
      );
  }
};

export const ScannerHero: React.FC<ScannerHeroProps> = ({
  language,
  selectedSampleId,
  onSelectSample,
  onUploadImage,
  onOpenVoiceModal,
  isAnalyzing,
  weather,
  onSelectWeather,
}) => {
  const t = TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [customNotes, setCustomNotes] = useState('');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [previewMimeType, setPreviewMimeType] = useState<string>('image/jpeg');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      setPreviewDataUrl(result);
      setPreviewMimeType(file.type || 'image/jpeg');
      const base64Clean = result.includes(',') ? result.split(',')[1] : result;
      onUploadImage(base64Clean, file.type || 'image/jpeg', customNotes);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="space-y-6">
      {/* Main Scanner & Weather Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 7 cols: Field Leaf Scanner Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-emerald-800 mb-2">
              <span>{t.appSubtitle}</span>
              <span aria-hidden="true"> · </span>
              <span>MobileNetV2 + Gemini 3.8 Flash</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {t.heroTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Optional symptom note input + AI trigger */}
          <div className="mt-5 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder={t.customNotePlaceholder}
                className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              {previewDataUrl && (
                <button
                  type="button"
                  disabled={isAnalyzing}
                  onClick={() => {
                    const base64Clean = previewDataUrl.includes(',')
                      ? previewDataUrl.split(',')[1]
                      : previewDataUrl;
                    onUploadImage(base64Clean, previewMimeType, customNotes);
                  }}
                  className="px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.runAiDiagnosisBtn}</span>
                </button>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                disabled={isAnalyzing}
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[46px] px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Upload className="w-4 h-4 shrink-0" />
                <span>{t.uploadLeafPhoto}</span>
              </button>

              <button
                type="button"
                disabled={isAnalyzing}
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[46px] px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Camera className="w-4 h-4 shrink-0" />
                <span>{t.openCamera}</span>
              </button>

              <button
                type="button"
                onClick={onOpenVoiceModal}
                className="min-h-[46px] px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Mic className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{t.voiceSymptomsBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Micro-Climate Spray Suitability Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-slate-500">
                {t.weatherSprayHeader}
              </span>
              <select
                aria-label="Select regional weather station"
                value={weather.id}
                onChange={(e) => {
                  const found = WEATHER_PRESETS.find((w) => w.id === e.target.value);
                  if (found) onSelectWeather(found);
                }}
                className="text-xs font-medium bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 cursor-pointer focus:outline-none"
              >
                {WEATHER_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.regionName[language]}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="text-3xl font-bold font-mono-num text-slate-900">
                  {weather.temperatureC}°C
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {weather.regionName[language]}
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-semibold ${
                    weather.spraySuitability === 'optimal'
                      ? 'text-emerald-700'
                      : weather.spraySuitability === 'caution'
                      ? 'text-amber-700'
                      : 'text-rose-700'
                  }`}
                >
                  {weather.spraySuitability === 'optimal'
                    ? t.sprayOptimal
                    : weather.spraySuitability === 'caution'
                    ? t.sprayCaution
                    : t.sprayAvoid}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 py-4 text-xs">
              <div>
                <div className="text-slate-500 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-600" />
                  <span>{t.humidityLabel}</span>
                </div>
                <div className="font-mono-num font-semibold text-slate-900 text-sm mt-1">
                  {weather.humidityPercent}%
                </div>
              </div>
              <div>
                <div className="text-slate-500 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-teal-600" />
                  <span>{t.windLabel}</span>
                </div>
                <div className="font-mono-num font-semibold text-slate-900 text-sm mt-1">
                  {weather.windSpeedKmh} km/h
                </div>
              </div>
              <div>
                <div className="text-slate-500 flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{t.rainChanceLabel}</span>
                </div>
                <div className="font-mono-num font-semibold text-slate-900 text-sm mt-1">
                  {weather.rainProbability}%
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-3 border border-slate-100">
            {weather.advisoryText[language]}
          </p>
        </div>
      </div>

      {/* Regional Field Reference Samples */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">{t.selectSamplePrompt}</h3>
          <span className="text-xs text-slate-500 font-mono-num">
            6 Verified Specimens
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CROP_SAMPLES.map((sample) => {
            const isSelected = sample.id === selectedSampleId;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSelectSample(sample.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50/40 shadow-sm'
                    : 'border-slate-200 hover:border-emerald-600/50 bg-white'
                }`}
              >
                <div className="w-full">
                  <LeafSpecimenIllustration svgType={sample.svgType} />
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{sample.cropName[language]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-num font-medium text-emerald-800">
                      {sample.confidence}%
                    </span>
                  </div>
                  <div className="mt-1 font-bold text-slate-900 text-sm">
                    {sample.diseaseTitle[language]}
                  </div>
                </div>

                <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between w-full">
                  <span className="truncate">{sample.region[language]}</span>
                  <span
                    className={`font-semibold shrink-0 ml-2 ${
                      sample.severity === 'high'
                        ? 'text-rose-700'
                        : sample.severity === 'moderate'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                    }`}
                  >
                    {sample.severity === 'high'
                      ? t.severityHigh
                      : sample.severity === 'moderate'
                      ? t.severityModerate
                      : sample.severity === 'low'
                      ? t.severityLow
                      : t.severityHealthy}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
