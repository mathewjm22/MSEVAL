import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardCheck, 
  FileText, 
  TrendingUp, 
  Settings,
  GraduationCap
} from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0c0f] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111418] border-r border-[#2f3741] flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-[#2f3741]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#ff00a0] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <GraduationCap className="w-6 h-6 text-[#0a0c0f]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">MSEVAL</h1>
              <p className="text-xs text-[#64748b]">Student Evaluation</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/students" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Users className="w-5 h-5" />
            <span>Students</span>
          </NavLink>
          
          <NavLink to="/evaluate" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <ClipboardCheck className="w-5 h-5" />
            <span>Evaluate</span>
          </NavLink>
          
          <NavLink to="/evaluations" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileText className="w-5 h-5" />
            <span>Evaluations</span>
          </NavLink>
          
          <NavLink to="/progress" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <TrendingUp className="w-5 h-5" />
            <span>Progress</span>
          </NavLink>

          <div className="neon-divider my-4" />

          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#2f3741]">
          <div className="glass-panel p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#ff00a0] flex items-center justify-center text-[#0a0c0f] font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#f0f4f8] truncate">John Doe</p>
              <p className="text-xs text-[#64748b]">Evaluator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
