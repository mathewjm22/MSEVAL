import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppData } from '../context';
import {
  SessionEvaluation,
  SCORE_CATEGORIES,
  SESSION_TYPES,
  PHASE_CONFIG,
  Phase,
  DEFAULT_SCORES,
} from '../types';
import { ScoreInput } from '../components/ScoreInput';

export function EvaluateSession() {
  const { data, addEvaluation, updateEvaluation } = useAppData();
  const navigate = useNavigate();
  const { id } = useParams();

  const existingEval = id ? data.evaluations.find(e => e.id === id) : null;

  const [form, setForm] = useState<SessionEvaluation>(() => {
    if (existingEval) return { ...existingEval, scores: { ...existingEval.scores } };
    return {
      id: uuidv4(),
      studentId: data.students[0]?.id || '',
      date: new Date().toISOString().split('T')[0],
      weekNumber: 1,
      phase: 'early' as Phase,
      sessionType: SESSION_TYPES[0],
      patientEncounters: 0,
      scores: { ...DEFAULT_SCORES },
      strengths: '',
      areasForImprovement: '',
      actionPlan: '',
      preceptorNotes: '',
      overallRating: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);

  // Auto-determine phase from week number
  const autoPhase = useMemo((): Phase => {
    if (form.weekNumber <= 12) return 'early';
    if (form.weekNumber <= 30) return 'middle';
    return 'final';
  }, [form.weekNumber]);

  const updateForm = <K extends keyof SessionEvaluation>(key: K, value: SessionEvaluation[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const updateScore = (key: keyof typeof form.scores, value: number) => {
    setForm(prev => ({ ...prev, scores: { ...prev.scores, [key]: value } }));
  };

  const avgScore = useMemo(() => {
    const vals = Object.values(form.scores);
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  }, [form.scores]);

  const handleSave = () => {
    const updated = { ...form, phase: autoPhase, updatedAt: new Date().toISOString() };
    if (existingEval) {
      updateEvaluation(updated);
    } else {
      addEvaluation(updated);
    }
    setSaved(true);
    setTimeout(() => navigate('/evaluations'), 1500);
  };

  if (data.students.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border-2 border-dashed border-amber-200 p-12 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-slate-700">No Students Added</h3>
          <p className="text-sm text-slate-400 mt-2 mb-6">You need to add at least one student before creating an evaluation.</p>
          <button
            onClick={() => navigate('/students')}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
          >
            Go to Students
          </button>
        </div>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-emerald-200 p-12 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-emerald-700">Evaluation Saved!</h3>
          <p className="text-sm text-slate-400 mt-2">Redirecting to evaluations list...</p>
        </div>
      </div>
    );
  }

  const STEPS = ['Session Details', 'Clinical Scores', 'Feedback & Notes', 'Review & Submit'];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {existingEval ? '✏️ Edit Evaluation' : '📝 New Session Evaluation'}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {existingEval ? 'Update this evaluation' : 'Record a new clinical session evaluation'}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all ${
              step === i
                ? 'bg-indigo-600 text-white shadow-md'
                : step > i
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Step 0: Session Details */}
      {step === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Student *</label>
              <select
                value={form.studentId}
                onChange={e => updateForm('studentId', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
              >
                {data.students.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={e => updateForm('date', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Week Number (1-52)</label>
              <input
                type="number"
                min={1}
                max={52}
                value={form.weekNumber}
                onChange={e => updateForm('weekNumber', parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
              <p className="text-xs mt-1">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${PHASE_CONFIG[autoPhase].bgColor} ${PHASE_CONFIG[autoPhase].color} border ${PHASE_CONFIG[autoPhase].borderColor}`}>
                  {PHASE_CONFIG[autoPhase].label} ({PHASE_CONFIG[autoPhase].weeks})
                </span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Session Type</label>
              <select
                value={form.sessionType}
                onChange={e => updateForm('sessionType', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
              >
                {SESSION_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Patient Encounters</label>
              <input
                type="number"
                min={0}
                value={form.patientEncounters}
                onChange={e => updateForm('patientEncounters', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Clinical Scores */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
            <p className="text-sm text-indigo-700 font-medium">
              Rate each competency from 1 (Below Expectations) to 5 (Outstanding)
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SCORE_CATEGORIES.map(cat => (
              <ScoreInput
                key={cat.key}
                label={cat.label}
                description={cat.description}
                value={form.scores[cat.key]}
                onChange={v => updateScore(cat.key, v)}
              />
            ))}
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-sm text-slate-500">Category Average</p>
            <p className="text-3xl font-bold text-indigo-600">{avgScore}</p>
          </div>
        </div>
      )}

      {/* Step 2: Feedback */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">💪 Strengths</label>
            <textarea
              value={form.strengths}
              onChange={e => updateForm('strengths', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
              placeholder="What did the student do well today?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">🎯 Areas for Improvement</label>
            <textarea
              value={form.areasForImprovement}
              onChange={e => updateForm('areasForImprovement', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
              placeholder="What areas need more work?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">📋 Action Plan / Goals</label>
            <textarea
              value={form.actionPlan}
              onChange={e => updateForm('actionPlan', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
              placeholder="Specific goals or tasks for next session..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">📝 Preceptor Notes (private)</label>
            <textarea
              value={form.preceptorNotes}
              onChange={e => updateForm('preceptorNotes', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
              placeholder="Additional notes for your records..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">⭐ Overall Session Rating</label>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => updateForm('overallRating', r)}
                  className={`flex-1 py-3 rounded-xl text-lg font-bold transition-all border-2 ${
                    form.overallRating === r
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105'
                      : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {'⭐'.repeat(r)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 text-lg mb-4">📋 Evaluation Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Student</p>
                <p className="font-semibold text-slate-800">{data.students.find(s => s.id === form.studentId)?.name || '-'}</p>
              </div>
              <div>
                <p className="text-slate-400">Date</p>
                <p className="font-semibold text-slate-800">{form.date}</p>
              </div>
              <div>
                <p className="text-slate-400">Week / Phase</p>
                <p className="font-semibold text-slate-800">
                  Week {form.weekNumber} •{' '}
                  <span className={PHASE_CONFIG[autoPhase].color}>{PHASE_CONFIG[autoPhase].label}</span>
                </p>
              </div>
              <div>
                <p className="text-slate-400">Session Type</p>
                <p className="font-semibold text-slate-800">{form.sessionType}</p>
              </div>
              <div>
                <p className="text-slate-400">Patient Encounters</p>
                <p className="font-semibold text-slate-800">{form.patientEncounters}</p>
              </div>
              <div>
                <p className="text-slate-400">Overall Rating</p>
                <p className="font-semibold text-indigo-600 text-lg">{form.overallRating}/5 ⭐</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3">Competency Scores</h4>
            <div className="grid grid-cols-2 gap-3">
              {SCORE_CATEGORIES.map(cat => (
                <div key={cat.key} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{cat.label}</span>
                  <span className={`font-bold ${
                    form.scores[cat.key] >= 4 ? 'text-emerald-600' : form.scores[cat.key] >= 3 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {form.scores[cat.key]}/5
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="font-medium text-slate-700">Average</span>
              <span className="text-xl font-bold text-indigo-600">{avgScore}/5</span>
            </div>
          </div>

          {(form.strengths || form.areasForImprovement || form.actionPlan || form.preceptorNotes) && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              {form.strengths && (
                <div>
                  <h4 className="font-semibold text-emerald-700 text-sm">💪 Strengths</h4>
                  <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">{form.strengths}</p>
                </div>
              )}
              {form.areasForImprovement && (
                <div>
                  <h4 className="font-semibold text-amber-700 text-sm">🎯 Areas for Improvement</h4>
                  <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">{form.areasForImprovement}</p>
                </div>
              )}
              {form.actionPlan && (
                <div>
                  <h4 className="font-semibold text-blue-700 text-sm">📋 Action Plan</h4>
                  <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">{form.actionPlan}</p>
                </div>
              )}
              {form.preceptorNotes && (
                <div>
                  <h4 className="font-semibold text-slate-700 text-sm">📝 Preceptor Notes</h4>
                  <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">{form.preceptorNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200"
          >
            ✅ {existingEval ? 'Update Evaluation' : 'Save Evaluation'}
          </button>
        )}
      </div>
    </div>
  );
}
