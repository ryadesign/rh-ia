# Guide d'Installation - RHiQ

## Prérequis

- Node.js 16+ installé
- npm ou yarn

## Installation Rapide

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer l'application en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### 3. Build pour production

```bash
npm run build
```

### 4. Prévisualiser le build

```bash
npm run preview
```

## Fonctionnalités à Tester

### Mode Recruteur

1. **Dashboard** : Vue d'ensemble des KPIs
2. **Recherche Intelligente** :
   - Cliquez sur le bouton micro pour la saisie vocale
   - Ou tapez : "Je cherche développeur Python senior, 5+ ans, Paris"
   - Cliquez sur "Extraire les critères"
   - Ajustez les critères si nécessaire
   - Cliquez sur "Lancer le matching"
   - Explorez les résultats triés par score

3. **Offres** : Parcourez les 30 offres d'emploi
4. **Candidats** : Explorez la base de 50 candidats
5. **Analytics** : Visualisez les graphiques et insights

### Mode Candidat

1. Cliquez sur "Mode Candidat" en bas de la sidebar
2. **Dashboard** : Voir les offres recommandées avec matching inversé
3. **Mon Profil** : 
   - Modifier le profil
   - Utiliser la saisie vocale pour mettre à jour
4. **Offres** : Rechercher et postuler aux offres

## Reconnaissance Vocale

La reconnaissance vocale utilise l'API Web Speech :
- **Chrome/Edge** : Supporté nativement
- **Firefox** : Support limité
- **Safari** : Nécessite activation dans les préférences

### Exemples de commandes vocales :

**Pour la recherche :**
- "Je cherche développeur Python senior, 5 ans d'expérience, Paris"
- "Besoin d'un designer UX UI à Lyon avec Figma"
- "Recherche data scientist avec machine learning"

**Pour le profil candidat :**
- "Je suis développeur Python avec 5 ans d'expérience à Paris"
- "Compétences en React, Node.js et TypeScript"

## PWA (Progressive Web App)

### Installation sur Desktop

1. Ouvrez l'application dans Chrome/Edge
2. Cliquez sur l'icône d'installation dans la barre d'adresse
3. Confirmez l'installation

### Installation sur Mobile

1. Ouvrez l'application dans le navigateur mobile
2. Menu → "Ajouter à l'écran d'accueil"
3. L'application sera accessible comme une app native

## Structure du Projet

```
rhiq/
├── public/
│   ├── manifest.json      # Configuration PWA
│   ├── sw.js             # Service Worker
│   └── icons/            # Icônes PWA
├── src/
│   ├── components/       # Composants réutilisables
│   │   ├── Sidebar.jsx
│   │   ├── VoiceInput.jsx
│   │   ├── CandidateCard.jsx
│   │   └── JobCard.jsx
│   ├── views/           # Pages/Vues
│   │   ├── Dashboard.jsx
│   │   ├── IntelligentSearch.jsx
│   │   ├── JobsView.jsx
│   │   ├── CandidatesView.jsx
│   │   ├── Analytics.jsx
│   │   ├── CandidateDashboard.jsx
│   │   ├── CandidateProfile.jsx
│   │   └── JobSearchView.jsx
│   ├── context/         # Context API
│   │   └── AppContext.jsx
│   ├── data/           # Données fictives
│   │   └── mockData.js
│   ├── utils/          # Utilitaires
│   │   └── matching.js
│   ├── App.jsx         # Composant principal
│   ├── main.jsx        # Point d'entrée
│   └── index.css       # Styles globaux
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Dépannage

### La reconnaissance vocale ne fonctionne pas

1. Vérifiez que vous utilisez HTTPS ou localhost
2. Autorisez l'accès au microphone dans les paramètres du navigateur
3. Testez avec Chrome/Edge pour une meilleure compatibilité

### L'application ne se lance pas

1. Supprimez `node_modules` et `package-lock.json`
2. Réinstallez : `npm install`
3. Relancez : `npm run dev`

### Erreurs de build

1. Vérifiez la version de Node.js : `node --version` (doit être 16+)
2. Nettoyez le cache : `npm cache clean --force`
3. Rebuild : `npm run build`

## Support

Pour toute question ou problème, consultez le README.md ou créez une issue.

## Licence

MIT

