import React, { useState } from 'react';
import { MapPin, Briefcase, Star, TrendingUp, CheckCircle, MessageSquare, UserPlus, ChevronRight, Award, Clock, Volume2 } from 'lucide-react';
import MessageModal from './MessageModal';
import voiceManager from '../utils/voiceUtils';

const CandidateCard = ({ candidate, onAddToPipeline, sendMessage, isVoiceEnabled = true }) => {
  const [showMessageModal, setShowMessageModal] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 90) return 'from-green-400 to-emerald-500';
    if (score >= 75) return 'from-blue-400 to-cyan-500';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-gray-400 to-gray-500';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-50';
    if (score >= 75) return 'bg-blue-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-gray-50';
  };

  const getAvailabilityBadge = (availability) => {
    if (availability === 'immediate') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold">Disponible</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full">
        <Clock className="w-3 h-3" />
        <span className="text-xs font-medium">{availability}</span>
      </div>
    );
  };

  return (
    <>
      <div className="group bg-white rounded-3xl overflow-hidden apple-shadow-sm hover:apple-shadow-xl transition-all duration-500 border border-gray-100">
        {/* Header avec photo et score */}
        <div className="relative h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
          {/* Pattern animé */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')]"></div>
          </div>
          
          {/* Score Badge - Top Right */}
          {candidate.matchScore && (
            <div className="absolute top-4 right-4 flex flex-col items-center gap-1">
              <div className={`w-16 h-16 rounded-2xl bg-white/95 backdrop-blur-xl apple-shadow-lg flex flex-col items-center justify-center border border-white/20`}>
                <span className="text-2xl font-bold bg-gradient-to-br ${getScoreColor(candidate.matchScore)} bg-clip-text text-transparent">
                  {candidate.matchScore}
                </span>
                <span className="text-[10px] font-semibold text-gray-500">MATCH</span>
              </div>
              {candidate.matchScore >= 90 && (
                <div className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-[10px] font-bold">TOP</span>
                </div>
              )}
            </div>
          )}

          {/* Disponibilité Badge - Top Left */}
          <div className="absolute top-4 left-4">
            {getAvailabilityBadge(candidate.availability)}
          </div>
        </div>

        {/* Photo - Overlap sur le header */}
        <div className="px-6 -mt-12 relative z-10">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white apple-shadow-lg">
              <img 
                src={candidate.photo || `https://ui-avatars.com/api/?name=${candidate.name}&size=200&background=0071e3&color=fff&bold=true`}
                alt={candidate.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Verified badge */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center ring-3 ring-white">
              <CheckCircle className="w-4 h-4 text-white fill-current" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-4">
          {/* Name & Title */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-1 group-hover:text-[#0071e3] transition-colors">
              {candidate.name}
            </h3>
            <p className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {candidate.title}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-2xl">
            <div className="text-center">
              <div className="text-lg font-bold text-[#0071e3]">{candidate.experience}</div>
              <div className="text-[10px] text-gray-500 font-medium">ANS EXP.</div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="text-lg font-bold text-purple-600">{candidate.skills?.length || 0}</div>
              <div className="text-[10px] text-gray-500 font-medium">SKILLS</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{candidate.profileQuality || 95}%</div>
              <div className="text-[10px] text-gray-500 font-medium">QUALITÉ</div>
            </div>
          </div>

          {/* Location & Salary */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{candidate.location}</span>
            </div>
            {candidate.salary && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-bold">{candidate.salary.min/1000}k - {candidate.salary.max/1000}k €</span>
              </div>
            )}
          </div>

          {/* Skills - Top 3 with Pills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {candidate.skills?.slice(0, 4).map((skill, idx) => (
                <div key={idx} className="group/skill">
                  <div className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100 hover:border-blue-300 transition-all hover:scale-105">
                    {skill.name}
                    {skill.level && (
                      <span className="ml-1 opacity-60">• {skill.level}/5</span>
                    )}
                  </div>
                </div>
              ))}
              {candidate.skills?.length > 4 && (
                <div className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  +{candidate.skills.length - 4}
                </div>
              )}
            </div>
          </div>

          {/* Bio - Court extrait */}
          {candidate.bio && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {candidate.bio}
            </p>
          )}

          {/* Match Explanation */}
          {candidate.matchExplanation && (
            <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800 font-medium leading-relaxed">
                  {candidate.matchExplanation}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowMessageModal(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0071e3] hover:bg-[#0051a8] text-white rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 apple-shadow-md hover:apple-shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              Contacter
            </button>
            <button
              onClick={() => onAddToPipeline?.(candidate)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 text-[#0071e3] rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 border-2 border-[#0071e3]"
            >
              <UserPlus className="w-4 h-4" />
            </button>
            <button
              onClick={handleViewProfile}
              className="flex items-center justify-center px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 border border-gray-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {isVoiceEnabled && (
              <button
                onClick={() => voiceManager.speakProfileDetails(candidate)}
                className="flex items-center justify-center px-3 py-3 bg-white hover:bg-gray-50 text-blue-600 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 border border-blue-200"
                title="Écouter le résumé du profil"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Hover Effect - Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <MessageModal
          candidate={candidate}
          onClose={() => setShowMessageModal(false)}
          onSend={sendMessage}
        />
      )}
    </>
  );
};

export default CandidateCard;
