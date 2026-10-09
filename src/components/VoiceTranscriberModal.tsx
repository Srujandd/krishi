import React, { useRef, useState } from 'react';
import { Mic, Square, Sparkles, X } from 'lucide-react';
import { SupportedLanguage } from '../types/farm';
import { LANGUAGE_OPTIONS, TRANSLATIONS } from '../data/translations';

interface VoiceTranscriberModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  onDiagnoseSymptoms: (symptomText: string) => void;
}

const SAMPLE_VOICE_PROMPTS: Record<SupportedLanguage, string[]> = {
  en: [
    'Groundnut leaves have dark brown circular spots with yellow rings and lower leaves are falling.',
    'Cotton top leaves are curling upwards with thickened dark veins and whiteflies underneath.',
  ],
  gu: [
    'મગફળીના પાંદડા પર પીળા કુંડાળાવાળા ઘેરા કથ્થાઈ ટપકાં દેખાય છે અને નીચેના પાન ખરી રહ્યા છે.',
    'કપાસના ટોચના પાન કોકડાઈ ગયા છે અને પાનની નીચે સફેદ માખી જોવા મળે છે.',
    'ટામેટાંના જૂના પાંદડા પર કાળા ચક્ર જેવા ટપકાં અને સુકારો જણાય છે.',
  ],
  hi: [
    'मूंगफली की पत्तियों पर पीले घेरे वाले गहरे भूरे धब्बे हैं और नीचे की पत्तियां झड़ रही हैं।',
    'कपास की ऊपरी पत्तियां ऊपर की ओर मुड़ रही हैं और सफेद मक्खी दिख रही है।',
  ],
  te: [
    'వేరుశనగ ఆకులపై పసుపు వలయాలతో గోధుమ రంగు మచ్చలు ఉన్నాయి.',
  ],
  kn: [
    'ನೆಲಗಡಲೆ ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ ಉಂಗುರಗಳಿರುವ ಕಂದು ಚುಕ್ಕೆಗಳಿವೆ.',
  ],
  ta: [
    'நிலக்கடலை இலைகளில் மஞ்சள் வளையங்களுடன் பழுப்பு நிற புள்ளிகள் உள்ளன.',
  ],
};

export const VoiceTranscriberModal: React.FC<VoiceTranscriberModalProps> = ({
  isOpen,
  onClose,
  language,
  onDiagnoseSymptoms,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];
  const langOption = LANGUAGE_OPTIONS.find((l) => l.code === language);

  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((tr) => tr.stop());
        const audioBlob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        await sendAudioForTranscription(audioBlob, recorder.mimeType || 'audio/webm');
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setErrorMessage(
        language === 'gu'
          ? 'માઇક્રોફોન પરવાનગી મળી નથી. તમે નીચે લક્ષણો પસંદ કરી અથવા લખી શકો છો.'
          : 'Microphone access unavailable in this frame. Select a sample voice note or type below.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioForTranscription = async (blob: Blob, mimeType: string) => {
    setIsTranscribing(true);
    try {
      const reader = new FileReader();
      const base64Audio: string = await new Promise((resolve) => {
        reader.onloadend = () => {
          const res = String(reader.result || '');
          resolve(res.includes(',') ? res.split(',')[1] : res);
        };
        reader.readAsDataURL(blob);
      });

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64: base64Audio, mimeType, language }),
      });
      const data = await response.json();
      if (data.text) {
        setTranscriptText(data.text);
      }
    } catch {
      setErrorMessage('Transcription request failed. Please type or select a preset below.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const presets = SAMPLE_VOICE_PROMPTS[language] || SAMPLE_VOICE_PROMPTS.en;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{t.voiceModalTitle}</h3>
            <p className="text-xs text-slate-500">
              {langOption?.label} ({langOption?.ttsLang}) · Gemini 3.5 Transcribe
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600">{t.voiceModalDesc}</p>

        <div className="flex items-center gap-3">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              disabled={isTranscribing}
              className="min-h-[44px] px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>{t.startRecordingBtn}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="min-h-[44px] px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <Square className="w-4 h-4" />
              <span>{t.stopRecordingBtn}</span>
            </button>
          )}

          {isTranscribing && (
            <span className="text-xs text-emerald-800 font-medium">
              {t.transcribingAudio}
            </span>
          )}
        </div>

        {errorMessage && (
          <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-2.5">
            {errorMessage}
          </p>
        )}

        {/* Quick regional voice presets */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-slate-500">
            Quick Field Symptom Phrases ({langOption?.label}):
          </div>
          <div className="flex flex-col gap-1.5">
            {presets.map((phrase, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTranscriptText(phrase)}
                className="text-left text-xs p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              >
                “{phrase}”
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={3}
          value={transcriptText}
          onChange={(e) => setTranscriptText(e.target.value)}
          placeholder={t.customNotePlaceholder}
          className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
        />

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
          >
            {t.closeBtn}
          </button>
          <button
            type="button"
            disabled={!transcriptText.trim()}
            onClick={() => {
              onDiagnoseSymptoms(transcriptText.trim());
              onClose();
            }}
            className="min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.analyzeSymptomsBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
