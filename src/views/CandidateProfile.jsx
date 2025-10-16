import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, MapPin, Briefcase, Mail, Phone, Edit2, Save, Mic, Upload } from 'lucide-react';
import VoiceInput from '../components/VoiceInput';
import { parseJobDescription } from '../utils/matching';

const CandidateProfile = () => {
  const { candidates } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(candidates[0]); // Simuler le candidat connecté
  const [voiceMode, setVoiceMode] = useState(false);

  const handleVoiceTranscript = (transcript) => {
    // Parser le texte vocal pour extraire les informations du profil
    const parsed = parseJobDescription(transcript);
    
    // Mettre à jour le profil avec les infos extraites
    setProfile({
      ...profile,
      bio: transcript,
      skills: parsed.skills.map(s => ({ name: s, level: 80 })),
      experience: parsed.experience || profile.experience,
      location: parsed.location || profile.location
    });
    
    setVoiceMode(false);
  };

  const handleSave = () => {
    // Sauvegarder le profil
    alert('Profil mis à jour avec succès!');
    setIsEditing(false);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <Save className="w-5 h-5" />
              Enregistrer
            </>
          ) : (
            <>
              <Edit2 className="w-5 h-5" />
              Modifier
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="text-center">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-100"
              />
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="text-center w-full text-2xl font-bold text-gray-900 mb-2 border-b-2 border-blue-500 focus:outline-none"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h2>
              )}
              
              {isEditing ? (
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="text-center w-full text-gray-600 mb-4 border-b border-gray-300 focus:outline-none"
                />
              ) : (
                <p className="text-gray-600 mb-4">{profile.title}</p>
              )}

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="flex-1 border-b border-gray-300 focus:outline-none"
                    />
                  ) : (
                    <span>{profile.location}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="number"
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) })}
                      className="flex-1 border-b border-gray-300 focus:outline-none"
                    />
                  ) : (
                    <span>{profile.experience} ans d'expérience</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{profile.phone}</span>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6">
                  <button
                    onClick={() => setVoiceMode(!voiceMode)}
                    className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mic className="w-4 h-4" />
                    Mise à jour vocale
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mt-6">
            <h3 className="font-bold text-gray-900 mb-3">Disponibilité</h3>
            {isEditing ? (
              <input
                type="text"
                value={profile.availability}
                onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-sm text-gray-600">{profile.availability}</p>
            )}
          </div>

          {/* Salary */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mt-6">
            <h3 className="font-bold text-gray-900 mb-3">Prétentions salariales</h3>
            {isEditing ? (
              <input
                type="number"
                value={profile.salary}
                onChange={(e) => setProfile({ ...profile, salary: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-sm text-gray-600">{profile.salary.toLocaleString()}€ / an</p>
            )}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Voice Input Mode */}
          {voiceMode && (
            <div className="bg-blue-50 rounded-lg shadow-md p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Mode vocal activé</h3>
                <button
                  onClick={() => setVoiceMode(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Décrivez votre profil : "Je suis développeur Python avec 5 ans d'expérience..."
              </p>
              <div className="flex justify-center">
                <VoiceInput onTranscript={handleVoiceTranscript} />
              </div>
            </div>
          )}

          {/* Bio */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">À propos</h3>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              />
            ) : (
              <p className="text-gray-600">{profile.bio}</p>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Compétences techniques</h3>
            <div className="space-y-4">
              {profile.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {isEditing && (
              <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                + Ajouter une compétence
              </button>
            )}
          </div>

          {/* Soft Skills */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
            {isEditing && (
              <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                + Ajouter un soft skill
              </button>
            )}
          </div>

          {/* CV Upload */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">CV et documents</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Glissez-déposez votre CV ici</p>
              <p className="text-sm text-gray-500">ou cliquez pour sélectionner un fichier</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Parcourir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;

