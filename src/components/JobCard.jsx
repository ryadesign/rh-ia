import React from 'react';
import { MapPin, Briefcase, DollarSign, Calendar, Building2 } from 'lucide-react';

const JobCard = ({ job, onViewDetails, onApply, showActions = true, matchScore }) => {
  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-blue-600 bg-blue-50';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
              <p className="text-gray-600 mt-1">{job.company}</p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Briefcase className="w-4 h-4" />
              <span>{job.type} • {job.requirements.experience}+ ans d'expérience</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary.min.toLocaleString()}€ - {job.salary.max.toLocaleString()}€</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Publié le {new Date(job.postedDate).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-gray-600 line-clamp-2">{job.description}</p>

          {/* Skills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {job.requirements.skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
            {job.requirements.skills.length > 5 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                +{job.requirements.skills.length - 5}
              </span>
            )}
          </div>

          {/* Actions */}
          {showActions && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onViewDetails && onViewDetails(job)}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Voir détails
              </button>
              {onApply && (
                <button
                  onClick={() => onApply(job)}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                >
                  Postuler
                </button>
              )}
            </div>
          )}
        </div>

        {/* Match Score */}
        {matchScore !== undefined && matchScore > 0 && (
          <div className={`ml-4 flex flex-col items-center px-4 py-2 rounded-lg ${getScoreColor(matchScore)}`}>
            <div className="text-2xl font-bold">{matchScore}%</div>
            <div className="text-xs font-medium mt-1">Match</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;

