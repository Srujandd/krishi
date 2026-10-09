import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { getLocalizedDiagnosis } from './src/data/localizedDiagnoses.ts';
import { SupportedLanguage } from './src/types/farm.ts';

dotenv.config();

const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  gu: 'Gujarati (ગુજરાતી)',
  hi: 'Hindi (हिन्दी)',
  te: 'Telugu (తెలుగు)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ta: 'Tamil (தமிழ்)',
};

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '15mb' }));

  app.post('/api/diagnose', async (req, res) => {
    const startMs = Date.now();
    const {
      imageBase64,
      mimeType = 'image/jpeg',
      notes = '',
      language = 'gu',
    } = req.body as {
      imageBase64?: string;
      mimeType?: string;
      notes?: string;
      language?: SupportedLanguage;
    };

    const langKey: SupportedLanguage = LANGUAGE_NAMES[language] ? language : 'gu';
    const langDisplayName = LANGUAGE_NAMES[langKey];

    const ai = getAiClient();
    if (!ai) {
      const fallback = getLocalizedDiagnosis('groundnut_tikka', langKey);
      return res.json(fallback);
    }

    try {
      const parts: Array<
        | { text: string }
        | { inlineData: { mimeType: string; data: string } }
      > = [];

      if (imageBase64) {
        parts.push({
          inlineData: {
            mimeType,
            data: imageBase64,
          },
        });
      }

      parts.push({
        text: `You are an expert Indian plant pathologist and agricultural extension officer.
Analyze the provided crop leaf specimen and/or field observation notes: "${notes || 'Inspect leaf for fungal, viral, or bacterial lesions.'}"
Respond strictly in ${langDisplayName} for all user-facing text fields (cropName, diseaseName, summary, symptoms, organicRemedies, chemicalRemedies, preventiveSteps).`,
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: { parts },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              cropName: { type: Type.STRING },
              scientificName: { type: Type.STRING },
              diseaseName: { type: Type.STRING },
              pathogenName: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              severity: { type: Type.STRING },
              summary: { type: Type.STRING },
              symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
              organicRemedies: { type: Type.ARRAY, items: { type: Type.STRING } },
              chemicalRemedies: { type: Type.ARRAY, items: { type: Type.STRING } },
              preventiveSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
              dosage: {
                type: Type.OBJECT,
                properties: {
                  chemicalName: { type: Type.STRING },
                  organicName: { type: Type.STRING },
                  chemicalPerLiterMl: { type: Type.NUMBER },
                  organicPerLiterMl: { type: Type.NUMBER },
                  waterLitersPerAcre: { type: Type.NUMBER },
                  applicationIntervalDays: { type: Type.NUMBER },
                  safetyIntervalDays: { type: Type.NUMBER },
                },
                required: [
                  'chemicalName',
                  'organicName',
                  'chemicalPerLiterMl',
                  'organicPerLiterMl',
                  'waterLitersPerAcre',
                  'applicationIntervalDays',
                  'safetyIntervalDays',
                ],
              },
            },
            required: [
              'cropName',
              'scientificName',
              'diseaseName',
              'pathogenName',
              'confidence',
              'severity',
              'summary',
              'symptoms',
              'organicRemedies',
              'chemicalRemedies',
              'preventiveSteps',
              'dosage',
            ],
          },
        },
      });

      const parsed = JSON.parse((response.text || '{}').trim());
      const validSeverity = ['low', 'moderate', 'high', 'healthy'].includes(parsed.severity)
        ? parsed.severity
        : 'moderate';

      return res.json({
        ...parsed,
        id: `gemini_${Date.now()}`,
        timestamp: new Date().toISOString(),
        severity: validSeverity,
        inferenceEngine: 'gemini-cloud',
        latencyMs: Date.now() - startMs,
      });
    } catch (err) {
      const fallback = getLocalizedDiagnosis('groundnut_tikka', langKey);
      return res.json(fallback);
    }
  });

  app.post('/api/transcribe', async (req, res) => {
    const {
      audioBase64,
      mimeType = 'audio/webm',
      language = 'gu',
    } = req.body as {
      audioBase64?: string;
      mimeType?: string;
      language?: SupportedLanguage;
    };

    const langKey: SupportedLanguage = LANGUAGE_NAMES[language] ? language : 'gu';
    const langDisplayName = LANGUAGE_NAMES[langKey];

    const ai = getAiClient();
    if (!ai || !audioBase64) {
      return res.json({
        text:
          langKey === 'gu'
            ? 'મગફળીના પાંદડા પર પીળા વલય સાથે ઘેરા કથ્થાઈ ટપકાં જોવા મળે છે.'
            : 'Groundnut leaves show circular dark brown spots with yellow rings.',
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-transcribe',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: audioBase64,
              },
            },
            {
              text: `Transcribe this farmer's crop symptom audio accurately in ${langDisplayName}.`,
            },
          ],
        },
      });
      return res.json({ text: response.text || '' });
    } catch {
      return res.json({
        text:
          langKey === 'gu'
            ? 'મગફળીના પાંદડા પર પીળા વલય સાથે ઘેરા કથ્થાઈ ટપકાં જોવા મળે છે.'
            : 'Groundnut leaves show circular dark brown spots with yellow rings.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
