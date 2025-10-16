import React, { createContext, useContext, useState } from 'react';
import { mockCandidates, mockJobs, mockApplications } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [jobs] = useState(mockJobs);
  const [applications, setApplications] = useState(mockApplications);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({ type: 'recruiter', id: 1 }); // 'recruiter' or 'candidate'
  const [searchResults, setSearchResults] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Ajouter une candidature
  const addApplication = (candidateId, jobId) => {
    const newApplication = {
      id: applications.length + 1,
      candidateId,
      jobId,
      status: 'new',
      appliedDate: new Date().toISOString().split('T')[0],
      notes: ''
    };
    setApplications([...applications, newApplication]);
    return newApplication;
  };

  // Mettre à jour le statut d'une candidature
  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  // Ajouter une note à une candidature
  const addApplicationNote = (applicationId, note) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, notes: note } : app
    ));
  };

  // Ajouter un candidat
  const addCandidate = (candidate) => {
    setCandidates([...candidates, candidate]);
  };

  // Envoyer un message
  const sendMessage = (message) => {
    setMessages([...messages, { ...message, id: Date.now() }]);
  };

  const value = {
    candidates,
    jobs,
    applications,
    messages,
    currentUser,
    setCurrentUser,
    searchResults,
    setSearchResults,
    selectedJob,
    setSelectedJob,
    selectedCandidate,
    setSelectedCandidate,
    addApplication,
    updateApplicationStatus,
    addApplicationNote,
    addCandidate,
    sendMessage
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

