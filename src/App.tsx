/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import {
  AppTab,
  DiagnosisReport,
  GpsCoordinates,
  SupportedLanguage,
  WeatherAdvisory,
} from './types/farm';
import { getLocalizedDiagnosis } from './data/localizedDiagnoses';
import { WEATHER_PRESETS } from './services/weatherService';
import { REGIONAL_GPS_PRESETS } from './services/gpsService';
import { AndroidTopBar } from './components/AndroidTopBar';
import { Header } from './components/Header';
import { ScannerHero } from './components/ScannerHero';
import { DiagnosisResult } from './components/DiagnosisResult';
import { CalculatorPage } from './components/CalculatorPage';
import { CropGuidePage } from './components/CropGuidePage';
import { HistoryPage } from './components/HistoryPage';
import { DosageModal } from './components/DosageModal';
import { VoiceTranscriberModal } from './components/VoiceTranscriberModal';
import { LiveGpsPrecisionModal } from './components/LiveGpsPrecisionModal';
import { AiEngineModal } from './components/AiEngineModal';
import { FlutterExportModal } from './components/FlutterExportModal';
import { AndroidNavBar } from './components/AndroidNavBar';

export default function App() {
  const [language, setLanguage] = useState<SupportedLanguage>('gu');
  const [activeTab, setActiveTab] = useState<AppTab>('scanner');
  const [selectedSampleId, setSelectedSampleId] = useState<string>('groundnut_tikka');
  const [currentReport, setCurrentReport] = useState<DiagnosisReport>(() =>
    getLocalizedDiagnosis('groundnut_tikka', 'gu')
  );
  const [scanHistory, setScanHistory] = useState<DiagnosisReport[]>(() => [
    getLocalizedDiagnosis('groundnut_tikka', 'gu'),
    getLocalizedDiagnosis('cotton_curl', 'gu'),
    getLocalizedDiagnosis('tomato_blight', 'gu'),
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherAdvisory>(WEATHER_PRESETS[0]);
  const [gps, setGps] = useState<GpsCoordinates>(REGIONAL_GPS_PRESETS[0]);

  const [isDosageModalOpen, setIsDosageModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);
  const [isEngineModalOpen, setIsEngineModalOpen] = useState(false);
  const [isFlutterModalOpen, setIsFlutterModalOpen] = useState(false);

  // Sync current sample report when language changes
  useEffect(() => {
    if (currentReport.sampleId) {
      const updated = getLocalizedDiagnosis(currentReport.sampleId, language);
      setCurrentReport(updated);
    }
  }, [language, currentReport.sampleId]);

  const handleSelectSample = (sampleId: string) => {
    setSelectedSampleId(sampleId);
    const report = getLocalizedDiagnosis(sampleId, language);
    setCurrentReport(report);
    setScanHistory((prev) => [report, ...prev.filter((r) => r.sampleId !== sampleId)].slice(0, 20));
  };

  const handleUploadImage = async (
    base64Image: string,
    mimeType: string,
    customNotes: string
  ) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Image,
          mimeType,
          notes: customNotes,
          language,
          gps,
        }),
      });
      if (!response.ok) {
        throw new Error('Server diagnosis failed');
      }
      const report: DiagnosisReport = await response.json();
      setCurrentReport(report);
      setScanHistory((prev) => [report, ...prev].slice(0, 20));
    } catch {
      const fallback = getLocalizedDiagnosis(selectedSampleId, language);
      setCurrentReport(fallback);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDiagnoseSymptoms = async (symptomText: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: symptomText,
          language,
          gps,
        }),
      });
      if (!response.ok) {
        throw new Error('Symptom diagnosis failed');
      }
      const report: DiagnosisReport = await response.json();
      setCurrentReport(report);
      setScanHistory((prev) => [report, ...prev].slice(0, 20));
      setActiveTab('scanner');
    } catch {
      const lower = symptomText.toLowerCase();
      const matchedId =
        lower.includes('કપાસ') || lower.includes('cotton')
          ? 'cotton_curl'
          : lower.includes('ટામેટાં') || lower.includes('tomato')
          ? 'tomato_blight'
          : lower.includes('ડાંગર') || lower.includes('rice')
          ? 'rice_blast'
          : lower.includes('ઘઉં') || lower.includes('wheat')
          ? 'wheat_rust'
          : 'groundnut_tikka';
      handleSelectSample(matchedId);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] text-slate-900 pb-20 md:pb-10">
      <AndroidTopBar
        language={language}
        onLanguageChange={setLanguage}
        gps={gps}
        onOpenGpsModal={() => setIsGpsModalOpen(true)}
        onOpenEngineModal={() => setIsEngineModalOpen(true)}
      />

      <Header
        language={language}
        onLanguageChange={setLanguage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenFlutterModal={() => setIsFlutterModalOpen(true)}
        scanCount={scanHistory.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {activeTab === 'scanner' && (
          <>
            <DiagnosisResult
              report={currentReport}
              language={language}
              onOpenDosageModal={() => setIsDosageModalOpen(true)}
              isAnalyzing={isAnalyzing}
            />
            <ScannerHero
              language={language}
              selectedSampleId={selectedSampleId}
              onSelectSample={handleSelectSample}
              onUploadImage={handleUploadImage}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              isAnalyzing={isAnalyzing}
              weather={weather}
              onSelectWeather={setWeather}
            />
          </>
        )}

        {activeTab === 'calculator' && (
          <CalculatorPage report={currentReport} language={language} />
        )}

        {activeTab === 'guide' && <CropGuidePage language={language} />}

        {activeTab === 'history' && (
          <HistoryPage
            history={scanHistory}
            language={language}
            onSelectReport={(rep) => {
              setCurrentReport(rep);
              setActiveTab('scanner');
            }}
            onClearHistory={() => setScanHistory([])}
          />
        )}
      </main>

      <AndroidNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
        scanCount={scanHistory.length}
      />

      <DosageModal
        isOpen={isDosageModalOpen}
        onClose={() => setIsDosageModalOpen(false)}
        report={currentReport}
        language={language}
      />

      <VoiceTranscriberModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={language}
        onDiagnoseSymptoms={handleDiagnoseSymptoms}
      />

      <LiveGpsPrecisionModal
        isOpen={isGpsModalOpen}
        onClose={() => setIsGpsModalOpen(false)}
        gps={gps}
        onUpdateGps={setGps}
        language={language}
      />

      <AiEngineModal
        isOpen={isEngineModalOpen}
        onClose={() => setIsEngineModalOpen(false)}
        language={language}
      />

      <FlutterExportModal
        isOpen={isFlutterModalOpen}
        onClose={() => setIsFlutterModalOpen(false)}
        language={language}
      />
    </div>
  );
}

