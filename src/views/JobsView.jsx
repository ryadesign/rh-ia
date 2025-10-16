import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Search, Filter } from 'lucide-react';
import JobCard from '../components/JobCard';

const JobsView = () => {
  const { jobs } = useApp();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'all' || job.status === filter;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openJobs = jobs.filter(j => j.status === 'open').length;
  const closedJobs = jobs.filter(j => j.status === 'closed').length;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Offres</h1>
          <p className="text-gray-600 mt-2">
            {openJobs} offres actives • {closedJobs} archivées
          </p>
        </div>
        <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-md">
          <Plus className="w-5 h-5" />
          Créer une offre
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
              placeholder="Rechercher une offre..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="all">Toutes les offres</option>
            <option value="open">Offres actives</option>
            <option value="closed">Offres archivées</option>
          </select>

          <button className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtres avancés
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onViewDetails={(j) => console.log('View job', j)}
            showActions={true}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">Aucune offre trouvée</p>
        </div>
      )}
    </div>
  );
};

export default JobsView;

