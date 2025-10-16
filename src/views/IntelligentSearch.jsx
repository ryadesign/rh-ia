import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Upload, Sparkles, X } from 'lucide-react';
import VoiceInput from '../components/VoiceInput';
import CandidateCard from '../components/CandidateCard';
import { parseJobDescription, searchCandidates } from '../utils/matching';

const IntelligentSearch = () => {
  const { candidates, setSearchResults, setSelectedCandidate } = useApp();
  const [searchText, setSearchText] = useState('');
  const [extractedCriteria, setExtractedCriteria] = useState(null);
  const [results, setResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

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
      const matchedCandidates = searchCandidates(candidates, extractedCriteria);
      setResults(matchedCandidates);
      setSearchResults(matchedCandidates);
      setIsProcessing(false);
    }, 800);
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

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-500" />
          Recherche Intelligente
        </h1>
        <p className="text-gray-600 mt-2">
          Décrivez votre besoin en texte, vocal ou uploadez une fiche de poste
        </p>
      </div>

      {/* Search Input Area */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
        <div className="flex gap-4 items-start">
          {/* Text Input */}
          <div className="flex-1">
            <textarea
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Ex: Je cherche un développeur Python senior, 5+ ans d'expérience, Paris, compétences Django et PostgreSQL..."
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
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isProcessing ? 'Analyse en cours...' : 'Extraire les critères'}
          </button>
          {extractedCriteria && (
            <button
              onClick={handleSearch}
              disabled={isProcessing}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Lancer le matching
            </button>
          )}
        </div>
      </div>

      {/* Extracted Criteria */}
      {extractedCriteria && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            Critères extraits (ajustables)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Années d'expérience minimum
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

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salaire (min - max)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={extractedCriteria.salary.min}
                  onChange={(e) => updateCriteria('salary', { ...extractedCriteria.salary, min: parseInt(e.target.value) || 0 })}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={extractedCriteria.salary.max}
                  onChange={(e) => updateCriteria('salary', { ...extractedCriteria.salary, max: parseInt(e.target.value) || 0 })}
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compétences requises
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

          {/* Soft Skills */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Soft Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {extractedCriteria.softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Résultats du matching ({results.length} candidats)
            </h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                Filtrer
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                Trier
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {results.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onViewProfile={(c) => setSelectedCandidate(c)}
                onContact={(c) => alert(`Contacter ${c.name} : ${c.email}`)}
                onAddToPipeline={(c) => alert(`${c.name} ajouté au pipeline`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!extractedCriteria && !results.length && (
        <div className="text-center py-12">
          <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Commencez votre recherche
          </h3>
          <p className="text-gray-600">
            Décrivez le profil que vous recherchez et notre IA trouvera les meilleurs candidats
          </p>
        </div>
      )}
    </div>
  );
};

export default IntelligentSearch;

