// Voice Utils - Text-to-Speech functionality
class VoiceManager {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.currentVoice = null;
    this.isEnabled = true;
    this.volume = 0.8;
    this.rate = 0.9;
    this.pitch = 1.0;
    
    this.loadVoices();
  }

  loadVoices() {
    this.voices = this.synth.getVoices();
    
    // Préférer une voix française si disponible
    const frenchVoice = this.voices.find(voice => 
      voice.lang.startsWith('fr') && voice.name.includes('French')
    );
    
    if (frenchVoice) {
      this.currentVoice = frenchVoice;
    } else {
      // Fallback sur une voix anglaise avec un accent agréable
      this.currentVoice = this.voices.find(voice => 
        voice.name.includes('Google') || voice.name.includes('Microsoft')
      ) || this.voices[0];
    }
  }

  speak(text, options = {}) {
    if (!this.isEnabled || !text) return;

    // Arrêter toute parole en cours
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configuration de la voix
    utterance.voice = this.currentVoice;
    utterance.volume = options.volume || this.volume;
    utterance.rate = options.rate || this.rate;
    utterance.pitch = options.pitch || this.pitch;
    
    // Événements
    utterance.onstart = () => {
      console.log('🎤 Voice started:', text);
    };
    
    utterance.onend = () => {
      console.log('🎤 Voice ended');
    };
    
    utterance.onerror = (event) => {
      console.error('🎤 Voice error:', event.error);
    };

    this.synth.speak(utterance);
  }

  // Messages prédéfinis pour l'application
  speakSearchStart() {
    const messages = [
      "Nous lançons votre recherche intelligente...",
      "Recherche en cours, veuillez patienter...",
      "L'IA analyse vos critères...",
      "Recherche des meilleurs profils...",
      "Scanning de la base de données..."
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    this.speak(message, { rate: 0.8 });
  }

  speakSearchComplete(count) {
    const messages = [
      `Recherche terminée ! ${count} profils trouvés.`,
      `Parfait ! ${count} candidats correspondent à vos critères.`,
      `Excellent ! ${count} profils ont été identifiés.`,
      `Recherche réussie ! ${count} talents découverts.`
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    this.speak(message, { rate: 0.9 });
  }

  speakProfileSummary(candidate) {
    const name = candidate.name;
    const title = candidate.title;
    const experience = candidate.experience;
    const location = candidate.location;
    const skills = candidate.skills?.slice(0, 3).map(s => s.name).join(', ') || '';
    
    const summary = `${name}, ${title} avec ${experience} d'expérience basé à ${location}. Compétences principales : ${skills}.`;
    
    this.speak(summary, { rate: 0.8 });
  }

  speakProfileDetails(candidate) {
    const name = candidate.name;
    const title = candidate.title;
    const experience = candidate.experience;
    const location = candidate.location;
    const bio = candidate.bio || '';
    const skills = candidate.skills?.slice(0, 5).map(s => s.name).join(', ') || '';
    
    let details = `${name} est ${title} avec ${experience} d'expérience. `;
    details += `Basé à ${location}. `;
    
    if (bio) {
      details += `À propos : ${bio.substring(0, 100)}... `;
    }
    
    if (skills) {
      details += `Compétences : ${skills}.`;
    }
    
    this.speak(details, { rate: 0.7 });
  }

  speakAction(action) {
    const messages = {
      'profile_selected': 'Profil sélectionné',
      'message_sent': 'Message envoyé avec succès',
      'candidate_added': 'Candidat ajouté au pipeline',
      'application_updated': 'Candidature mise à jour',
      'search_cleared': 'Recherche effacée',
      'filters_applied': 'Filtres appliqués',
      'voice_input_start': 'Écoute activée, parlez maintenant',
      'voice_input_end': 'Écoute terminée',
      'error': 'Une erreur est survenue',
      'success': 'Action réussie'
    };
    
    const message = messages[action] || action;
    this.speak(message, { rate: 1.0 });
  }

  speakWelcome(userType) {
    const messages = {
      'recruiter': 'Bienvenue dans votre espace recruteur. Vous pouvez rechercher des candidats, gérer vos offres et analyser vos performances.',
      'candidate': 'Bienvenue dans votre espace candidat. Découvrez les offres qui vous correspondent et gérez votre profil.'
    };
    
    const message = messages[userType] || 'Bienvenue dans l\'application RH intelligente.';
    this.speak(message, { rate: 0.8 });
  }

  speakStats(stats) {
    const { total, new: newCount, interviewed, hired } = stats;
    const message = `Statistiques : ${total} candidatures au total, ${newCount} nouvelles, ${interviewed} en entretien, ${hired} embauchés.`;
    this.speak(message, { rate: 0.8 });
  }

  // Contrôles
  enable() {
    this.isEnabled = true;
    console.log('🎤 Voice enabled');
  }

  disable() {
    this.isEnabled = false;
    this.synth.cancel();
    console.log('🎤 Voice disabled');
  }

  stop() {
    this.synth.cancel();
    console.log('🎤 Voice stopped');
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setRate(rate) {
    this.rate = Math.max(0.1, Math.min(10, rate));
  }

  setPitch(pitch) {
    this.pitch = Math.max(0, Math.min(2, pitch));
  }

  // Obtenir la liste des voix disponibles
  getAvailableVoices() {
    return this.voices.map(voice => ({
      name: voice.name,
      lang: voice.lang,
      default: voice.default
    }));
  }

  setVoice(voiceName) {
    const voice = this.voices.find(v => v.name === voiceName);
    if (voice) {
      this.currentVoice = voice;
      console.log('🎤 Voice changed to:', voice.name);
    }
  }
}

// Instance globale
const voiceManager = new VoiceManager();

// Recharger les voix quand elles sont disponibles
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = () => {
    voiceManager.loadVoices();
  };
}

export default voiceManager;
