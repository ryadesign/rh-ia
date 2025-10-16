# RHiQ - Application RH IA-Native

Application web RH complète (ATS + Sourcing + Matching IA) qui révolutionne le recrutement avec une approche "qualité > volume" et l'IA au cœur.

## 🚀 Fonctionnalités

### Interface Recruteur
- **Dashboard** : Vue d'ensemble avec KPIs, postes ouverts, taux de conversion
- **Recherche Intelligente** : 3 modes de saisie (Texte, Vocal, Upload fiche de poste)
  - IA extrait automatiquement : poste, compétences, expérience, localisation, salaire
  - Critères ajustables en temps réel
  - Matching IA avec scoring 0-100%
- **ATS** : Gestion complète des candidatures avec pipeline Kanban
- **Sourcing** : Base de 50 candidats fictifs réalistes
- **Analytics** : Graphiques et insights sur les performances

### Interface Candidat
- **Dashboard** : Offres recommandées avec matching inversé
- **Profil** : Création/édition avec saisie texte ou vocale
- **Recherche d'offres** : Filtres avancés avec scores de matching
- **Candidatures** : Suivi en temps réel

### Algorithme de Matching IA
Score calculé sur 100% :
- Compétences : 40%
- Expérience : 25%
- Soft skills : 15%
- Localisation : 10%
- Disponibilité : 10%

## 🛠️ Stack Technique

- **React 18** avec Hooks (useState, useEffect, useContext)
- **Vite** pour le build ultra-rapide
- **Tailwind CSS** pour le design moderne
- **Lucide React** pour les icônes
- **Recharts** pour les graphiques
- **Web Speech API** pour la reconnaissance vocale
- **PWA** avec Service Worker

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview
```

## 🎨 Design

- Palette de couleurs : Bleu #2563eb + Vert #10b981
- Interface moderne, épurée et professionnelle
- Animations subtiles et transitions fluides
- Responsive design pour mobile et desktop

## 📊 Données

L'application contient :
- 50 profils candidats fictifs réalistes
- 30 offres d'emploi variées
- Données de candidatures pour les démos

## 🎯 Parcours Utilisateur

### Recruteur
1. Dashboard → Nouvelle recherche
2. Écrit/Dicte le besoin
3. IA analyse et extrait les critères
4. Ajuste les critères si nécessaire
5. Lance le matching
6. Voit les top candidats (score >85%)
7. Ajoute au pipeline
8. Contacte le candidat

### Candidat
1. Crée son compte
2. Dicte/Écrit son profil
3. IA structure automatiquement
4. Upload CV (optionnel)
5. Voit les offres recommandées
6. Postule en 1 clic
7. Suit le statut de ses candidatures

## 🌟 Fonctionnalités Clés

- **Reconnaissance vocale** : Dictez vos besoins en langage naturel
- **Parsing intelligent** : L'IA extrait automatiquement les critères
- **Matching avancé** : Algorithme de scoring sophistiqué
- **Interface duale** : Mode recruteur et candidat
- **PWA** : Installable sur mobile et desktop
- **Standalone** : Fonctionne sans backend

## 📱 PWA

L'application est une Progressive Web App :
- Installable sur tous les appareils
- Fonctionne hors ligne (cache)
- Icônes et manifest configurés
- Service Worker actif

## 🔧 Configuration

Aucune configuration nécessaire ! L'application fonctionne directement après `npm install` et `npm run dev`.

## 📄 Licence

MIT

## 👨‍💻 Développement

Développé avec ❤️ en utilisant les meilleures pratiques React et une architecture moderne.

