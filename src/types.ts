export type Phase = 'early' | 'middle' | 'final';

export interface PreceptorProfile {
  name: string;
  title: string;
  institution: string;
  specialty: string;
  email: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  program: string;
  yearLevel: string;
  startDate: string;
  photo?: string;
}

export interface EvaluationScores {
  clinicalKnowledge: number;
  clinicalReasoning: number;
  patientCommunication: number;
  professionalBehavior: number;
  technicalSkills: number;
  documentation: number;
  teamwork: number;
  initiative: number;
}

export interface SessionEvaluation {
  id: string;
  studentId: string;
  date: string;
  weekNumber: number;
  phase: Phase;
  sessionType: string;
  patientEncounters: number;
  scores: EvaluationScores;
  strengths: string;
  areasForImprovement: string;
  actionPlan: string;
  preceptorNotes: string;
  overallRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface AppData {
  preceptor: PreceptorProfile;
  students: StudentProfile[];
  evaluations: SessionEvaluation[];
  version: string;
}

export const SCORE_LABELS: Record<number, string> = {
  1: 'Below Expectations',
  2: 'Approaching Expectations',
  3: 'Meets Expectations',
  4: 'Exceeds Expectations',
  5: 'Outstanding',
};

export const SCORE_CATEGORIES: { key: keyof EvaluationScores; label: string; description: string }[] = [
  { key: 'clinicalKnowledge', label: 'Clinical Knowledge', description: 'Medical knowledge, pathophysiology, pharmacology' },
  { key: 'clinicalReasoning', label: 'Clinical Reasoning', description: 'Differential diagnosis, diagnostic workup, treatment planning' },
  { key: 'patientCommunication', label: 'Patient Communication', description: 'History taking, patient education, empathy' },
  { key: 'professionalBehavior', label: 'Professional Behavior', description: 'Punctuality, ethics, appearance, responsibility' },
  { key: 'technicalSkills', label: 'Technical/Procedural Skills', description: 'Physical exam, procedures, clinical techniques' },
  { key: 'documentation', label: 'Documentation', description: 'Notes, orders, prescriptions, referrals' },
  { key: 'teamwork', label: 'Teamwork & Collaboration', description: 'Interprofessional communication, consultations' },
  { key: 'initiative', label: 'Initiative & Self-Directed Learning', description: 'Proactive learning, literature review, questions' },
];

export const SESSION_TYPES = [
  'Clinic Day',
  'Hospital Rounds',
  'Procedure Day',
  'Emergency/Urgent Care',
  'Telehealth',
  'Case Presentation',
  'Didactic/Teaching Session',
  'On-Call/Night Shift',
  'Community Health',
  'Other',
];

export const PHASE_CONFIG: Record<Phase, { label: string; color: string; bgColor: string; borderColor: string; weeks: string }> = {
  early: { label: 'Early Phase', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', weeks: 'Weeks 1–12' },
  middle: { label: 'Middle Phase', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', weeks: 'Weeks 13–30' },
  final: { label: 'Final Phase', color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', weeks: 'Weeks 31–52' },
};

export const DEFAULT_SCORES: EvaluationScores = {
  clinicalKnowledge: 3,
  clinicalReasoning: 3,
  patientCommunication: 3,
  professionalBehavior: 3,
  technicalSkills: 3,
  documentation: 3,
  teamwork: 3,
  initiative: 3,
};
