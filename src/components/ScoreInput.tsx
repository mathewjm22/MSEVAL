import { SCORE_LABELS } from '../types';

interface ScoreInputProps {
  label: string;
  description: string;
  value: number;
  onChange: (v: number) => void;
}

const SCORE_COLORS: Record<number, string> = {
  1: 'bg-red-500',
  2: 'bg-orange-400',
  3: 'bg-yellow-400',
  4: 'bg-lime-500',
  5: 'bg-emerald-500',
};

export function ScoreInput({ label, description, value, onChange }: ScoreInputProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="mb-3">
        <h4 className="font-semibold text-slate-800 text-sm">{label}</h4>
        <p className="text-xs text-slate-400 mt-0.5">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all border-2 ${
              value === score
                ? `${SCORE_COLORS[score]} text-white border-transparent shadow-md scale-105`
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
            }`}
          >
            {score}
          </button>
        ))}
      </div>
      <p className={`text-xs mt-2 text-center font-medium ${
        value <= 2 ? 'text-red-600' : value === 3 ? 'text-yellow-600' : 'text-emerald-600'
      }`}>
        {SCORE_LABELS[value]}
      </p>
    </div>
  );
}
