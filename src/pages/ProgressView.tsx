import { useState, useMemo } from 'react';
import { useAppData } from '../context';
import { PHASE_CONFIG, Phase, SCORE_CATEGORIES, SCORE_LABELS } from '../types';

export function ProgressView() {
  const { data } = useAppData();
  const [selectedStudent, setSelectedStudent] = useState<string>(data.students[0]?.id || '');

  const studentEvals = useMemo(() => {
    return [...data.evaluations]
      .filter(e => e.studentId === selectedStudent)
      .sort((a, b) => a.weekNumber - b.weekNumber);
  }, [data.evaluations, selectedStudent]);

  const phaseEvals = (phase: Phase) => studentEvals.filter(e => e.phase === phase);

  const phaseAverages = (phase: Phase) => {
    const evals = phaseEvals(phase);
    if (evals.length === 0) return null;

    const result: Record<string, number> = {};
    SCORE_CATEGORIES.forEach(cat => {
      result[cat.key] = evals.reduce((s, e) => s + e.scores[cat.key], 0) / evals.length;
    });
    result['overall'] = evals.reduce((s, e) => s + e.overallRating, 0) / evals.length;
    return result;
  };

  const student = data.students.find(s => s.id === selectedStudent);

  // Calculate trend data
  const trendData = useMemo(() => {
    if (studentEvals.length < 2) return null;
    const first = studentEvals[0];
    const last = studentEvals[studentEvals.length - 1];
    const firstAvg = Object.values(first.scores).reduce((a, b) => a + b, 0) / Object.values(first.scores).length;
    const lastAvg = Object.values(last.scores).reduce((a, b) => a + b, 0) / Object.values(last.scores).length;
    return {
      change: lastAvg - firstAvg,
      firstAvg,
      lastAvg,
      sessions: studentEvals.length,
    };
  }, [studentEvals]);

  if (data.students.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
          <div className="text-5xl mb-4">📈</div>
          <h3 className="text-lg font-semibold text-slate-700">No Students Yet</h3>
          <p className="text-sm text-slate-400 mt-2">Add students and evaluations to see progress data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">📈 Student Progress</h2>
          <p className="text-sm text-slate-400 mt-1">Track growth through Early, Middle, and Final phases</p>
        </div>
        <select
          value={selectedStudent}
          onChange={e => setSelectedStudent(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none bg-white"
        >
          {data.students.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Student Summary Card */}
      {student && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
              {student.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold">{student.name}</h3>
              <p className="text-indigo-200 text-sm">{student.program} • {student.yearLevel} • Started {student.startDate}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">{studentEvals.length}</p>
              <p className="text-xs text-indigo-100">Sessions</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">{phaseEvals('early').length}</p>
              <p className="text-xs text-indigo-100">Early Phase</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">{phaseEvals('middle').length}</p>
              <p className="text-xs text-indigo-100">Middle Phase</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">{phaseEvals('final').length}</p>
              <p className="text-xs text-indigo-100">Final Phase</p>
            </div>
          </div>
        </div>
      )}

      {/* Trend Summary */}
      {trendData && (
        <div className={`rounded-xl border p-5 ${
          trendData.change > 0 ? 'bg-emerald-50 border-emerald-200' : trendData.change < 0 ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{trendData.change > 0 ? '📈' : trendData.change < 0 ? '📉' : '➡️'}</span>
            <div>
              <p className={`font-bold text-lg ${
                trendData.change > 0 ? 'text-emerald-700' : trendData.change < 0 ? 'text-red-700' : 'text-slate-700'
              }`}>
                {trendData.change > 0 ? '+' : ''}{trendData.change.toFixed(2)} average score change
              </p>
              <p className="text-sm text-slate-500">
                From {trendData.firstAvg.toFixed(1)} → {trendData.lastAvg.toFixed(1)} across {trendData.sessions} sessions
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Phase-by-Phase Comparison */}
      <div className="space-y-6">
        {(['early', 'middle', 'final'] as Phase[]).map((phase) => {
          const config = PHASE_CONFIG[phase];
          const evals = phaseEvals(phase);
          const avgs = phaseAverages(phase);

          return (
            <div key={phase} className={`bg-white rounded-2xl border ${config.borderColor} shadow-sm overflow-hidden`}>
              <div className={`px-6 py-4 ${config.bgColor} border-b ${config.borderColor}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-bold ${config.color}`}>{config.label}</h3>
                    <p className="text-sm text-slate-500">{config.weeks} • {evals.length} session{evals.length !== 1 ? 's' : ''}</p>
                  </div>
                  {avgs && (
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${config.color}`}>{avgs['overall'].toFixed(1)}</p>
                      <p className="text-xs text-slate-400">Avg Overall</p>
                    </div>
                  )}
                </div>
              </div>

              {evals.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">
                  No evaluations in this phase yet.
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {/* Category bars */}
                  <div className="space-y-3">
                    {SCORE_CATEGORIES.map(cat => {
                      const avg = avgs![cat.key];
                      return (
                        <div key={cat.key} className="flex items-center gap-3">
                          <div className="w-44 sm:w-52 shrink-0">
                            <p className="text-sm font-medium text-slate-700 truncate">{cat.label}</p>
                          </div>
                          <div className="flex-1 bg-slate-100 rounded-full h-3 relative">
                            <div
                              className={`h-3 rounded-full transition-all ${
                                avg < 2 ? 'bg-red-400' : avg < 3 ? 'bg-orange-400' : avg < 4 ? 'bg-yellow-400' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${(avg / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-600 w-10 text-right">{avg.toFixed(1)}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Individual session list */}
                  <div>
                    <h4 className="font-semibold text-slate-700 text-sm mb-3">Session Details</h4>
                    <div className="space-y-2">
                      {evals.map(ev => {
                        const avg = (Object.values(ev.scores).reduce((a, b) => a + b, 0) / Object.values(ev.scores).length).toFixed(1);
                        return (
                          <div key={ev.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-indigo-600 w-8">W{ev.weekNumber}</span>
                              <span className="text-slate-600">{ev.date}</span>
                              <span className="hidden sm:inline text-slate-400">• {ev.sessionType}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-slate-500">Avg: {avg}</span>
                              <span className={`font-bold ${
                                ev.overallRating >= 4 ? 'text-emerald-600' : ev.overallRating >= 3 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {SCORE_LABELS[ev.overallRating]}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Week-by-week timeline */}
      {studentEvals.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-4">📅 Weekly Progress Timeline</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-2 text-slate-500 font-medium">Week</th>
                  <th className="text-left py-2 px-2 text-slate-500 font-medium">Date</th>
                  <th className="text-left py-2 px-2 text-slate-500 font-medium hidden sm:table-cell">Type</th>
                  {SCORE_CATEGORIES.map(c => (
                    <th key={c.key} className="text-center py-2 px-1 text-slate-500 font-medium hidden md:table-cell">
                      <span title={c.label}>{c.label.slice(0, 4)}</span>
                    </th>
                  ))}
                  <th className="text-center py-2 px-2 text-slate-500 font-medium">Overall</th>
                </tr>
              </thead>
              <tbody>
                {studentEvals.map(ev => {
                  const phaseConf = PHASE_CONFIG[ev.phase];
                  return (
                    <tr key={ev.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-2 px-2">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${phaseConf.bgColor} ${phaseConf.color}`}>
                          W{ev.weekNumber}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-slate-600">{ev.date}</td>
                      <td className="py-2 px-2 text-slate-500 hidden sm:table-cell">{ev.sessionType}</td>
                      {SCORE_CATEGORIES.map(c => (
                        <td key={c.key} className="text-center py-2 px-1 hidden md:table-cell">
                          <span className={`font-bold ${
                            ev.scores[c.key] >= 4 ? 'text-emerald-600' : ev.scores[c.key] >= 3 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {ev.scores[c.key]}
                          </span>
                        </td>
                      ))}
                      <td className="text-center py-2 px-2">
                        <span className={`font-bold text-base ${
                          ev.overallRating >= 4 ? 'text-emerald-600' : ev.overallRating >= 3 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {ev.overallRating}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
