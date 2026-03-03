import { Search, Download, Eye, Calendar, User, CheckCircle } from 'lucide-react';

const evaluations = [
  { id: 1, student: 'Alice Johnson', date: '2024-03-15', type: 'Mid-Rotation', score: '92%', status: 'completed', evaluator: 'Dr. Smith' },
  { id: 2, student: 'Bob Smith', date: '2024-03-14', type: 'Final', score: '88%', status: 'completed', evaluator: 'Dr. Johnson' },
  { id: 3, student: 'Carol White', date: '2024-03-12', type: 'Mid-Rotation', score: '-', status: 'pending', evaluator: 'Dr. Smith' },
  { id: 4, student: 'David Brown', date: '2024-03-10', type: 'Final', score: '95%', status: 'completed', evaluator: 'Dr. Williams' },
  { id: 5, student: 'Emma Davis', date: '2024-03-08', type: 'Mid-Rotation', score: '85%', status: 'completed', evaluator: 'Dr. Smith' },
];

export function EvaluationsList() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Evaluations</h1>
          <p className="text-[#94a3b8]">View and manage all evaluation records</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
          <input type="text" placeholder="Search evaluations..." className="pl-10" />
        </div>
        <select className="w-full md:w-48">
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <select className="w-full md:w-48">
          <option value="">All Types</option>
          <option value="mid">Mid-Rotation</option>
          <option value="final">Final</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-panel overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Type</th>
              <th>Date</th>
              <th>Score</th>
              <th>Status</th>
              <th>Evaluator</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((eval) => (
              <tr key={eval.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#ff00a0] flex items-center justify-center text-[#0a0c0f] text-xs font-bold">
                      {eval.student.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium">{eval.student}</span>
                  </div>
                </td>
                <td>
                  <span className="text-sm text-[#94a3b8]">{eval.type}</span>
                </td>
                <td>
                  <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                    <Calendar className="w-4 h-4" />
                    {eval.date}
                  </div>
                </td>
                <td>
                  <span className={`font-bold ${
                    eval.score === '-' ? 'text-[#64748b]' : 'text-gradient'
                  }`}>
                    {eval.score}
                  </span>
                </td>
                <td>
                  <span className={`badge ${
                    eval.status === 'completed' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {eval.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                    <User className="w-4 h-4" />
                    {eval.evaluator}
                  </div>
                </td>
                <td>
                  <button className="p-2 rounded-lg hover:bg-[#1a1f26] transition-colors text-[#00f0ff]">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
