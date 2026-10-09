export type SupportedLanguage = 'en' | 'hi' | 'te' | 'kn' | 'ta' | 'gu';

export type AppTab = 'scanner' | 'calculator' | 'guide' | 'history';

export type SeverityLevel = 'low' | 'moderate' | 'high' | 'healthy';

export interface TreatmentDosage {
  chemicalName: string;
  organicName: string;
  chemicalPerLiterMl: number;
  organicPerLiterMl: number;
  waterLitersPerAcre: number;
  applicationIntervalDays: number;
  safetyIntervalDays: number;
}

export interface DiagnosisReport {
  id: string;
  timestamp: string;
  cropName: string;
  scientificName: string;
  diseaseName: string;
  pathogenName: string;
  confidence: number;
  severity: SeverityLevel;
  summary: string;
  symptoms: string[];
  organicRemedies: string[];
  chemicalRemedies: string[];
  preventiveSteps: string[];
  dosage: TreatmentDosage;
  imageUrl?: string;
  sampleId?: string;
  inferenceEngine: 'gemini-cloud' | 'tflite-edge';
  latencyMs: number;
  gpsLocation?: {
    latitude: number;
    longitude: number;
    accuracyMeters: number;
    district: string;
    state: string;
  };
}

export interface CropSample {
  id: string;
  cropKey: string;
  cropName: Record<SupportedLanguage, string>;
  diseaseTitle: Record<SupportedLanguage, string>;
  region: Record<SupportedLanguage, string>;
  severity: SeverityLevel;
  confidence: number;
  svgType: 'tomato_blight' | 'cotton_leaf_curl' | 'groundnut_tikka' | 'rice_blast' | 'wheat_rust' | 'healthy_leaf';
}

export interface WeatherAdvisory {
  id: string;
  regionName: Record<SupportedLanguage, string>;
  temperatureC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  rainProbability: number;
  spraySuitability: 'optimal' | 'caution' | 'avoid';
  advisoryText: Record<SupportedLanguage, string>;
}

export interface CropCareGuide {
  id: string;
  cropName: Record<SupportedLanguage, string>;
  scientificName: string;
  season: Record<SupportedLanguage, string>;
  soilType: Record<SupportedLanguage, string>;
  optimalPh: string;
  waterRequirementMm: string;
  keyDiseases: Record<SupportedLanguage, string[]>;
  nutritionSchedule: Record<SupportedLanguage, string[]>;
  harvestWindowDays: string;
}

export interface GpsCoordinates {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  altitudeMeters: number | null;
  district: string;
  state: string;
  agroClimaticZone: string;
  updatedAt: string;
  isSimulated: boolean;
}
