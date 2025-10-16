import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import Dashboard from './views/Dashboard';
import SmartSearch from './views/SmartSearch';
import JobsView from './views/JobsView';
import CandidatesView from './views/CandidatesView';
import AnalyticsModern from './views/AnalyticsModern';
import CandidateDashboard from './views/CandidateDashboard';
import CandidateProfile from './views/CandidateProfile';
import CandidateJobSearch from './views/CandidateJobSearch';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userType, setUserType] = useState('recruiter'); // 'recruiter' or 'candidate'

  const handleUserTypeChange = () => {
    setUserType(userType === 'recruiter' ? 'candidate' : 'recruiter');
    setCurrentView(userType === 'recruiter' ? 'candidate-dashboard' : 'dashboard');
  };

  const renderView = () => {
    switch (currentView) {
      // Recruiter views
      case 'dashboard':
        return <Dashboard />;
      case 'search':
        return <SmartSearch />;
      case 'jobs':
        return <JobsView />;
      case 'candidates':
        return <CandidatesView />;
      case 'analytics':
        return <AnalyticsModern />;
      
      // Candidate views
      case 'candidate-dashboard':
        return <CandidateDashboard />;
      case 'candidate-profile':
        return <CandidateProfile />;
      case 'job-search':
        return <CandidateJobSearch />;
      
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="flex h-screen bg-[#f5f5f7]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            currentView={currentView}
            onViewChange={setCurrentView}
            userType={userType}
            onUserTypeChange={handleUserTypeChange}
          />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav
          currentView={currentView}
          onViewChange={setCurrentView}
          userType={userType}
        />
      </div>
    </AppProvider>
  );
}

export default App;

