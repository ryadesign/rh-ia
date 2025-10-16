import React, { useState, useContext } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit, Save, Camera, Star, Award, MessageSquare, Settings, Bell, Shield, CreditCard } from 'lucide-react';

const ProfileView = () => {
  const { currentUser, userType } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'John Doe',
    email: currentUser?.email || 'john.doe@example.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    title: userType === 'recruiter' ? 'Senior Tech Recruiter' : 'Développeur Full Stack',
    company: userType === 'recruiter' ? 'TechCorp' : 'Freelance',
    bio: userType === 'recruiter' 
      ? 'Passionné par le recrutement tech, j\'aide les entreprises à trouver les meilleurs talents.'
      : 'Développeur passionné avec 5 ans d\'expérience en React, Node.js et Python.',
    avatar: currentUser?.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skills: userType === 'recruiter' 
      ? ['Recrutement Tech', 'Sourcing', 'Entretiens', 'ATS', 'LinkedIn']
      : ['React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL'],
    experience: userType === 'recruiter' ? '8 ans' : '5 ans',
    rating: 4.8,
    completedProjects: userType === 'recruiter' ? 156 : 42,
    activeConnections: userType === 'recruiter' ? 1200 : 340
  });

  const handleSave = () => {
    setIsEditing(false);
    // Ici on sauvegarderait les données
  };

  const stats = [
    { label: 'Note', value: profile.rating, icon: Star, color: 'text-yellow-500' },
    { label: userType === 'recruiter' ? 'Embauches' : 'Projets', value: profile.completedProjects, icon: Award, color: 'text-blue-500' },
    { label: 'Connexions', value: profile.activeConnections, icon: MessageSquare, color: 'text-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="apple-title text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-2">
          Mon Profil
        </h1>
        <p className="apple-body text-sm sm:text-base text-gray-600">
          Gérez vos informations personnelles et professionnelles
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="apple-card p-6 sticky top-8">
            {/* Avatar Section */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-blue-100">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h2>
              <p className="text-gray-600 font-medium">{profile.title}</p>
              <p className="text-sm text-gray-500">{profile.company}</p>
              
              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-700">{profile.rating}</span>
                <span className="text-sm text-gray-500">(4.2k avis)</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4 mb-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white ${stat.color}`}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                  </div>
                  <span className="font-bold text-gray-900">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full apple-button-primary flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Modifier le profil
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="w-full apple-button-success flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Sauvegarder
                </button>
              )}
              
              <button className="w-full apple-button-secondary flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                Paramètres
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="apple-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Informations personnelles</h3>
              {isEditing && (
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full apple-input"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{profile.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full apple-input"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{profile.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full apple-input"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{profile.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="w-full apple-input"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{profile.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="apple-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Informations professionnelles</h3>
              {isEditing && (
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({...profile, title: e.target.value})}
                    className="w-full apple-input"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{profile.title}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                    className="w-full apple-input"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{profile.company}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expérience</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{profile.experience}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={4}
                    className="w-full apple-input"
                  />
                ) : (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-900 leading-relaxed">{profile.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="apple-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Compétences</h3>
              {isEditing && (
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, idx) => (
                <span key={idx} className="apple-pill">
                  {skill}
                </span>
              ))}
              {isEditing && (
                <button className="apple-pill border-dashed border-2 border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500">
                  + Ajouter
                </button>
              )}
            </div>
          </div>

          {/* Account Settings */}
          <div className="apple-card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Paramètres du compte</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Notifications</p>
                    <p className="text-sm text-gray-500">Gérer vos préférences de notification</p>
                  </div>
                </div>
                <button className="apple-button-secondary text-sm px-4 py-2">
                  Configurer
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Sécurité</p>
                    <p className="text-sm text-gray-500">Mot de passe et authentification</p>
                  </div>
                </div>
                <button className="apple-button-secondary text-sm px-4 py-2">
                  Modifier
                </button>
              </div>

              {userType === 'recruiter' && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Facturation</p>
                      <p className="text-sm text-gray-500">Gérer votre abonnement</p>
                    </div>
                  </div>
                  <button className="apple-button-secondary text-sm px-4 py-2">
                    Voir
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
