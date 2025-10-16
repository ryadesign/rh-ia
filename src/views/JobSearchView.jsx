import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, SlidersHorizontal, Sparkles, Briefcase, MapPin, Clock, Euro, Loader2, Users, MessageSquare, CheckCircle, Star, Grid, List, Building2 } from 'lucide-react';
import VoiceInput from '../components/VoiceInput';
import { parseJobDescription, calculateMatch } from '../utils/matching';

const JobSearchView = () => {
  const { jobs, currentUser, applications, setApplications, messages, sendMessage } = useApp();
  
  const [searchMode, setSearchMode] = useState('text'); // 'text' ou 'filters'
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [displayMode, setDisplayMode] = useState('grid');
  const [sortBy, setSortBy] = useState('match');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  
  const [filters, setFilters] = useState({
    keywords: [],
    minSalary: 0,
    maxSalary: 150000,
    cities: [],
    contractTypes: [],
    remoteOnly: false,
    minMatchScore: 0
  });

  const cities = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille', 'Nantes', 'Nice', 'Remote'];
  const contractTypes = ['CDI', 'CDD', 'Freelance', 'Stage', 'Alternance'];

  // Fonction de recherche intelligente
  const handleSearch = async () => {
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    let filtered = [...jobs];

    if (searchMode === 'text' && searchText) {
      // Mode texte/vocal avec IA
      const parsedCriteria = parseJobDescription(searchText);
      
      filtered = jobs.map(job => {
        const matchData = calculateMatch(currentUser, job);
        return {
          ...job,
          matchScore: matchData.score,
          matchBreakdown: matchData.breakdown,
          matchExplanation: matchData.explanation
        };
      }).filter(job => job.matchScore >= filters.minMatchScore);

    } else {
      // Mode filtres
      filtered = jobs.filter(job => {
        if (filters.keywords.length > 0) {
          const jobText = `${job.title} ${job.description} ${job.requirements.skills.join(' ')}`.toLowerCase();
          const hasKeyword = filters.keywords.some(kw => jobText.includes(kw.toLowerCase()));
          if (!hasKeyword) return false;
        }
        
        if (filters.cities.length > 0 && !filters.cities.includes(job.location)) return false;
        if (filters.contractTypes.length > 0 && !filters.contractTypes.includes(job.contractType || 'CDI')) return false;
        if (filters.remoteOnly && !job.remote) return false;
        if (job.salary.min < filters.minSalary) return false;
        if (job.salary.max > filters.maxSalary) return false;
        
        return true;
      }).map(job => {
        const matchData = calculateMatch(currentUser, job);
        return {
          ...job,
          matchScore: matchData.score,
          matchBreakdown: matchData.breakdown,
          matchExplanation: matchData.explanation
        };
      });
    }

    // Tri
    if (sortBy === 'match') {
      filtered.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'salary') {
      filtered.sort((a, b) => b.salary.max - a.salary.max);
    } else if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }

    setResults(filtered);
    setIsSearching(false);
  };

  const addKeyword = (keyword) => {
    if (keyword.trim() && !filters.keywords.includes(keyword.trim())) {
      setFilters({...filters, keywords: [...filters.keywords, keyword.trim()]});
    }
  };

  const removeKeyword = (keyword) => {
    setFilters({ ...filters, keywords: filters.keywords.filter(k => k !== keyword) });
  };

  const hasApplied = (jobId) => {
    return applications.some(app => app.jobId === jobId && app.candidateId === currentUser.id);
  };

  const handleApply = (job) => {
    if (!hasApplied(job.id)) {
      setApplications([...applications, {
        id: `app-${Date.now()}`,
        jobId: job.id,
        candidateId: currentUser.id,
        status: 'pending',
        appliedDate: new Date().toISOString(),
        message: 'Candidature spontanée via la plateforme'
      }]);
    }
  };

  const openChat = (job) => {
    setSelectedJob(job);
    setShowChatModal(true);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim() && selectedJob) {
      sendMessage({
        from: currentUser.id,
        to: selectedJob.recruiter?.id || 'recruiter-1',
        subject: `Question concernant ${selectedJob.title}`,
        content: chatMessage,
        jobId: selectedJob.id
      });
      setChatMessage('');
      setShowChatModal(false);
      alert('Message envoyé au recruteur !');
    }
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="apple-title text-3xl sm:text-4xl lg:text-5xl text-[#1d1d1f] mb-2">
              Recherche d'Emploi
            </h1>
            <p className="apple-body text-sm sm:text-base text-[#86868b]">Trouvez votre prochain défi professionnel</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="apple-pill text-xs sm:text-sm">
              <span>{jobs.length} offres</span>
            </div>
            {results.length > 0 && (
              <div className="bg-[#0071e3] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full apple-shadow-md">
                <span className="text-xs sm:text-sm font-semibold text-white">{results.length} résultats</span>
              </div>
            )}
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="apple-segmented w-full sm:w-auto">
          <button
            onClick={() => setSearchMode('text')}
            className={`apple-segment flex-1 sm:flex-none ${searchMode === 'text' ? 'active' : ''}`}
          >
            <Sparkles className="w-4 h-4 inline mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Recherche IA</span>
            <span className="sm:hidden">IA</span>
          </button>
          <button
            onClick={() => setSearchMode('filters')}
            className={`apple-segment flex-1 sm:flex-none ${searchMode === 'filters' ? 'active' : ''}`}
          >
            <SlidersHorizontal className="w-4 h-4 inline mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Filtres</span>
            <span className="sm:hidden">Filtres</span>
          </button>
        </div>
      </div>

      {/* Search Interface */}
      <div className="apple-card p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
        {searchMode === 'text' ? (
          // MODE TEXTE/VOCAL
          <div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Ex: Développeur Backend Python, Paris, Remote..."
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 apple-input text-sm sm:text-base"
                />
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <VoiceInput onTranscript={(text) => {
                  setSearchText(text);
                  setTimeout(() => handleSearch(), 500);
                }} />
              </div>
            </div>

            {/* Quick filters */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Match min:</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.minMatchScore}
                  onChange={(e) => setFilters({...filters, minMatchScore: parseInt(e.target.value)})}
                  className="flex-1 sm:w-32"
                />
                <span className="text-xs sm:text-sm font-semibold text-[#0071e3] whitespace-nowrap">{filters.minMatchScore}%</span>
              </div>
              <label className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black/5 rounded-xl cursor-pointer hover:bg-black/10 transition-colors active:scale-95">
                <input
                  type="checkbox"
                  checked={filters.remoteOnly}
                  onChange={(e) => setFilters({...filters, remoteOnly: e.target.checked})}
                  className="w-4 h-4 accent-[#0071e3] rounded"
                />
                <span className="text-xs sm:text-sm font-medium">Remote</span>
              </label>
            </div>
          </div>
        ) : (
          // MODE FILTRES
          <div className="space-y-4 sm:space-y-6">
            {/* Mots-clés */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-[#1d1d1f] mb-3">Mots-clés</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {filters.keywords.map((keyword, idx) => (
                  <span key={idx} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0071e3] text-white rounded-full text-xs sm:text-sm font-medium flex items-center gap-2">
                    {keyword}
                    <button onClick={() => removeKeyword(keyword)} className="hover:bg-white/20 rounded-full p-0.5">✕</button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Ajouter un mot-clé..."
                className="apple-input w-full text-sm sm:text-base"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addKeyword(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Salaire */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1d1d1f] mb-3">
                  Salaire: {filters.minSalary}k - {filters.maxSalary}k €
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={filters.minSalary / 1000}
                    onChange={(e) => setFilters({...filters, minSalary: parseInt(e.target.value) * 1000})}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={filters.maxSalary / 1000}
                    onChange={(e) => setFilters({...filters, maxSalary: parseInt(e.target.value) * 1000})}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Type de contrat */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[#1d1d1f] mb-3">Type de contrat</label>
                <div className="flex flex-wrap gap-2">
                  {contractTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        const newTypes = filters.contractTypes.includes(type)
                          ? filters.contractTypes.filter(t => t !== type)
                          : [...filters.contractTypes, type];
                        setFilters({...filters, contractTypes: newTypes});
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        filters.contractTypes.includes(type)
                          ? 'bg-[#0071e3] text-white apple-shadow-md'
                          : 'bg-black/5 text-[#1d1d1f] hover:bg-black/10'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Localisation */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-[#1d1d1f] mb-3">Localisation</label>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => {
                      const newCities = filters.cities.includes(city)
                        ? filters.cities.filter(c => c !== city)
                        : [...filters.cities, city];
                      setFilters({...filters, cities: newCities});
                    }}
                    className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      filters.cities.includes(city)
                        ? 'bg-[#0071e3] text-white apple-shadow-md'
                        : 'bg-black/5 text-[#1d1d1f] hover:bg-black/10'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Remote toggle */}
            <label className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-[#0071e3]/10 rounded-2xl cursor-pointer hover:bg-[#0071e3]/15 transition-all active:scale-95">
              <input
                type="checkbox"
                checked={filters.remoteOnly}
                onChange={(e) => setFilters({...filters, remoteOnly: e.target.checked})}
                className="w-4 h-4 sm:w-5 sm:h-5 accent-[#0071e3] rounded"
              />
              <span className="text-xs sm:text-sm font-medium text-[#1d1d1f]">Remote uniquement</span>
            </label>
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isSearching || (searchMode === 'text' && !searchText)}
          className="apple-button-primary w-full mt-6 sm:mt-8 py-3 sm:py-4 text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-40"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span className="hidden sm:inline">Recherche en cours...</span>
              <span className="sm:hidden">Recherche...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              Rechercher
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && !isSearching ? (
        <div>
          {/* Results Header */}
          <div className="apple-card p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1d1d1f] mb-1">
                  {results.length} offre{results.length > 1 ? 's' : ''} trouvée{results.length > 1 ? 's' : ''}
                </h2>
                <p className="apple-caption text-xs sm:text-sm">
                  Match moyen: <span className="font-semibold text-[#0071e3]">{Math.round(results.reduce((sum, j) => sum + j.matchScore, 0) / results.length)}%</span>
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 sm:flex-none apple-input py-2 text-xs sm:text-sm"
                >
                  <option value="match">Meilleur match</option>
                  <option value="salary">Salaire</option>
                  <option value="date">Date</option>
                </select>

                <div className="apple-segmented p-0.5">
                  <button
                    onClick={() => setDisplayMode('grid')}
                    className={`p-1.5 sm:p-2 rounded-lg transition-all ${displayMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                  >
                    <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setDisplayMode('list')}
                    className={`p-1.5 sm:p-2 rounded-lg transition-all ${displayMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                  >
                    <List className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className={displayMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6' : 'space-y-4'}>
            {results.map((job) => (
              <div key={job.id} className="apple-card p-4 sm:p-6 hover:apple-shadow-lg transition-all duration-300 group relative">
                {/* Match Badge */}
                {job.matchScore >= 85 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold apple-shadow-md animate-pulse">
                    <Star className="w-3 h-3 inline mr-1" />
                    Top Match
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] mb-2 group-hover:text-[#0071e3] transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchColor(job.matchScore)}`}>
                    {job.matchScore}%
                  </div>
                </div>

                {/* Infos */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Euro className="w-4 h-4" />
                    <span>{job.salary.min/1000}k - {job.salary.max/1000}k</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{job.contractType || 'CDI'}</span>
                  </div>
                  {job.remote && (
                    <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                      <span>🌍 Remote</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements.skills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                  {job.requirements.skills.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                      +{job.requirements.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Recruteur */}
                {job.recruiter && (
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {job.recruiter.name?.charAt(0) || 'R'}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Recruteur en charge</p>
                      <p className="text-sm font-semibold text-gray-900">{job.recruiter.name || 'Équipe RH'}</p>
                    </div>
                    <button
                      onClick={() => openChat(job)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                      title="Contacter le recruteur"
                    >
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </button>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {hasApplied(job.id) ? (
                    <button
                      disabled
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-xl font-medium text-sm"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Candidature envoyée
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(job)}
                      className="flex-1 apple-button-primary py-3 text-sm"
                    >
                      Postuler
                    </button>
                  )}
                  <button
                    onClick={() => openChat(job)}
                    className="apple-button-secondary px-4 py-3"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : !isSearching && searchText === '' && results.length === 0 ? (
        // Empty state
        <div className="apple-card p-8 sm:p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="apple-subtitle mb-2">Commencez votre recherche</h3>
          <p className="apple-body text-gray-500 mb-6">
            Utilisez la recherche intelligente ou les filtres pour trouver votre prochain emploi
          </p>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <p>💡 <strong>Exemples de recherche :</strong></p>
            <p>"Développeur Full Stack, Paris, React"</p>
            <p>"Data Scientist remote Python"</p>
            <p>"Chef de projet digital Bordeaux"</p>
          </div>
        </div>
      ) : null}

      {/* Chat Modal */}
      {showChatModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowChatModal(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full apple-shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#1d1d1f]">Contacter le recruteur</h3>
                <p className="text-sm text-gray-500">{selectedJob.title} - {selectedJob.company}</p>
              </div>
              <button onClick={() => setShowChatModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            {selectedJob.recruiter && (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedJob.recruiter.name?.charAt(0) || 'R'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedJob.recruiter.name || 'Équipe RH'}</p>
                  <p className="text-sm text-gray-500">{selectedJob.recruiter.email || 'recrutement@company.com'}</p>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Votre message</label>
              <textarea
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Bonjour, je suis intéressé(e) par cette offre..."
                className="w-full h-32 px-4 py-3 apple-input resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">{chatMessage.length} caractères</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowChatModal(false)}
                className="flex-1 apple-button-secondary py-3"
              >
                Annuler
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="flex-1 apple-button-primary py-3 disabled:opacity-40"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearchView;
