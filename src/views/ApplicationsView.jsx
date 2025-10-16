import React, { useState, useContext } from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, User, Calendar, MapPin, Euro, Clock, CheckCircle, XCircle, AlertCircle, Eye, MessageSquare, Star } from 'lucide-react';

const ApplicationsView = () => {
  const { applications, candidates, jobs, currentUser } = useApp();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Simuler des candidatures plus complètes
  const mockApplications = [
    {
      id: 1,
      candidateId: 1,
      jobId: 1,
      status: 'new',
      appliedDate: '2024-01-15T10:00:00Z',
      lastUpdate: '2024-01-15T10:00:00Z',
      notes: 'Profil très intéressant, expérience solide en Python',
      rating: 4.5,
      source: 'LinkedIn',
      candidate: candidates[0],
      job: jobs[0]
    },
    {
      id: 2,
      candidateId: 2,
      jobId: 2,
      status: 'reviewed',
      appliedDate: '2024-01-14T15:30:00Z',
      lastUpdate: '2024-01-14T16:00:00Z',
      notes: 'Candidat prometteur, à contacter rapidement',
      rating: 4.2,
      source: 'Site Web',
      candidate: candidates[1],
      job: jobs[1]
    },
    {
      id: 3,
      candidateId: 3,
      jobId: 3,
      status: 'interview',
      appliedDate: '2024-01-13T09:00:00Z',
      lastUpdate: '2024-01-15T14:00:00Z',
      notes: 'Entretien programmé pour demain 14h',
      rating: 4.8,
      source: 'Cooptation',
      candidate: candidates[2],
      job: jobs[2]
    },
    {
      id: 4,
      candidateId: 4,
      jobId: 1,
      status: 'rejected',
      appliedDate: '2024-01-12T11:20:00Z',
      lastUpdate: '2024-01-14T10:00:00Z',
      notes: 'Profil ne correspond pas aux attentes',
      rating: 2.5,
      source: 'Job Board',
      candidate: candidates[3],
      job: jobs[0]
    },
    {
      id: 5,
      candidateId: 5,
      jobId: 2,
      status: 'hired',
      appliedDate: '2024-01-10T08:45:00Z',
      lastUpdate: '2024-01-16T09:00:00Z',
      notes: 'Excellent candidat, embauché !',
      rating: 5.0,
      source: 'LinkedIn',
      candidate: candidates[4],
      job: jobs[1]
    }
  ];

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'reviewed': return 'bg-yellow-100 text-yellow-700';
      case 'interview': return 'bg-purple-100 text-purple-700';
      case 'hired': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new': return 'Nouveau';
      case 'reviewed': return 'Examiné';
      case 'interview': return 'Entretien';
      case 'hired': return 'Embauché';
      case 'rejected': return 'Refusé';
      default: return 'Inconnu';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'reviewed': return <Eye className="w-4 h-4" />;
      case 'interview': return <Calendar className="w-4 h-4" />;
      case 'hired': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    // Simuler la mise à jour du statut
    console.log(`Updating application ${applicationId} to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="apple-title text-3xl sm:text-4xl lg:text-5xl text-black mb-2">
          Candidatures
        </h1>
        <p className="apple-body text-sm sm:text-base text-gray-500">
          Gérez toutes les candidatures reçues
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Nouvelles', count: mockApplications.filter(a => a.status === 'new').length, color: 'blue' },
          { label: 'Examinées', count: mockApplications.filter(a => a.status === 'reviewed').length, color: 'yellow' },
          { label: 'Entretiens', count: mockApplications.filter(a => a.status === 'interview').length, color: 'purple' },
          { label: 'Embauchés', count: mockApplications.filter(a => a.status === 'hired').length, color: 'green' },
          { label: 'Refusés', count: mockApplications.filter(a => a.status === 'rejected').length, color: 'red' }
        ].map((stat, idx) => (
          <div key={idx} className="apple-card p-4 text-center">
            <div className="text-2xl font-bold text-black mb-1">{stat.count}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="apple-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Rechercher par candidat ou poste..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full apple-input"
            />
          </div>
          
          <div className="flex gap-2">
            {['all', 'new', 'reviewed', 'interview', 'hired', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'Tous' : getStatusLabel(status)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className="apple-card p-6 hover:apple-shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              {/* Candidate Photo */}
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={application.candidate.photo}
                  alt={application.candidate.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Application Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-black mb-1">
                      {application.candidate.name}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      {application.job.title} - {application.job.company}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{application.rating}</span>
                    </div>
                    
                    {/* Status */}
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      {getStatusLabel(application.status)}
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{application.job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Euro className="w-4 h-4" />
                    <span>{application.job.salary.min/1000}k - {application.job.salary.max/1000}k</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(application.appliedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span>{application.source}</span>
                  </div>
                </div>

                {/* Notes */}
                {application.notes && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{application.notes}</p>
                  </div>
                )}

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {application.candidate.skills?.slice(0, 5).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {skill.name}
                    </span>
                  ))}
                  {application.candidate.skills?.length > 5 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      +{application.candidate.skills.length - 5}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedApplication(application)}
                    className="apple-button-primary px-4 py-2 text-sm"
                  >
                    Voir Détails
                  </button>
                  
                  <button className="apple-button-secondary px-4 py-2 text-sm">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message
                  </button>

                  {application.status === 'new' && (
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'reviewed')}
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
                    >
                      Marquer comme examiné
                    </button>
                  )}

                  {application.status === 'reviewed' && (
                    <button
                      onClick={() => updateApplicationStatus(application.id, 'interview')}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                    >
                      Programmer entretien
                    </button>
                  )}

                  {application.status === 'interview' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateApplicationStatus(application.id, 'hired')}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                      >
                        Embaucher
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(application.id, 'rejected')}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                      >
                        Refuser
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedApplication(null)}>
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full apple-shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-black">Détails de la candidature</h3>
              <button onClick={() => setSelectedApplication(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Candidate Info */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img
                    src={selectedApplication.candidate.photo}
                    alt={selectedApplication.candidate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-black">{selectedApplication.candidate.name}</h4>
                  <p className="text-gray-600">{selectedApplication.candidate.title}</p>
                  <p className="text-sm text-gray-500">{selectedApplication.candidate.location}</p>
                </div>
              </div>

              {/* Application Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Poste</label>
                  <p className="text-black">{selectedApplication.job.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Entreprise</label>
                  <p className="text-black">{selectedApplication.job.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date de candidature</label>
                  <p className="text-black">{formatDate(selectedApplication.appliedDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Source</label>
                  <p className="text-black">{selectedApplication.source}</p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-medium text-gray-500">Notes</label>
                <p className="text-black">{selectedApplication.notes}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="apple-button-primary px-6 py-3">
                  Contacter
                </button>
                <button className="apple-button-secondary px-6 py-3">
                  Voir CV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsView;
