import React from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import JobCard from '../components/JobCard';
import { calculateMatch } from '../utils/matching';

const CandidateDashboard = () => {
  const { jobs, candidates, applications, currentUser } = useApp();
  
  // Simuler le profil du candidat connecté (premier candidat pour la démo)
  const currentCandidate = candidates[0];
  
  // Candidatures du candidat
  const myApplications = applications.filter(a => a.candidateId === currentCandidate.id);
  
  // Matching inversé : trouver les offres qui matchent avec le candidat
  const recommendedJobs = jobs
    .filter(j => j.status === 'open')
    .map(job => {
      const match = calculateMatch(currentCandidate, job);
      return {
        ...job,
        matchScore: match.score,
        matchExplanation: match.explanation
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);

  const stats = [
    {
      label: 'Candidatures envoyées',
      value: myApplications.length,
      icon: Briefcase,
      color: 'bg-blue-500'
    },
    {
      label: 'Profil vu',
      value: '24 fois',
      icon: Eye,
      color: 'bg-green-500'
    },
    {
      label: 'Messages',
      value: '3 nouveaux',
      icon: MessageSquare,
      color: 'bg-purple-500'
    },
    {
      label: 'Taux de match moyen',
      value: '78%',
      icon: TrendingUp,
      color: 'bg-yellow-500'
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      new: { label: 'Nouveau', color: 'bg-blue-100 text-blue-800' },
      screening: { label: 'En cours', color: 'bg-yellow-100 text-yellow-800' },
      interview: { label: 'Entretien', color: 'bg-purple-100 text-purple-800' },
      offer: { label: 'Offre reçue', color: 'bg-green-100 text-green-800' },
      hired: { label: 'Accepté', color: 'bg-green-500 text-white' },
      rejected: { label: 'Refusé', color: 'bg-red-100 text-red-800' }
    };
    return badges[status] || badges.new;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bienvenue, {currentCandidate.name}!</h1>
        <p className="text-gray-600 mt-2">Voici vos opportunités du jour</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended Jobs */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Offres recommandées pour vous</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Voir toutes →
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              matchScore={job.matchScore}
              onViewDetails={(j) => console.log('View job', j)}
              onApply={(j) => alert(`Candidature envoyée pour ${j.title}!`)}
              showActions={true}
            />
          ))}
        </div>
      </div>

      {/* My Applications */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Mes candidatures</h2>
        {myApplications.length > 0 ? (
          <div className="space-y-4">
            {myApplications.map((app) => {
              const job = jobs.find(j => j.id === app.jobId);
              return (
                <div key={app.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{job?.title}</p>
                    <p className="text-sm text-gray-600">{job?.company} • {job?.location}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Candidature envoyée le {new Date(app.appliedDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(app.status).color}`}>
                    {getStatusBadge(app.status).label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Vous n'avez pas encore de candidatures</p>
            <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
              Découvrir les offres
            </button>
          </div>
        )}
      </div>

      {/* Profile Completion */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Complétez votre profil</h3>
            <p className="opacity-90">Un profil complet augmente vos chances de 3x</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold mb-1">85%</div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
              Compléter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;

