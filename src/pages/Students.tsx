import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Mail, Phone } from 'lucide-react';

const mockStudents = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '(555) 123-4567', status: 'active', lastEval: '2 days ago', avgScore: '92%' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '(555) 234-5678', status: 'pending', lastEval: '1 week ago', avgScore: '-' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', phone: '(555) 345-6789', status: 'active', lastEval: '3 days ago', avgScore: '88%' },
  { id: 4, name: 'David Brown', email: 'david@example.com', phone: '(555) 456-7890', status: 'active', lastEval: '1 day ago', avgScore: '95%' },
  { id: 5, name: 'Emma Davis', email: 'emma@example.com', phone: '(555) 567-8901', status: 'inactive', lastEval: '2 weeks ago', avgScore: '85%' },
];

export function Students() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Students</h1>
          <p className="text-[#94a3b8]">Manage and evaluate your students</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStudents.map((student) => (
          <div key={student.id} className="glass-card p-6 group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#ff00a0] flex items-center justify-center text-[#0a0c0f] font-bold text-lg shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="p-2 rounded-lg hover:bg-[#2f3741] transition-colors">
                <MoreVertical className="w-4 h-4 text-[#64748b]" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-[#f0f4f8] mb-1">{student.name}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                <Mail className="w-4 h-4" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                <Phone className="w-4 h-4" />
                <span>{student.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className={`badge ${
                student.status === 'active' ? 'badge-success' :
                student.status === 'pending' ? 'badge-warning' :
                'badge-danger'
              }`}>
                {student.status}
              </span>
              <span className="text-xs text-[#64748b]">{student.lastEval}</span>
            </div>

            <div className="border-t border-[#2f3741] pt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#64748b] mb-1">Average Score</p>
                <p className={`text-xl font-bold ${
                  student.avgScore === '-' ? 'text-[#64748b]' : 'text-gradient'
                }`}>
                  {student.avgScore}
                </p>
              </div>
              <button className="btn-secondary text-xs py-2 px-4">
                Evaluate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
