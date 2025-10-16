import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Briefcase, 
  Users, 
  BarChart3, 
  User,
  LogOut
} from 'lucide-react';

const Sidebar = ({ currentView, onViewChange, userType, onUserTypeChange }) => {
  const recruiterMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search', label: 'Recherche', icon: Search },
    { id: 'jobs', label: 'Offres', icon: Briefcase },
    { id: 'candidates', label: 'Candidats', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const candidateMenuItems = [
    { id: 'candidate-dashboard', label: 'Mon Dashboard', icon: LayoutDashboard },
    { id: 'candidate-profile', label: 'Mon Profil', icon: User },
    { id: 'job-search', label: 'Offres', icon: Search },
  ];

  const menuItems = userType === 'recruiter' ? recruiterMenuItems : candidateMenuItems;

  return (
    <div className="w-20 sm:w-24 lg:w-72 glass-effect border-r border-black/5 h-screen flex flex-col">
      {/* Logo - Apple Style - Responsive */}
      <div className="p-3 sm:p-4 lg:p-6 border-b border-black/5">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0071e3] mb-1">
          <span className="hidden lg:inline">RHiQ</span>
          <span className="lg:hidden">RQ</span>
        </h1>
        <p className="apple-caption text-xs hidden lg:block">Recrutement Intelligent</p>
      </div>

      {/* Menu - Apple Style - Responsive */}
      <nav className="flex-1 p-2 sm:p-3 lg:p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              title={item.label}
              className={`w-full flex items-center justify-center lg:justify-start gap-3 px-2 sm:px-3 lg:px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#0071e3] text-white apple-shadow-md'
                  : 'text-gray-700 hover:bg-black/5 active:scale-95'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={isActive ? 2.5 : 2} />
              <span className="font-medium text-[15px] tracking-tight hidden lg:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Type Toggle - Apple Style - Responsive */}
      <div className="p-2 sm:p-3 lg:p-4 border-t border-black/5">
        <button
          onClick={onUserTypeChange}
          title={userType === 'recruiter' ? 'Mode Candidat' : 'Mode Recruteur'}
          className="w-full flex items-center justify-center lg:justify-center gap-2 px-2 sm:px-3 lg:px-4 py-3 rounded-full bg-black/5 hover:bg-black/10 active:scale-95 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 text-gray-700 flex-shrink-0" />
          <span className="font-medium text-[15px] text-gray-700 tracking-tight hidden lg:inline">
            {userType === 'recruiter' ? 'Mode Candidat' : 'Mode Recruteur'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

