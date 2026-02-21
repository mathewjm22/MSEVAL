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
  teachingTopics?: { category: string; topics: string[] }[];
  conditionsSeen?: string[];
  customConditions?: string[];
  objectivesAchieved?: number[];
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

export const TEACHING_TOPIC_CATEGORIES: { category: string; topics: string[] }[] = [
  { category: 'Cardiovascular', topics: ['Chest pain', 'Heart failure', 'Arrhythmias', 'Hypertension', 'Valvular disease', 'Peripheral vascular disease', 'ASCVD', 'Syncope'] },
  { category: 'Pulmonary/Respiratory', topics: ['Asthma', 'COPD', 'Pneumonia', 'Pulmonary embolism', 'Dyspnea', 'Cough', 'Pleural effusion', 'Lung cancer'] },
  { category: 'Gastrointestinal', topics: ['Abdominal pain', 'GI bleed', 'Liver disease', 'GERD', 'Diarrhea', 'Constipation', 'Nausea/Vomiting', 'Jaundice', 'Hernia', 'Inflammatory bowel disease'] },
  { category: 'Endocrinology', topics: ['Diabetes', 'Thyroid disorders', 'Obesity', 'Osteoporosis', 'Hyperlipidemia', 'Adrenal disorders', 'Metabolic syndrome'] },
  { category: 'Neurology', topics: ['Headache', 'Stroke', 'Seizure', 'Dementia', 'Altered mental status', 'Dizziness', 'Neuropathy', 'Abnormal movements'] },
  { category: 'Psychiatry/Behavioral Health', topics: ['Depression', 'Anxiety', 'Sleep disorders', 'Substance abuse', 'Chronic pain', 'PTSD', 'Bipolar disorder'] },
  { category: 'Musculoskeletal', topics: ['Back pain', 'Osteoarthritis', 'Fractures', 'Rheumatologic conditions', 'Joint pain', 'Gout', 'Fibromyalgia'] },
  { category: 'Renal/Urinary', topics: ['AKI', 'CKD', 'Hematuria', 'Dysuria', 'UTI', 'Electrolyte abnormalities', 'Nephrolithiasis'] },
  { category: 'Hematology/Oncology', topics: ['Anemia', 'DVT/PE', 'Cancer screening', 'Lymphadenopathy', 'Thrombocytopenia', 'Leukemia/Lymphoma'] },
  { category: 'Dermatology', topics: ['Rash', 'Skin cancer', 'Wound care', 'Eczema', 'Psoriasis', 'Cellulitis', 'Acne'] },
  { category: 'Infectious Disease', topics: ['Fever', 'Pneumonia', 'UTI', 'Cellulitis', 'HIV', 'Sepsis', 'COVID-19', 'STI'] },
  { category: "Women's Health", topics: ['Breast complaint', 'Pelvic pain', 'Abnormal uterine bleeding', 'Contraception', 'Menopause', 'Pregnancy complications', 'Cervical cancer screening'] },
  { category: 'Preventive Medicine', topics: ['Cancer screening', 'Diet counseling', 'Disease prevention', 'Immunizations', 'Smoking cessation', 'Exercise counseling'] },
  { category: 'Geriatrics', topics: ['Falls', 'Capacity evaluation', 'Polypharmacy', 'End-of-life care', 'Delirium', 'Frailty'] },
  { category: 'Other/General', topics: ['Preop assessment', 'Failure to thrive', 'Toxic ingestion', 'Fatigue', 'Weight loss'] },
];

export const PREPOPULATED_CONDITIONS: { category: string; conditions: string[] }[] = [
  { category: 'General/Pediatric', conditions: ['Fever', 'Failure to Thrive', 'Toxic Ingestion'] },
  { category: 'Hematology', conditions: ['Anemia'] },
  { category: 'GI', conditions: ['Acute Abdominal Pain', 'Jaundice/Hepatobiliary Disease', 'Diarrhea', 'Vomiting', 'GI Bleed', 'Hernia', 'Liver Disease'] },
  { category: 'Pulmonary', conditions: ['Asthma', 'Cough', 'Pneumonia', 'COPD', 'Dyspnea'] },
  { category: 'Cardiovascular', conditions: ['Hypertension', 'ASCVD', 'CHF', 'Syncope', 'DVT/PE'] },
  { category: 'Dermatology', conditions: ['Rash', 'Skin Cancer'] },
  { category: 'Neurology', conditions: ['Altered Mental Status', 'Headache', 'Dementia', 'Seizure', 'Abnormal Movements', 'Stroke', 'Vision Changes', 'Dizziness'] },
  { category: 'Psychiatry', conditions: ['Anxiety', 'Depression', 'Chronic Pain', 'Sleep Disorders'] },
  { category: 'Endocrine', conditions: ['Diabetes', 'Obesity', 'Osteoporosis', 'Thyroid Disorders', 'Hyperlipidemia'] },
  { category: "Women's Health", conditions: ['Breast Complaint', 'Pelvic Pain', 'Abnormal Uterine Bleeding'] },
  { category: 'Renal/Urinary', conditions: ['Hematuria', 'Dysuria', 'AKI', 'CKD'] },
  { category: 'Musculoskeletal', conditions: ['Back Pain', 'Osteoarthritis', 'Rheumatologic Conditions', 'Fractures'] },
  { category: 'Preventive Care', conditions: ['Capacity Evaluation', 'Cancer Screening', 'Diet Counseling', 'Disease Prevention'] },
  { category: 'Other', conditions: ['Preop Assessment'] },
];

export const CLINICAL_OBJECTIVES: string[] = [
  'Gather a comprehensive and accurate patient-centered history from an adult patient with a common clinical condition',
  'Perform a physical examination for a medically stable adult patient with a common clinical condition',
  'Develop an initial assessment (supported by clinical data), a prioritized differential diagnosis and problem list for an adult patient with a common clinical condition',
  'Recommend and interpret common diagnostic tests in an adult patient with a common clinical condition',
  'Provide preventive care and anticipatory guidance for health-care maintenance in adult patients',
  'With support from faculty, develop an evidence-based patient-centered management plan for a common clinical condition for an adult',
  'With support from faculty, organize the safe and efficient care of at least 2 hospitalized patients simultaneously',
  'Provide written documentation of a patient encounter for an ambulatory adult patient with a common clinical condition',
  'Provide written documentation of a patient encounter for a hospitalized adult patient with a common clinical condition',
  'Present an ambulatory adult patient with a common clinical condition in an organized and efficient fashion',
  'Present a hospitalized adult patient with a common clinical condition in an organized and efficient fashion using a problem-based approach',
];
