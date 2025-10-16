import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, Users, UserPlus } from 'lucide-react';
import CandidateCard from '../components/CandidateCard';
import AddCandidateModal from '../components/AddCandidateModal';

const CandidatesView = () => {
  const { candidates, setSelectedCandidate, addCandidate, sendMessage } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = !skillFilter || 
                        candidate.skills.some(s => s.name.toLowerCase().includes(skillFilter.toLowerCase()));
    
    return matchesSearch && matchesSkill;
  });

  // Extract all unique skills for filter
  const allSkills = [...new Set(candidates.flatMap(c => c.skills.map(s => s.name)))].sort();

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            Base de Candidats
          </h1>
          <p className="text-gray-600 mt-2">
            {candidates.length} candidats dans votre base de talents
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Ajouter un candidat
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex gap-4 items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par nom, poste, localisation..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Skill Filter */}
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[200px]"
          >
            <option value="">Toutes les compétences</option>
            {allSkills.slice(0, 20).map((skill) => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>

          <button className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Plus de filtres
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
          <p className="text-sm text-gray-600">Total candidats</p>
          <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
          <p className="text-sm text-gray-600">Disponibles immédiatement</p>
          <p className="text-2xl font-bold text-green-600">
            {candidates.filter(c => c.availability.includes('immédiatement')).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
          <p className="text-sm text-gray-600">Paris</p>
          <p className="text-2xl font-bold text-blue-600">
            {candidates.filter(c => c.location.includes('Paris')).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
          <p className="text-sm text-gray-600">5+ ans d'exp.</p>
          <p className="text-2xl font-bold text-purple-600">
            {candidates.filter(c => c.experience >= 5).length}
          </p>
        </div>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onViewProfile={(c) => setSelectedCandidate(c)}
            onSendMessage={(message) => sendMessage(message)}
            onAddToPipeline={(c) => alert(`${c.name} ajouté au pipeline`)}
            showActions={true}
          />
        ))}
      </div>

      {/* Add Candidate Modal */}
      {showAddModal && (
        <AddCandidateModal
          onClose={() => setShowAddModal(false)}
          onAdd={(candidate) => {
            addCandidate(candidate);
            setShowAddModal(false);
            alert(`${candidate.name} ajouté avec succès !`);
          }}
        />
      )}

      {/* Empty State */}
      {filteredCandidates.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun candidat trouvé</p>
        </div>
      )}
    </div>
  );
};

export default CandidatesView;

