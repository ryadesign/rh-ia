import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Mic, Filter, SlidersHorizontal, Sparkles, Loader2, TrendingUp, Grid, List, Star, Zap, Volume2, VolumeX } from 'lucide-react';
import VoiceInput from '../components/VoiceInput';
import CandidateCard from '../components/CandidateCard';
import { parseJobDescription, searchCandidates } from '../utils/matching';
import voiceManager from '../utils/voiceUtils';

const SmartSearch = () => {
  const { candidates, setSearchResults, setSelectedCandidate, sendMessage } = useApp();
  const [searchMode, setSearchMode] = useState('text'); // 'text' or 'filters'
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [displayMode, setDisplayMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('score'); // 'score', 'experience', 'availability'
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  
  // Filtres
  const [filters, setFilters] = useState({
    skills: [],
    minExperience: 0,
    maxExperience: 20,
    location: '',
    cities: [],
    minSalary: 0,
    maxSalary: 150000,
    minScore: 70,
    availableNow: false,
    remoteOnly: false
  });

  const handleSearch = async () => {
    setIsSearching(true);
    
    // 🎤 Annoncer le début de la recherche
    if (isVoiceEnabled) {
      voiceManager.speakSearchStart();
    }
    
    // Simuler recherche IA
    await new Promise(resolve => setTimeout(resolve, 1500));

    let criteria;
    if (searchMode === 'text') {
      criteria = parseJobDescription(searchText);
    } else {
      criteria = {
        skills: filters.skills,
        experience: filters.minExperience,
        location: filters.location,
        salary: { min: filters.minSalary, max: filters.maxSalary }
      };
    }

    let matchedCandidates = searchCandidates(candidates, criteria);
    
    // Appliquer filtres additionnels
    matchedCandidates = matchedCandidates.filter(c => {
      if (c.matchScore < filters.minScore) return false;
      if (filters.availableNow && !c.availability?.toLowerCase().includes('immédiatement')) return false;
      if (filters.remoteOnly && !c.location?.toLowerCase().includes('remote')) return false;
      if (c.experience < filters.minExperience || c.experience > filters.maxExperience) return false;
      if (filters.cities.length > 0) {
        const match = filters.cities.some(city => c.location?.toLowerCase().includes(city.toLowerCase()));
        if (!match) return false;
      }
      return true;
    });

    // Tri
    if (sortBy === 'score') {
      matchedCandidates.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'experience') {
      matchedCandidates.sort((a, b) => b.experience - a.experience);
    }

    setResults(matchedCandidates);
    setSearchResults(matchedCandidates);
    setIsSearching(false);
    
    // 🎤 Annoncer la fin de la recherche
    if (isVoiceEnabled) {
      voiceManager.speakSearchComplete(matchedCandidates.length);
    }
  };

  const addSkill = (skill) => {
    if (skill && !filters.skills.includes(skill)) {
      setFilters({ ...filters, skills: [...filters.skills, skill] });
    }
  };

  const removeSkill = (skill) => {
    setFilters({ ...filters, skills: filters.skills.filter(s => s !== skill) });
  };

  const cities = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille', 'Nantes', 'Nice'];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header - Apple Style - Responsive */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="apple-title text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-2">
              Recherche Intelligente
            </h1>
            <p className="apple-body text-sm sm:text-base text-gray-600">Trouvez les meilleurs talents avec l'IA</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="apple-pill text-xs sm:text-sm">
              <span>{candidates.length} candidats</span>
            </div>
            {results.length > 0 && (
              <div className="bg-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full apple-shadow-md">
                <span className="text-xs sm:text-sm font-semibold text-white">{results.length} résultats</span>
              </div>
            )}
          </div>
        </div>

        {/* Mode Switcher - Apple Segmented Control - Responsive */}
        <div className="apple-segmented w-full sm:w-auto">
          <button
            onClick={() => setSearchMode('text')}
            className={`apple-segment flex-1 sm:flex-none ${searchMode === 'text' ? 'active' : ''}`}
          >
            <Sparkles className="w-4 h-4 inline mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Recherche Texte</span>
            <span className="sm:hidden">Texte</span>
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

      {/* Search Interface - Apple Card */}
      <div className="apple-card p-8 mb-8">
        {searchMode === 'text' ? (
          // === MODE TEXTE/VOCAL ===
          <div>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Ex: Développeur Python senior, 5+ ans, Paris, Django..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <VoiceInput onTranscript={(text) => {
                  setSearchText(text);
                  setTimeout(() => handleSearch(), 500);
                }} />
              </div>
            </div>

            {/* Quick filters même en mode texte - Responsive */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Score min:</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.minScore}
                  onChange={(e) => setFilters({...filters, minScore: parseInt(e.target.value)})}
                  className="flex-1 sm:w-32"
                />
                <span className="text-xs sm:text-sm font-semibold text-black whitespace-nowrap">{filters.minScore}%</span>
              </div>
              <label className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black/5 rounded-xl cursor-pointer hover:bg-black/10 transition-colors active:scale-95">
                <input
                  type="checkbox"
                  checked={filters.availableNow}
                  onChange={(e) => setFilters({...filters, availableNow: e.target.checked})}
                  className="w-4 h-4 accent-black rounded"
                />
                <span className="text-xs sm:text-sm font-medium">Disponibles</span>
              </label>
              <label className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black/5 rounded-xl cursor-pointer hover:bg-black/10 transition-colors active:scale-95">
                <input
                  type="checkbox"
                  checked={filters.remoteOnly}
                  onChange={(e) => setFilters({...filters, remoteOnly: e.target.checked})}
                  className="w-4 h-4 accent-black rounded"
                />
                <span className="text-xs sm:text-sm font-medium">Remote</span>
              </label>
            </div>
          </div>
        ) : (
          // === MODE FILTRES - Responsive ===
          <div className="space-y-4 sm:space-y-6">
            {/* Compétences */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-[#1d1d1f] mb-3">Compétences requises</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {filters.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0071e3] text-white rounded-full text-xs sm:text-sm font-medium flex items-center gap-2">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="hover:bg-white/20 rounded-full p-0.5">✕</button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Ajouter une compétence..."
                className="apple-input w-full text-sm sm:text-base"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addSkill(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Expérience */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Expérience: {filters.minExperience}-{filters.maxExperience} ans
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={filters.minExperience}
                    onChange={(e) => setFilters({...filters, minExperience: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gradient-to-r from-blue-200 to-blue-500 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={filters.maxExperience}
                    onChange={(e) => setFilters({...filters, maxExperience: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gradient-to-r from-purple-200 to-purple-500 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Salaire */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Salaire: {filters.minSalary.toLocaleString()}€ - {filters.maxSalary.toLocaleString()}€
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={filters.minSalary}
                    onChange={(e) => setFilters({...filters, minSalary: parseInt(e.target.value) || 0})}
                    className="w-1/2 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  />
                  <input
                    type="number"
                    value={filters.maxSalary}
                    onChange={(e) => setFilters({...filters, maxSalary: parseInt(e.target.value) || 150000})}
                    className="w-1/2 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Score minimum */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Score minimum: {filters.minScore}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.minScore}
                  onChange={(e) => setFilters({...filters, minScore: parseInt(e.target.value)})}
                  className="w-full h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Villes - Responsive */}
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
                    className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                      filters.cities.includes(city)
                        ? 'bg-[#0071e3] text-white apple-shadow-md'
                        : 'bg-black/5 text-[#1d1d1f] hover:bg-black/10 active:scale-95'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles - Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <label className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-[#34c759]/10 rounded-2xl cursor-pointer hover:bg-[#34c759]/15 transition-all active:scale-95">
                <input
                  type="checkbox"
                  checked={filters.availableNow}
                  onChange={(e) => setFilters({...filters, availableNow: e.target.checked})}
                  className="w-4 h-4 sm:w-5 sm:h-5 accent-[#34c759] rounded"
                />
                <span className="text-xs sm:text-sm font-medium text-[#1d1d1f]">Disponibles immédiatement</span>
              </label>
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
          </div>
        )}

        {/* Search Button - Apple Style - Responsive */}
        <button
          onClick={handleSearch}
          disabled={isSearching || (searchMode === 'text' && !searchText)}
          className="apple-button-primary w-full mt-6 sm:mt-8 py-3 sm:py-4 text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-40"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span className="hidden sm:inline">Analyse en cours...</span>
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
      {results.length > 0 && !isSearching && (
        <div>
          {/* Results Header - Apple Style - Responsive */}
          <div className="apple-card p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1d1d1f] mb-1">
                  {results.length} profil{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
                </h2>
                <p className="apple-caption text-xs sm:text-sm">
                  Score moyen: <span className="font-semibold text-[#0071e3]">{Math.round(results.reduce((sum, c) => sum + c.matchScore, 0) / results.length)}%</span>
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    handleSearch();
                  }}
                  className="flex-1 sm:flex-none apple-input py-2 text-xs sm:text-sm"
                >
                  <option value="score">Meilleur score</option>
                  <option value="experience">Expérience</option>
                  <option value="availability">Disponibilité</option>
                </select>

                {/* View mode */}
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

          {/* Results Grid/List - Responsive */}
          <div className={displayMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4'}>
            {results.map((candidate) => (
              <div key={candidate.id} className="relative group">
                {candidate.matchScore >= 90 && (
                  <div className="absolute -top-3 -right-3 z-10 animate-bounce">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      TOP MATCH
                    </div>
                  </div>
                )}
                <div className="transform transition-all duration-300 group-hover:scale-[1.02]">
                  <CandidateCard
                    candidate={candidate}
                    onViewProfile={(c) => setSelectedCandidate(c)}
                    onSendMessage={(message) => sendMessage(message)}
                    onAddToPipeline={(c) => alert(`${c.name} ajouté au pipeline`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state - Apple Style */}
      {results.length === 0 && !isSearching && (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto mb-6 bg-[#0071e3]/10 rounded-full flex items-center justify-center">
            <Search className="w-16 h-16 text-[#0071e3]" />
          </div>
          <h3 className="apple-subtitle mb-3">Prêt à trouver le talent parfait ?</h3>
          <p className="apple-body text-[#86868b] mb-6">Utilisez la recherche texte ou les filtres</p>
          <div className="max-w-md mx-auto apple-card p-6">
            <p className="text-sm font-semibold text-[#1d1d1f] mb-3">Exemples de recherche :</p>
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-start gap-2">
                <span className="text-[#0071e3] font-semibold">•</span>
                <span className="text-[#86868b]">"Développeur Python senior 5 ans Paris"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#0071e3] font-semibold">•</span>
                <span className="text-[#86868b]">"Designer UX/UI Figma remote"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#0071e3] font-semibold">•</span>
                <span className="text-[#86868b]">"Data scientist machine learning Lyon"</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;

