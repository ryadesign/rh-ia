import React, { useState } from 'react';
import { X, UserPlus, Mail, Phone, MapPin, Briefcase, Plus, Check } from 'lucide-react';

const AddCandidateModal = ({ onClose, onAdd }) => {
  const [step, setStep] = useState(1); // 1: Info, 2: Skills, 3: Success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    location: '',
    experience: 0,
    skills: [],
    availability: 'Disponible immédiatement'
  });
  const [currentSkill, setCurrentSkill] = useState('');

  const handleAddSkill = () => {
    if (currentSkill && !formData.skills.includes(currentSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, currentSkill]
      });
      setCurrentSkill('');
    }
  };

  const handleSubmit = () => {
    const newCandidate = {
      id: Date.now(),
      ...formData,
      photo: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      skills: formData.skills.map(s => ({ name: s, level: 75 })),
      softSkills: ['Communication', 'Travail d\'équipe'],
      bio: `Profil ajouté manuellement`,
      salary: 45000
    };

    if (onAdd) {
      onAdd(newCandidate);
    }

    setStep(3);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const isStep1Valid = formData.name && formData.email && formData.phone && formData.title;
  const isStep2Valid = formData.skills.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {step === 3 ? (
          // Success State
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Candidat ajouté !</h3>
            <p className="text-gray-600">
              {formData.name} a été ajouté à votre base de talents
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h2 className="text-2xl font-bold">Ajouter un candidat</h2>
                    <p className="text-blue-100 text-sm">Étape {step}/2</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${(step / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="p-6">
              {step === 1 && (
                // Step 1: Basic Info
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Sophie Martin"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@exemple.com"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+33 6 12 34 56 78"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Poste actuel *
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: Développeur Full Stack"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Localisation
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="Ex: Paris, France"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Années d'expérience
                      </label>
                      <input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                        placeholder="5"
                        min="0"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Disponibilité
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                    >
                      <option>Disponible immédiatement</option>
                      <option>Disponible dans 1 mois</option>
                      <option>Disponible dans 2 mois</option>
                      <option>Disponible dans 3 mois</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                // Step 2: Skills
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Compétences ({formData.skills.length})
                    </label>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        placeholder="Ex: React, Python, Figma..."
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <Plus className="w-5 h-5" />
                        Ajouter
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-gray-50 rounded-xl">
                      {formData.skills.length === 0 ? (
                        <p className="text-gray-400 text-sm">Aucune compétence ajoutée</p>
                      ) : (
                        formData.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold flex items-center gap-2"
                          >
                            {skill}
                            <button
                              onClick={() => setFormData({
                                ...formData,
                                skills: formData.skills.filter(s => s !== skill)
                              })}
                              className="hover:bg-white/20 rounded-full p-0.5"
                            >
                              ✕
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Quick Add Popular Skills */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Compétences populaires
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'Python', 'React', 'Node.js', 'Docker', 'AWS', 'Figma', 'Agile'].map(skill => (
                        <button
                          key={skill}
                          onClick={() => {
                            if (!formData.skills.includes(skill)) {
                              setFormData({ ...formData, skills: [...formData.skills, skill] });
                            }
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium disabled:opacity-50"
                          disabled={formData.skills.includes(skill)}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Retour
                  </button>
                )}
                {step < 2 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={!isStep1Valid}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!isStep2Valid}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Ajouter le candidat
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddCandidateModal;

