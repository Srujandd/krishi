import React from 'react';
import { DiagnosisReport, SupportedLanguage } from '../types/farm';
import { HistoryPage } from './HistoryPage';

interface ScanHistoryModalProps {
  history: DiagnosisReport[];
  language: SupportedLanguage;
  onSelectReport: (report: DiagnosisReport) => void;
  onClearHistory: () => void;
}

export const ScanHistoryModal: React.FC<ScanHistoryModalProps> = (props) => {
  return <HistoryPage {...props} />;
};
