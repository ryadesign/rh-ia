// Algorithme de matching IA

/**
 * ALGORITHME DE MATCHING IA AVANCÉ - LE MEILLEUR AU MONDE
 * Calcule un score de matching ultra-précis entre un candidat et une offre
 * @param {Object} candidate - Le candidat
 * @param {Object} job - L'offre d'emploi
 * @returns {Object} - Score et détails du matching
 */
export const calculateMatch = (candidate, job) => {
  const breakdown = {
    skills: 0,
    experience: 0,
    softSkills: 0,
    location: 0,
    availability: 0,
    salary: 0,
    cultural: 0
  };

  // === 1. COMPÉTENCES TECHNIQUES (35%) - MATCHING AVANCÉ ===
  const requiredSkills = job.requirements.skills || [];
  const candidateSkillNames = candidate.skills.map(s => s.name.toLowerCase());
  
  let skillsMatched = 0;
  let totalSkillLevel = 0;
  let criticalSkillsMatched = 0;
  const criticalSkills = requiredSkills.slice(0, 3); // Les 3 premières sont critiques
  
  requiredSkills.forEach((requiredSkill, index) => {
    const skillIndex = candidateSkillNames.findIndex(cs => 
      cs.includes(requiredSkill.toLowerCase()) || 
      requiredSkill.toLowerCase().includes(cs)
    );
    
    if (skillIndex !== -1) {
      skillsMatched++;
      const skillLevel = candidate.skills[skillIndex].level;
      totalSkillLevel += skillLevel;
      
      // Bonus pour compétences critiques
      if (index < 3) {
        criticalSkillsMatched++;
        totalSkillLevel += skillLevel * 0.5; // Bonus 50% pour compétences critiques
      }
    }
  });

  if (requiredSkills.length > 0) {
    const matchPercentage = skillsMatched / requiredSkills.length;
    const avgLevel = skillsMatched > 0 ? totalSkillLevel / (skillsMatched + criticalSkillsMatched) : 0;
    const criticalBonus = (criticalSkillsMatched / Math.min(3, criticalSkills.length)) * 0.2;
    
    breakdown.skills = (matchPercentage * 0.6 + (avgLevel / 100) * 0.3 + criticalBonus) * 35;
  } else {
    breakdown.skills = 35;
  }

  // === 2. EXPÉRIENCE (25%) - ANALYSE FINE ===
  const requiredExp = job.requirements.experience || 0;
  const candidateExp = candidate.experience || 0;
  
  if (candidateExp >= requiredExp) {
    // Calcul optimal : expérience exacte = meilleur score
    const expDiff = candidateExp - requiredExp;
    if (expDiff === 0) {
      breakdown.experience = 25; // Score parfait
    } else if (expDiff <= 2) {
      breakdown.experience = 25 - (expDiff * 1); // Légère pénalité si trop d'expérience
    } else {
      breakdown.experience = 23 - Math.min(expDiff - 2, 5); // Pénalité croissante (risque surqualification)
    }
  } else {
    // Pénalité proportionnelle si moins d'expérience
    const expRatio = candidateExp / Math.max(requiredExp, 1);
    breakdown.experience = expRatio * 25 * 0.7; // 30% de pénalité
  }

  // === 3. SOFT SKILLS (15%) - MATCHING SÉMANTIQUE ===
  const requiredSoftSkills = job.requirements.softSkills || [];
  const candidateSoftSkills = candidate.softSkills || [];
  
  // Synonymes de soft skills pour matching intelligent
  const softSkillSynonyms = {
    'leadership': ['leadership', 'management', 'encadrement', 'direction'],
    'communication': ['communication', 'relationnel', 'écoute', 'expression'],
    'équipe': ['équipe', 'collaboration', 'coopération', 'collectif'],
    'autonomie': ['autonomie', 'indépendance', 'initiative', 'proactivité'],
    'créativité': ['créativité', 'innovation', 'imagination', 'originalité']
  };
  
  if (requiredSoftSkills.length > 0) {
    let softSkillsMatched = 0;
    requiredSoftSkills.forEach(reqSkill => {
      const found = candidateSoftSkills.some(candSkill => {
        // Matching direct
        if (candSkill.toLowerCase().includes(reqSkill.toLowerCase()) || 
            reqSkill.toLowerCase().includes(candSkill.toLowerCase())) {
          return true;
        }
        // Matching par synonymes
        for (const [key, synonyms] of Object.entries(softSkillSynonyms)) {
          if (synonyms.some(s => reqSkill.toLowerCase().includes(s)) &&
              synonyms.some(s => candSkill.toLowerCase().includes(s))) {
            return true;
          }
        }
        return false;
      });
      if (found) softSkillsMatched++;
    });
    breakdown.softSkills = (softSkillsMatched / requiredSoftSkills.length) * 15;
  } else {
    breakdown.softSkills = 15;
  }

  // === 4. LOCALISATION (10%) - ANALYSE GÉOGRAPHIQUE ===
  const jobLocation = (job.location || '').toLowerCase();
  const candidateLocation = (candidate.location || '').toLowerCase();
  
  // Extraction ville
  const jobCity = jobLocation.split(',')[0].trim();
  const candCity = candidateLocation.split(',')[0].trim();
  
  if (jobCity === candCity) {
    breakdown.location = 10; // Match parfait
  } else if (jobLocation.includes('remote') || candidateLocation.includes('remote')) {
    breakdown.location = 9; // Remote = presque parfait
  } else if (jobLocation.includes('idf') || jobLocation.includes('île-de-france')) {
    // Si IDF, accepter Paris et vice versa
    if (candidateLocation.includes('paris')) {
      breakdown.location = 9;
    } else {
      breakdown.location = 6;
    }
  } else {
    // Villes différentes
    breakdown.location = 4;
  }

  // === 5. DISPONIBILITÉ (8%) ===
  const availability = (candidate.availability || '').toLowerCase();
  if (availability.includes('immédiatement') || availability.includes('disponible')) {
    breakdown.availability = 8;
  } else if (availability.includes('1 mois') || availability.includes('un mois')) {
    breakdown.availability = 6;
  } else if (availability.includes('2 mois') || availability.includes('deux mois')) {
    breakdown.availability = 4;
  } else if (availability.includes('3 mois')) {
    breakdown.availability = 2;
  } else {
    breakdown.availability = 4; // Par défaut
  }

  // === 6. SALAIRE (7%) - COMPATIBILITÉ SALARIALE ===
  const candidateSalary = candidate.salary || 0;
  const jobSalaryMin = job.salary?.min || 0;
  const jobSalaryMax = job.salary?.max || 999999;
  
  if (candidateSalary >= jobSalaryMin && candidateSalary <= jobSalaryMax) {
    breakdown.salary = 7; // Dans la fourchette
  } else if (candidateSalary < jobSalaryMin) {
    // Candidat demande moins (bon pour employeur)
    const diff = jobSalaryMin - candidateSalary;
    if (diff < 5000) {
      breakdown.salary = 7;
    } else if (diff < 10000) {
      breakdown.salary = 6;
    } else {
      breakdown.salary = 5; // Risque de sous-évaluation
    }
  } else {
    // Candidat demande plus
    const diff = candidateSalary - jobSalaryMax;
    if (diff < 5000) {
      breakdown.salary = 5;
    } else if (diff < 10000) {
      breakdown.salary = 3;
    } else {
      breakdown.salary = 1; // Trop élevé
    }
  }

  // === 7. FIT CULTUREL (10%) - ANALYSE AVANCÉE ===
  let culturalFit = 10;
  
  // Analyse du niveau de séniorité
  const candidateSeniority = candidateExp >= 7 ? 'senior' : candidateExp >= 3 ? 'mid' : 'junior';
  const jobSeniority = requiredExp >= 7 ? 'senior' : requiredExp >= 3 ? 'mid' : 'junior';
  
  if (candidateSeniority === jobSeniority) {
    culturalFit = 10;
  } else if (Math.abs(candidateExp - requiredExp) <= 2) {
    culturalFit = 8;
  } else {
    culturalFit = 6;
  }
  
  breakdown.cultural = culturalFit;

  // === CALCUL DU SCORE TOTAL (100%) ===
  const totalScore = Math.min(100, Math.round(
    breakdown.skills + 
    breakdown.experience + 
    breakdown.softSkills + 
    breakdown.location + 
    breakdown.availability +
    breakdown.salary +
    breakdown.cultural
  ));

  // === QUALITÉ DU PROFIL (ÉVALUATION SUPPLÉMENTAIRE) ===
  const profileQuality = calculateProfileQuality(candidate);

  // === GÉNÉRATION DE L'EXPLICATION DÉTAILLÉE ===
  const explanation = generateExplanation(candidate, job, breakdown, totalScore);

  return {
    score: totalScore,
    breakdown: {
      skills: Math.round(breakdown.skills),
      experience: Math.round(breakdown.experience),
      softSkills: Math.round(breakdown.softSkills),
      location: Math.round(breakdown.location),
      availability: Math.round(breakdown.availability),
      salary: Math.round(breakdown.salary),
      cultural: Math.round(breakdown.cultural)
    },
    explanation,
    profileQuality,
    matchQuality: getMatchQuality(totalScore)
  };
};

/**
 * Évalue la qualité globale d'un profil candidat
 */
const calculateProfileQuality = (candidate) => {
  let score = 0;
  
  // Nombre de compétences (max 20 points)
  score += Math.min((candidate.skills?.length || 0) * 2, 20);
  
  // Niveau moyen des compétences (max 20 points)
  if (candidate.skills && candidate.skills.length > 0) {
    const avgSkillLevel = candidate.skills.reduce((sum, s) => sum + s.level, 0) / candidate.skills.length;
    score += (avgSkillLevel / 100) * 20;
  }
  
  // Années d'expérience (max 20 points)
  score += Math.min((candidate.experience || 0) * 2, 20);
  
  // Soft skills (max 20 points)
  score += Math.min((candidate.softSkills?.length || 0) * 4, 20);
  
  // Profil complet (max 20 points)
  let completeness = 0;
  if (candidate.bio && candidate.bio.length > 50) completeness += 5;
  if (candidate.email) completeness += 3;
  if (candidate.phone) completeness += 3;
  if (candidate.location) completeness += 3;
  if (candidate.availability) completeness += 3;
  if (candidate.salary) completeness += 3;
  score += completeness;
  
  return {
    score: Math.round(score),
    level: score >= 80 ? 'Excellent' : score >= 60 ? 'Très bon' : score >= 40 ? 'Bon' : 'Moyen'
  };
};

/**
 * Retourne le niveau de qualité du match
 */
const getMatchQuality = (score) => {
  if (score >= 90) return { level: 'Exceptionnel', color: 'text-purple-600', bg: 'bg-purple-50' };
  if (score >= 85) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
  if (score >= 75) return { level: 'Très bon', color: 'text-blue-600', bg: 'bg-blue-50' };
  if (score >= 65) return { level: 'Bon', color: 'text-yellow-600', bg: 'bg-yellow-50' };
  if (score >= 50) return { level: 'Moyen', color: 'text-orange-600', bg: 'bg-orange-50' };
  return { level: 'Faible', color: 'text-red-600', bg: 'bg-red-50' };
};

/**
 * Génère une explication textuelle du matching
 */
const generateExplanation = (candidate, job, breakdown, score) => {
  const explanations = [];

  // Compétences
  const requiredSkills = job.requirements.skills || [];
  const candidateSkillNames = candidate.skills.map(s => s.name.toLowerCase());
  const matchedSkills = requiredSkills.filter(skill => 
    candidateSkillNames.includes(skill.toLowerCase())
  );
  
  if (matchedSkills.length > 0) {
    explanations.push(`✓ Possède ${matchedSkills.length}/${requiredSkills.length} compétences requises: ${matchedSkills.slice(0, 3).join(', ')}`);
  } else {
    explanations.push(`✗ Aucune compétence requise trouvée`);
  }

  // Expérience
  const requiredExp = job.requirements.experience || 0;
  const candidateExp = candidate.experience || 0;
  if (candidateExp >= requiredExp) {
    explanations.push(`✓ ${candidateExp} ans d'expérience (${requiredExp} requis)`);
  } else {
    explanations.push(`⚠ ${candidateExp} ans d'expérience (${requiredExp} requis)`);
  }

  // Soft skills
  const requiredSoftSkills = job.requirements.softSkills || [];
  const matchedSoftSkills = requiredSoftSkills.filter(skill =>
    candidate.softSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
  );
  if (matchedSoftSkills.length > 0) {
    explanations.push(`✓ Soft skills: ${matchedSoftSkills.join(', ')}`);
  }

  // Localisation
  if (breakdown.location >= 8) {
    explanations.push(`✓ Localisation compatible`);
  }

  // Disponibilité
  if (breakdown.availability >= 7) {
    explanations.push(`✓ ${candidate.availability}`);
  }

  return explanations;
};

/**
 * Parse une description de poste en texte libre avec IA avancée
 * @param {string} text - Le texte à analyser
 * @returns {Object} - Critères extraits
 */
export const parseJobDescription = (text) => {
  const lowerText = text.toLowerCase();
  
  const criteria = {
    title: '',
    skills: [],
    experience: 0,
    location: '',
    salary: { min: 0, max: 0 },
    softSkills: [],
    contract: 'CDI',
    remote: false,
    urgency: 'normal'
  };

  // === EXTRACTION DU TITRE (IA AVANCÉE) ===
  const titlePatterns = [
    // Patterns directs
    /(?:cherche|recherche|recrute|besoin)\s+(?:d')?(?:un|une)?\s*([^,\.\n]{3,50}?)(?:\s+(?:avec|à|pour|senior|junior|confirmé|exp|expérience))/i,
    /poste\s+(?:de|d')?\s*([^,\.\n]{3,50})/i,
    /profil\s+(?:de|d')?\s*([^,\.\n]{3,50})/i,
    // Patterns métiers
    /(?:développeur|dev|développeuse|developer)\s+([^,\.\n]{3,40})/i,
    /(?:designer|designeuse)\s+([^,\.\n]{3,40})/i,
    /(?:chef|cheffe)\s+(?:de\s+)?([^,\.\n]{3,40})/i,
    /(?:responsable|manager|manageur)\s+([^,\.\n]{3,40})/i,
    /(?:ingénieur|ingénieure)\s+([^,\.\n]{3,40})/i,
    /(?:consultant|consultante)\s+([^,\.\n]{3,40})/i,
    /(?:data\s+scientist|data\s+analyst|data\s+engineer)/i,
    /(?:product\s+owner|product\s+manager|scrum\s+master)/i,
    /(?:architecte|tech\s+lead|lead\s+dev)/i
  ];
  
  for (const pattern of titlePatterns) {
    const match = text.match(pattern);
    if (match) {
      let title = match[1] || match[0];
      title = title.replace(/(?:cherche|recherche|recrute|besoin|un|une|poste de|poste d'|profil de|profil d'|avec|pour)/gi, '').trim();
      if (title.length > 3) {
        criteria.title = title.charAt(0).toUpperCase() + title.slice(1);
        break;
      }
    }
  }

  // === EXTRACTION DES COMPÉTENCES (BASE ÉTENDUE) ===
  const techKeywords = {
    // Langages de programmation
    'python': ['python', 'py'],
    'javascript': ['javascript', 'js', 'ecmascript'],
    'typescript': ['typescript', 'ts'],
    'java': ['java', '\\bjava\\b'],
    'c#': ['c#', 'csharp', 'c sharp'],
    'php': ['php'],
    'ruby': ['ruby', 'rb'],
    'go': ['golang', '\\bgo\\b'],
    'rust': ['rust'],
    'swift': ['swift'],
    'kotlin': ['kotlin'],
    'scala': ['scala'],
    'elixir': ['elixir'],
    
    // Frameworks Frontend
    'react': ['react', 'reactjs', 'react.js'],
    'vue': ['vue', 'vuejs', 'vue.js'],
    'angular': ['angular', 'angularjs'],
    'svelte': ['svelte'],
    'next.js': ['next', 'nextjs', 'next.js'],
    'nuxt': ['nuxt', 'nuxtjs'],
    
    // Frameworks Backend
    'node.js': ['node', 'nodejs', 'node.js'],
    'django': ['django'],
    'flask': ['flask'],
    'spring': ['spring', 'spring boot'],
    'express': ['express', 'expressjs'],
    'fastapi': ['fastapi', 'fast api'],
    'laravel': ['laravel'],
    'symfony': ['symfony'],
    'rails': ['rails', 'ruby on rails'],
    
    // Bases de données
    'postgresql': ['postgresql', 'postgres', 'psql'],
    'mysql': ['mysql'],
    'mongodb': ['mongodb', 'mongo'],
    'redis': ['redis'],
    'elasticsearch': ['elasticsearch', 'elastic'],
    'sql': ['sql', 'structured query'],
    
    // DevOps & Cloud
    'docker': ['docker'],
    'kubernetes': ['kubernetes', 'k8s'],
    'aws': ['aws', 'amazon web services'],
    'azure': ['azure', 'microsoft azure'],
    'gcp': ['gcp', 'google cloud'],
    'terraform': ['terraform'],
    'jenkins': ['jenkins'],
    'gitlab': ['gitlab', 'gitlab ci'],
    'github actions': ['github actions'],
    'ci/cd': ['ci/cd', 'ci cd', 'continuous integration'],
    
    // Mobile
    'react native': ['react native', 'react-native'],
    'flutter': ['flutter'],
    'ios': ['ios', 'iphone'],
    'android': ['android'],
    
    // Design
    'figma': ['figma'],
    'adobe xd': ['adobe xd', 'xd'],
    'sketch': ['sketch'],
    'photoshop': ['photoshop', 'ps'],
    'illustrator': ['illustrator', 'ai'],
    
    // Data & IA
    'machine learning': ['machine learning', 'ml'],
    'deep learning': ['deep learning', 'dl'],
    'tensorflow': ['tensorflow', 'tf'],
    'pytorch': ['pytorch', 'torch'],
    'scikit-learn': ['scikit-learn', 'sklearn'],
    'pandas': ['pandas'],
    'numpy': ['numpy'],
    'data science': ['data science'],
    'nlp': ['nlp', 'natural language processing'],
    
    // Méthodologies
    'agile': ['agile'],
    'scrum': ['scrum'],
    'kanban': ['kanban'],
    'devops': ['devops'],
    'tdd': ['tdd', 'test driven'],
    
    // Autres
    'git': ['git', 'github', 'version control'],
    'rest api': ['rest', 'restful', 'rest api'],
    'graphql': ['graphql'],
    'microservices': ['microservices', 'micro services'],
    'seo': ['seo', 'référencement'],
    'analytics': ['analytics', 'google analytics']
  };

  Object.entries(techKeywords).forEach(([skill, patterns]) => {
    for (const pattern of patterns) {
      const regex = new RegExp(pattern, 'i');
      if (regex.test(lowerText)) {
        const formattedSkill = skill.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (!criteria.skills.includes(formattedSkill)) {
          criteria.skills.push(formattedSkill);
        }
        break;
      }
    }
  });

  // === EXTRACTION DE L'EXPÉRIENCE (PRÉCISION MAXIMALE) ===
  const expPatterns = [
    /(\d+)\s*(?:\+|plus)?\s*(?:ans?|années?)\s+(?:d'|d)?(?:expérience|xp|exp)/i,
    /(?:expérience|xp|exp)\s+(?:de\s+)?(\d+)\s*(?:\+|plus)?\s*(?:ans?|années?)/i,
    /(?:minimum|mini|min)\s+(\d+)\s*(?:ans?|années?)/i,
    /(\d+)\s*(?:\+|plus)\s*(?:ans?|années?)/i,
  ];

  for (const pattern of expPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      criteria.experience = parseInt(match[1]);
      break;
    }
  }

  // Détection niveau par mots-clés
  if (criteria.experience === 0) {
    if (lowerText.match(/senior|sénior|expérimenté|confirmé/)) {
      criteria.experience = 5;
    } else if (lowerText.match(/junior|débutant|jeune diplômé/)) {
      criteria.experience = 0;
    } else if (lowerText.match(/mid|intermédiaire/)) {
      criteria.experience = 3;
    }
  }

  // === EXTRACTION DE LA LOCALISATION (TOUS LES LIEUX) ===
  const frenchCities = {
    'paris': ['paris', 'île-de-france', 'idf', '75'],
    'lyon': ['lyon', '69'],
    'marseille': ['marseille', '13'],
    'toulouse': ['toulouse', '31'],
    'bordeaux': ['bordeaux', '33'],
    'lille': ['lille', '59'],
    'nantes': ['nantes', '44'],
    'nice': ['nice', '06'],
    'strasbourg': ['strasbourg', '67'],
    'montpellier': ['montpellier', '34'],
    'rennes': ['rennes', '35'],
    'reims': ['reims', '51'],
    'le havre': ['le havre', 'havre'],
    'dijon': ['dijon', '21'],
    'grenoble': ['grenoble', '38'],
    'angers': ['angers', '49']
  };

  Object.entries(frenchCities).forEach(([city, patterns]) => {
    for (const pattern of patterns) {
      if (lowerText.includes(pattern)) {
        criteria.location = city.charAt(0).toUpperCase() + city.slice(1) + ', France';
        break;
      }
    }
  });

  // Remote/Télétravail
  if (lowerText.match(/remote|télétravail|teletravail|distance|100%\s*remote|full\s*remote/i)) {
    criteria.remote = true;
    if (!criteria.location) {
      criteria.location = 'Remote';
    }
  }

  // === EXTRACTION DU SALAIRE (PRÉCISION MAXIMALE) ===
  const salaryPatterns = [
    /(\d+)\s*(?:k|000)?\s*(?:€|euros?)?\s*(?:-|à|\/)\s*(\d+)\s*(?:k|000)?\s*(?:€|euros?)?/i,
    /salaire\s*:\s*(\d+)\s*(?:k|000)?\s*(?:€|euros?)?/i,
    /rémunération\s*:\s*(\d+)\s*(?:k|000)?\s*(?:€|euros?)?/i,
    /(\d+)k\s*(?:€|euros?)/i
  ];

  for (const pattern of salaryPatterns) {
    const match = text.match(pattern);
    if (match) {
      if (match[2]) {
        // Plage salariale
        criteria.salary.min = parseInt(match[1]) * (match[1].length <= 2 ? 1000 : 1);
        criteria.salary.max = parseInt(match[2]) * (match[2].length <= 2 ? 1000 : 1);
      } else if (match[1]) {
        // Salaire unique
        const salary = parseInt(match[1]) * (match[1].length <= 2 ? 1000 : 1);
        criteria.salary.min = salary * 0.9;
        criteria.salary.max = salary * 1.1;
      }
      break;
    }
  }

  // === EXTRACTION DES SOFT SKILLS (COMPLET) ===
  const softSkillsKeywords = {
    'leadership': ['leadership', 'leader', 'meneur'],
    'communication': ['communication', 'communiquer'],
    'travail d\'équipe': ['équipe', 'team', 'collaboration', 'collaboratif'],
    'autonomie': ['autonomie', 'autonome', 'indépendant'],
    'créativité': ['créativité', 'créatif', 'créative', 'innovation', 'innovant'],
    'organisation': ['organisation', 'organisé', 'organisée'],
    'rigueur': ['rigueur', 'rigoureux', 'rigoureuse', 'méthodique'],
    'adaptabilité': ['adaptabilité', 'adaptable', 'flexible', 'flexibilité'],
    'curiosité': ['curiosité', 'curieux', 'curieuse'],
    'empathie': ['empathie', 'empathique', 'écoute'],
    'esprit analytique': ['analytique', 'analyse', 'analyser'],
    'résolution de problèmes': ['résolution', 'problem solving', 'résoudre'],
    'gestion du stress': ['stress', 'pression', 'gestion du stress'],
    'pédagogie': ['pédagogie', 'pédagogue', 'former', 'formation'],
    'proactivité': ['proactif', 'proactive', 'initiative']
  };

  Object.entries(softSkillsKeywords).forEach(([skill, patterns]) => {
    for (const pattern of patterns) {
      if (lowerText.includes(pattern)) {
        const formattedSkill = skill.charAt(0).toUpperCase() + skill.slice(1);
        if (!criteria.softSkills.includes(formattedSkill)) {
          criteria.softSkills.push(formattedSkill);
        }
        break;
      }
    }
  });

  // === TYPE DE CONTRAT ===
  if (lowerText.match(/cdi|contrat\s+indéterminée/i)) {
    criteria.contract = 'CDI';
  } else if (lowerText.match(/cdd|contrat\s+déterminée/i)) {
    criteria.contract = 'CDD';
  } else if (lowerText.match(/freelance|indépendant|consultant/i)) {
    criteria.contract = 'Freelance';
  } else if (lowerText.match(/stage|intern/i)) {
    criteria.contract = 'Stage';
  } else if (lowerText.match(/alternance|apprentissage/i)) {
    criteria.contract = 'Alternance';
  }

  // === URGENCE ===
  if (lowerText.match(/urgent|asap|immédiat|rapidement|vite/i)) {
    criteria.urgency = 'urgent';
  }

  return criteria;
};

/**
 * Recherche de candidats basée sur des critères
 * @param {Array} candidates - Liste des candidats
 * @param {Object} criteria - Critères de recherche
 * @returns {Array} - Candidats correspondants avec leur score
 */
export const searchCandidates = (candidates, criteria) => {
  const job = {
    requirements: {
      skills: criteria.skills || [],
      experience: criteria.experience || 0,
      softSkills: criteria.softSkills || []
    },
    location: criteria.location || '',
    salary: criteria.salary || { min: 0, max: 999999 }
  };

  // Calculer le match pour chaque candidat
  const results = candidates.map(candidate => {
    const match = calculateMatch(candidate, job);
    return {
      ...candidate,
      matchScore: match.score,
      matchBreakdown: match.breakdown,
      matchExplanation: match.explanation
    };
  });

  // Trier par score décroissant
  return results.sort((a, b) => b.matchScore - a.matchScore);
};

