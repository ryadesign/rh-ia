import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, Users, TrendingUp, CheckCircle, Clock, UserCheck, Volume2, VolumeX } from 'lucide-react';
import voiceManager from '../utils/voiceUtils';

const Dashboard = () => {
  const { jobs, candidates, applications, userType } = useApp();
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

  // 🎤 Message de bienvenue au chargement
  useEffect(() => {
    if (isVoiceEnabled) {
      setTimeout(() => {
        voiceManager.speakWelcome(userType);
      }, 1000);
    }
  }, [userType, isVoiceEnabled]);

  const openJobs = jobs.filter(j => j.status === 'open').length;
  const totalCandidates = candidates.length;
  const activeApplications = applications.length;
  const hiredCount = applications.filter(a => a.status === 'hired').length;

  const stats = [
    {
      label: 'Postes ouverts',
      value: openJobs,
      icon: Briefcase,
      color: 'bg-blue-500',
      change: '+2 ce mois'
    },
    {
      label: 'Candidats',
      value: totalCandidates,
      icon: Users,
      color: 'bg-green-500',
      change: '+12 cette semaine'
    },
    {
      label: 'Candidatures actives',
      value: activeApplications,
      icon: Clock,
      color: 'bg-yellow-500',
      change: 'En cours'
    },
    {
      label: 'Embauches',
      value: hiredCount,
      icon: UserCheck,
      color: 'bg-purple-500',
      change: 'Ce mois'
    }
  ];

  const recentApplications = applications.slice(0, 5).map(app => {
    const candidate = candidates.find(c => c.id === app.candidateId);
    const job = jobs.find(j => j.id === app.jobId);
    return { ...app, candidate, job };
  });

  const getStatusBadge = (status) => {
    const badges = {
      new: { label: 'Nouveau', color: 'bg-blue-100 text-blue-800' },
      screening: { label: 'Présélection', color: 'bg-yellow-100 text-yellow-800' },
      interview: { label: 'Entretien', color: 'bg-purple-100 text-purple-800' },
      offer: { label: 'Offre', color: 'bg-green-100 text-green-800' },
      hired: { label: 'Embauché', color: 'bg-green-500 text-white' },
      rejected: { label: 'Refusé', color: 'bg-red-100 text-red-800' }
    };
    return badges[status] || badges.new;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Recruteur</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble de votre activité de recrutement</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Candidatures récentes</h2>
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img
                  src={app.candidate?.photo}
                  alt={app.candidate?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{app.candidate?.name}</p>
                  <p className="text-sm text-gray-600">{app.job?.title}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(app.status).color}`}>
                  {getStatusBadge(app.status).label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Jobs */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Postes les plus actifs</h2>
          <div className="space-y-4">
            {jobs.filter(j => j.status === 'open').slice(0, 5).map((job) => {
              const jobApplications = applications.filter(a => a.jobId === job.id).length;
              return (
                <div key={job.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{job.title}</p>
                    <span className="text-sm text-gray-600">{jobApplications} candidatures</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{job.company}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Prêt à recruter ?</h2>
        <p className="mb-4 opacity-90">Utilisez notre recherche intelligente pour trouver les meilleurs talents</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Lancer une recherche
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

