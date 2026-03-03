import { useApp } from '../context';
import { 
  Users, 
  ClipboardCheck, 
  TrendingUp, 
  Calendar,
  Activity,
  Award
} from 'lucide-react';

export function Dashboard() {
  const { state } = useApp();

  // Mock data - replace with your actual data
  const stats = [
    { label: 'Total Students', value: '24', icon: Users, color: 'cyan' },
    { label: 'Pending Evaluations', value: '8', icon: ClipboardCheck, color: 'magenta' },
    { label: 'Completed This Month', value: '16', icon: Award, color: 'lime' },
    { label: 'Average Score', value: '87%', icon: TrendingUp, color: 'amber' },
  ];

  const recentActivity = [
    { student: 'Alice Johnson', action: 'Completed evaluation', score: '92%', time: '2 hours ago', type: 'success' },
    { student: 'Bob Smith', action: 'Started evaluation', score: '-', time: '4 hours ago', type: 'info' },
    { student: 'Carol White', action: 'Evaluation pending', score: '-', time: '1 day ago', type: 'warning' },
    { student: 'David Brown', action: 'Completed evaluation', score: '88%', time: '2 days ago', type: 'success' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-[#94a3b8]">Welcome back! Here's what's happening with your evaluations.</p>
        </div>
        <div className="flex items-center gap-2 text-[#64748b]">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg bg-[#1a1f26] border border-[#2f3741] group-hover:border-[#00f0ff] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.color === 'cyan' ? 'text-[#00f0ff]' :
                  stat.color === 'magenta' ? 'text-[#ff00a0]' :
                  stat.color === 'lime' ? 'text-[#39ff14]' :
                  'text-[#ffaa00]'
                }`} />
              </div>
              <Activity className="w-4 h-4 text-[#64748b]" />
            </div>
            <p className="text-[#94a3b8] text-sm mb-1">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <button className="btn-secondary text-xs py-2 px-4">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-[#111418] border border-[#2f3741] hover:border-[#00f0ff]/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-[#39ff14] shadow-[0_0_10px_#39ff14]' :
                    activity.type === 'warning' ? 'bg-[#ffaa00] shadow-[0_0_10px_#ffaa00]' :
                    'bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]'
                  }`} />
                  <div>
                    <p className="font-medium text-[#f0f4f8]">{activity.student}</p>
                    <p className="text-sm text-[#64748b]">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#00f0ff]">{activity.score}</p>
                  <p className="text-xs text-[#64748b]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <ClipboardCheck className="w-4 h-4" />
                Start New Evaluation
              </button>
              <button className="w-full btn-secondary flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                Add Student
              </button>
              <button className="w-full btn-secondary flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="glass-panel p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/10 rounded-full blur-3xl" />
            <h2 className="text-xl font-bold mb-4">Monthly Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#94a3b8]">Evaluations</span>
                  <span className="text-[#00f0ff] font-bold">75%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#94a3b8]">Average Score</span>
                  <span className="text-[#ff00a0] font-bold">87%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '87%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#94a3b8]">Completion Rate</span>
                  <span className="text-[#39ff14] font-bold">92%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill bg-gradient-to-r from-[#39ff14] to-[#00f0ff]" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
