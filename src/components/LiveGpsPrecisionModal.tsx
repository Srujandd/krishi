import React, { useState } from 'react';
import { Crosshair, MapPin, X } from 'lucide-react';
import { GpsCoordinates, SupportedLanguage } from '../types/farm';
import { TRANSLATIONS } from '../data/translations';
import { acquireBrowserGps, REGIONAL_GPS_PRESETS } from '../services/gpsService';

interface LiveGpsPrecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  gps: GpsCoordinates;
  onUpdateGps: (coords: GpsCoordinates) => void;
  language: SupportedLanguage;
}

export const LiveGpsPrecisionModal: React.FC<LiveGpsPrecisionModalProps> = ({
  isOpen,
  onClose,
  gps,
  onUpdateGps,
  language,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];
  const [loadingGps, setLoadingGps] = useState(false);

  const handleAcquireLive = async () => {
    setLoadingGps(true);
    const coords = await acquireBrowserGps();
    onUpdateGps(coords);
    setLoadingGps(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-bold text-slate-900">{t.gpsModalTitle}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600">{t.gpsModalDesc}</p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">{t.districtLabel}:</span>
            <strong className="text-slate-900">{gps.district}, {gps.state}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">WGS84 Coordinates:</span>
            <strong className="font-mono-num text-emerald-800">
              {gps.latitude.toFixed(5)}° N, {gps.longitude.toFixed(5)}° E
            </strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{t.accuracyLabel}:</span>
            <strong className="font-mono-num text-slate-900">±{gps.accuracyMeters} m</strong>
          </div>
          <div className="pt-1 border-t border-slate-200 text-xs text-slate-600">
            <span className="font-semibold">{t.agroZoneLabel}:</span> {gps.agroClimaticZone}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-500">
            Select Regional Research Station Benchmark:
          </div>
          <div className="grid grid-cols-1 gap-2">
            {REGIONAL_GPS_PRESETS.map((preset) => (
              <button
                key={preset.district}
                type="button"
                onClick={() => onUpdateGps(preset)}
                className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${
                  gps.district === preset.district
                    ? 'border-emerald-700 bg-emerald-50/60 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{preset.district}</span>
                <span className="font-mono-num text-slate-500">
                  {preset.latitude.toFixed(2)}°N, {preset.longitude.toFixed(2)}°E
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleAcquireLive}
            disabled={loadingGps}
            className="min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Crosshair className="w-4 h-4" />
            <span>{loadingGps ? '...' : t.refreshGpsBtn}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
