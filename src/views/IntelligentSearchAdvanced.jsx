import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Upload, Sparkles, X, Filter, ChevronDown, ChevronUp, Star, TrendingUp } from 'lucide-react';
import VoiceInput from '../components/VoiceInput';
import CandidateCard from '../components/CandidateCard';
import { parseJobDescription, searchCandidates } from '../utils/matching';

const IntelligentSearchAdvanced = () => {
  const { candidates, setSearchResults, setSelectedCandidate } = useApp();
  const [searchText, setSearchText] = useState('');
  const [extractedCriteria, setExtractedCriteria] = useState(null);
  const [results, setResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Filtres avancés
  const [advancedFilters, setAdvancedFilters] = useState({
    minScore: 70,
    onlyAvailable: false,
    remoteOnly: false,
    cities: [],
    minExp: 0,
    maxExp: 20,
    salaryRange: [0, 100000],
    contract: 'all',
    profileQualityMin: 0
  });

  const handleVoiceTranscript = (transcript) => {
    setSearchText(transcript);
    handleExtractCriteria(transcript);
  };

  const handleExtractCriteria = (text) => {
    setIsProcessing(true);
    setTimeout(() => {
      const criteria = parseJobDescription(text);
      setExtractedCriteria(criteria);
      setIsProcessing(false);
    }, 500);
  };

  const handleSearch = () => {
    if (!extractedCriteria) {
      handleExtractCriteria(searchText);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      let matchedCandidates = searchCandidates(candidates, extractedCriteria);
      
      // Appliquer les filtres avancés
      matchedCandidates = applyAdvancedFilters(matchedCandidates);
      
      setResults(matchedCandidates);
      setSearchResults(matchedCandidates);
      setIsProcessing(false);
    }, 800);
  };

  const applyAdvancedFilters = (candidatesList) => {
    return candidatesList.filter(candidate => {
      // Filtre score minimum
      if (candidate.matchScore < advancedFilters.minScore) return false;
      
      // Filtre disponibilité immédiate
      if (advancedFilters.onlyAvailable && !candidate.availability?.toLowerCase().includes('immédiatement')) {
        return false;
      }
      
      // Filtre remote uniquement
      if (advancedFilters.remoteOnly && !candidate.location?.toLowerCase().includes('remote')) {
        return false;
      }
      
      // Filtre villes spécifiques
      if (advancedFilters.cities.length > 0) {
        const candidateCity = candidate.location?.toLowerCase();
        const matchesCity = advancedFilters.cities.some(city => 
          candidateCity?.includes(city.toLowerCase())
        );
        if (!matchesCity) return false;
      }
      
      // Filtre expérience
      if (candidate.experience < advancedFilters.minExp || 
          candidate.experience > advancedFilters.maxExp) {
        return false;
      }
      
      // Filtre salaire
      if (candidate.salary < advancedFilters.salaryRange[0] || 
          candidate.salary > advancedFilters.salaryRange[1]) {
        return false;
      }
      
      // Filtre qualité de profil
      if (candidate.profileQuality && 
          candidate.profileQuality.score < advancedFilters.profileQualityMin) {
        return false;
      }
      
      return true;
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setSearchText(text);
        handleExtractCriteria(text);
      };
      reader.readAsText(file);
    }
  };

  const updateCriteria = (field, value) => {
    setExtractedCriteria({
      ...extractedCriteria,
      [field]: value
    });
  };

  const addSkill = (skill) => {
    if (skill && !extractedCriteria.skills.includes(skill)) {
      updateCriteria('skills', [...extractedCriteria.skills, skill]);
    }
  };

  const removeSkill = (skillToRemove) => {
    updateCriteria('skills', extractedCriteria.skills.filter(s => s !== skillToRemove));
  };

  const frenchCities = [
    'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 
    'Lille', 'Nantes', 'Nice', 'Strasbourg', 'Montpellier'
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-500" />
          Recherche Intelligente IA
        </h1>
        <p className="text-gray-600 mt-2">
          Décrivez votre besoin et notre IA trouvera les meilleurs profils
        </p>
      </div>

      {/* Search Input Area */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
        <div className="flex gap-4 items-start">
          {/* Text Input */}
          <div className="flex-1">
            <textarea
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Ex: Je cherche un développeur Python senior, 5+ ans d'expérience, Paris, compétences Django et PostgreSQL, salaire 50-60k€..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Voice & Upload */}
          <div className="flex flex-col gap-3">
            <VoiceInput onTranscript={handleVoiceTranscript} />
            <label className="flex items-center justify-center w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer transition-colors">
              <Upload className="w-6 h-6 text-gray-700" />
              <input
                type="file"
                accept=".txt,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => handleExtractCriteria(searchText)}
            disabled={!searchText || isProcessing}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {isProcessing ? 'Analyse en cours...' : 'Analyser avec IA'}
          </button>
          {extractedCriteria && (
            <button
              onClick={handleSearch}
              disabled={isProcessing}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Trouver les candidats
            </button>
          )}
        </div>
      </div>

      {/* Extracted Criteria */}
      {extractedCriteria && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            Critères extraits par l'IA
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poste recherché
              </label>
              <input
                type="text"
                value={extractedCriteria.title}
                onChange={(e) => updateCriteria('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Développeur Python Senior"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expérience minimum (années)
              </label>
              <input
                type="number"
                value={extractedCriteria.experience}
                onChange={(e) => updateCriteria('experience', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>
              <input
                type="text"
                value={extractedCriteria.location}
                onChange={(e) => updateCriteria('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Paris, France"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compétences requises ({extractedCriteria.skills.length})
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {extractedCriteria.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Ajouter une compétence (Entrée pour valider)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addSkill(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Advanced Filters - "Affiner ma recherche" */}
      {extractedCriteria && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-6 mb-6 border border-blue-200">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <Filter className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Affiner ma recherche
                </h2>
                <p className="text-sm text-gray-600">
                  Filtres avancés pour un matching ultra-précis
                </p>
              </div>
            </div>
            {showAdvancedFilters ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {showAdvancedFilters && (
            <div className="mt-6 space-y-6">
              {/* Score minimum */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score de matching minimum: {advancedFilters.minScore}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={advancedFilters.minScore}
                  onChange={(e) => setAdvancedFilters({...advancedFilters, minScore: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Expérience */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expérience min: {advancedFilters.minExp} ans
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={advancedFilters.minExp}
                    onChange={(e) => setAdvancedFilters({...advancedFilters, minExp: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expérience max: {advancedFilters.maxExp} ans
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={advancedFilters.maxExp}
                    onChange={(e) => setAdvancedFilters({...advancedFilters, maxExp: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Salaire */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fourchette salariale: {advancedFilters.salaryRange[0].toLocaleString()}€ - {advancedFilters.salaryRange[1].toLocaleString()}€
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={advancedFilters.salaryRange[0]}
                    onChange={(e) => setAdvancedFilters({
                      ...advancedFilters, 
                      salaryRange: [parseInt(e.target.value) || 0, advancedFilters.salaryRange[1]]
                    })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={advancedFilters.salaryRange[1]}
                    onChange={(e) => setAdvancedFilters({
                      ...advancedFilters, 
                      salaryRange: [advancedFilters.salaryRange[0], parseInt(e.target.value) || 100000]
                    })}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Villes multiples */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Villes souhaitées (sélection multiple)
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {frenchCities.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        const cities = advancedFilters.cities.includes(city)
                          ? advancedFilters.cities.filter(c => c !== city)
                          : [...advancedFilters.cities, city];
                        setAdvancedFilters({...advancedFilters, cities});
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        advancedFilters.cities.includes(city)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-2 cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={advancedFilters.onlyAvailable}
                    onChange={(e) => setAdvancedFilters({...advancedFilters, onlyAvailable: e.target.checked})}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium">Disponibles immédiatement</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={advancedFilters.remoteOnly}
                    onChange={(e) => setAdvancedFilters({...advancedFilters, remoteOnly: e.target.checked})}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium">Remote uniquement</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualité de profil min: {advancedFilters.profileQualityMin}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={advancedFilters.profileQualityMin}
                    onChange={(e) => setAdvancedFilters({...advancedFilters, profileQualityMin: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Apply Filters Button */}
              <div className="flex gap-3">
                <button
                  onClick={handleSearch}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Appliquer les filtres
                </button>
                <button
                  onClick={() => setAdvancedFilters({
                    minScore: 70,
                    onlyAvailable: false,
                    remoteOnly: false,
                    cities: [],
                    minExp: 0,
                    maxExp: 20,
                    salaryRange: [0, 100000],
                    contract: 'all',
                    profileQualityMin: 0
                  })}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {results.length} profil{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
              </h2>
              <p className="text-gray-600 mt-1">
                Triés par score de matching IA
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">Score moyen: {Math.round(results.reduce((sum, c) => sum + c.matchScore, 0) / results.length)}%</span>
            </div>
          </div>

          <div className="space-y-4">
            {results.map((candidate) => (
              <div key={candidate.id} className="relative">
                {/* Badge qualité */}
                {candidate.matchScore >= 90 && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <span className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                      <Star className="w-3 h-3 fill-white" />
                      TOP MATCH
                    </span>
                  </div>
                )}
                <CandidateCard
                  candidate={candidate}
                  onViewProfile={(c) => setSelectedCandidate(c)}
                  onContact={(c) => alert(`Contacter ${c.name} : ${c.email}`)}
                  onAddToPipeline={(c) => alert(`${c.name} ajouté au pipeline`)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!extractedCriteria && !results.length && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Commencez votre recherche IA
          </h3>
          <p className="text-gray-600 mb-4">
            Décrivez le profil que vous recherchez et notre IA trouvera les meilleurs candidats
          </p>
          <div className="max-w-2xl mx-auto text-left bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold mb-2">Exemples:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• "Développeur Python senior avec Django, 5 ans d'expérience, Paris"</li>
              <li>• "Designer UX/UI avec Figma, remote, portfolio obligatoire"</li>
              <li>• "Data scientist avec machine learning et TensorFlow, 3+ ans, Lyon"</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntelligentSearchAdvanced;

