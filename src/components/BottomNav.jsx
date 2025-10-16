import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Briefcase, 
  Users, 
  BarChart3, 
  User,
  MessageSquare
} from 'lucide-react';

const BottomNav = ({ currentView, onViewChange, userType }) => {
  const recruiterMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search', label: 'Recherche', icon: Search },
    { id: 'candidates', label: 'Candidats', icon: Users },
    { id: 'analytics', label: 'Stats', icon: BarChart3 },
  ];

  const candidateMenuItems = [
    { id: 'candidate-dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'job-search', label: 'Offres', icon: Search },
    { id: 'candidate-profile', label: 'Profil', icon: User },
  ];

  const menuItems = userType === 'recruiter' ? recruiterMenuItems : candidateMenuItems;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Backdrop Blur Effect */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50"></div>
      
      {/* Navigation */}
      <nav className="relative px-2 py-2 safe-area-bottom">
        <div className="flex items-center justify-around">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className="relative flex flex-col items-center gap-1 px-4 py-2 min-w-[70px] group"
              >
                {/* Active Indicator - Top bar */}
                {isActive && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#0071e3] rounded-full"></div>
                )}
                
                {/* Icon Container with Animation */}
                <div className={`relative transition-all duration-300 ${
                  isActive ? 'scale-110' : 'scale-100 group-active:scale-95'
                }`}>
                  {/* Background Glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#0071e3] opacity-10 rounded-2xl blur-xl"></div>
                  )}
                  
                  {/* Icon Background */}
                  <div className={`relative p-2 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#0071e3]' 
                      : 'bg-transparent group-active:bg-gray-100'
                  }`}>
                    <Icon 
                      className={`w-6 h-6 transition-all duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-500 group-active:text-gray-700'
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                </div>
                
                {/* Label */}
                <span className={`text-[11px] font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'text-[#0071e3]' 
                    : 'text-gray-500'
                }`}>
                  {item.label}
                </span>

                {/* Ripple Effect on Touch */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gray-400 opacity-0 group-active:opacity-10 transition-opacity duration-150"></div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
