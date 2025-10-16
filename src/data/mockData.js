// Données fictives pour l'application

export const mockCandidates = [
  {
    id: 1,
    name: "Sophie Martin",
    photo: "https://i.pravatar.cc/150?img=1",
    title: "Développeuse Python Senior",
    location: "Paris, France",
    experience: 6,
    skills: [
      { name: "Python", level: 95 },
      { name: "Django", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "Docker", level: 80 },
      { name: "AWS", level: 75 }
    ],
    softSkills: ["Leadership", "Communication", "Résolution de problèmes"],
    bio: "Développeuse passionnée avec 6 ans d'expérience en développement backend. Spécialisée en Python et Django.",
    availability: "Disponible immédiatement",
    salary: 55000,
    email: "sophie.martin@email.com",
    phone: "+33 6 12 34 56 78"
  },
  {
    id: 2,
    name: "Thomas Dubois",
    photo: "https://i.pravatar.cc/150?img=12",
    title: "Développeur Full Stack JavaScript",
    location: "Lyon, France",
    experience: 4,
    skills: [
      { name: "React", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "GraphQL", level: 70 }
    ],
    softSkills: ["Travail d'équipe", "Créativité", "Adaptabilité"],
    bio: "Développeur full stack avec une forte expertise en JavaScript moderne et frameworks React.",
    availability: "Disponible dans 1 mois",
    salary: 48000,
    email: "thomas.dubois@email.com",
    phone: "+33 6 23 45 67 89"
  },
  {
    id: 3,
    name: "Marie Lefebvre",
    photo: "https://i.pravatar.cc/150?img=5",
    title: "Chef de Projet Digital",
    location: "Paris, France",
    experience: 8,
    skills: [
      { name: "Gestion de projet", level: 95 },
      { name: "Agile/Scrum", level: 90 },
      { name: "Product Management", level: 85 },
      { name: "Analytics", level: 80 },
      { name: "UX/UI", level: 75 }
    ],
    softSkills: ["Leadership", "Organisation", "Communication"],
    bio: "Chef de projet expérimentée avec 8 ans dans le digital. Expert en méthodologies agiles.",
    availability: "Disponible immédiatement",
    salary: 60000,
    email: "marie.lefebvre@email.com",
    phone: "+33 6 34 56 78 90"
  },
  {
    id: 4,
    name: "Lucas Bernard",
    photo: "https://i.pravatar.cc/150?img=13",
    title: "Data Scientist",
    location: "Toulouse, France",
    experience: 5,
    skills: [
      { name: "Python", level: 90 },
      { name: "Machine Learning", level: 85 },
      { name: "TensorFlow", level: 80 },
      { name: "SQL", level: 85 },
      { name: "Data Visualization", level: 75 }
    ],
    softSkills: ["Analytique", "Curiosité", "Rigueur"],
    bio: "Data scientist passionné par l'IA et le machine learning. Expérience en modèles prédictifs.",
    availability: "Disponible dans 2 mois",
    salary: 52000,
    email: "lucas.bernard@email.com",
    phone: "+33 6 45 67 89 01"
  },
  {
    id: 5,
    name: "Emma Petit",
    photo: "https://i.pravatar.cc/150?img=9",
    title: "Designer UX/UI Senior",
    location: "Paris, France",
    experience: 7,
    skills: [
      { name: "Figma", level: 95 },
      { name: "Adobe XD", level: 90 },
      { name: "User Research", level: 85 },
      { name: "Prototyping", level: 90 },
      { name: "Design System", level: 85 }
    ],
    softSkills: ["Créativité", "Empathie", "Collaboration"],
    bio: "Designer UX/UI avec 7 ans d'expérience. Spécialisée en design thinking et recherche utilisateur.",
    availability: "Disponible immédiatement",
    salary: 54000,
    email: "emma.petit@email.com",
    phone: "+33 6 56 78 90 12"
  },
  {
    id: 6,
    name: "Alexandre Roux",
    photo: "https://i.pravatar.cc/150?img=14",
    title: "DevOps Engineer",
    location: "Nantes, France",
    experience: 5,
    skills: [
      { name: "Kubernetes", level: 90 },
      { name: "Docker", level: 95 },
      { name: "CI/CD", level: 85 },
      { name: "AWS", level: 80 },
      { name: "Terraform", level: 75 }
    ],
    softSkills: ["Autonomie", "Résolution de problèmes", "Communication"],
    bio: "Ingénieur DevOps expert en containerisation et orchestration. Passionné par l'automatisation.",
    availability: "Disponible immédiatement",
    salary: 56000,
    email: "alexandre.roux@email.com",
    phone: "+33 6 67 89 01 23"
  },
  {
    id: 7,
    name: "Camille Moreau",
    photo: "https://i.pravatar.cc/150?img=10",
    title: "Responsable Marketing Digital",
    location: "Bordeaux, France",
    experience: 6,
    skills: [
      { name: "SEO/SEA", level: 90 },
      { name: "Google Analytics", level: 85 },
      { name: "Content Marketing", level: 85 },
      { name: "Social Media", level: 80 },
      { name: "Email Marketing", level: 75 }
    ],
    softSkills: ["Créativité", "Stratégie", "Communication"],
    bio: "Responsable marketing digital avec 6 ans d'expérience. Expert en acquisition et conversion.",
    availability: "Disponible dans 1 mois",
    salary: 50000,
    email: "camille.moreau@email.com",
    phone: "+33 6 78 90 12 34"
  },
  {
    id: 8,
    name: "Hugo Simon",
    photo: "https://i.pravatar.cc/150?img=15",
    title: "Développeur Mobile React Native",
    location: "Paris, France",
    experience: 4,
    skills: [
      { name: "React Native", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "iOS", level: 75 },
      { name: "Android", level: 75 },
      { name: "Redux", level: 80 }
    ],
    softSkills: ["Adaptabilité", "Travail d'équipe", "Curiosité"],
    bio: "Développeur mobile spécialisé en React Native. Expérience sur iOS et Android.",
    availability: "Disponible immédiatement",
    salary: 47000,
    email: "hugo.simon@email.com",
    phone: "+33 6 89 01 23 45"
  },
  {
    id: 9,
    name: "Léa Laurent",
    photo: "https://i.pravatar.cc/150?img=16",
    title: "Business Analyst",
    location: "Lyon, France",
    experience: 5,
    skills: [
      { name: "Analyse métier", level: 90 },
      { name: "SQL", level: 85 },
      { name: "Power BI", level: 80 },
      { name: "Excel avancé", level: 90 },
      { name: "Modélisation", level: 75 }
    ],
    softSkills: ["Analytique", "Communication", "Rigueur"],
    bio: "Business analyst avec 5 ans d'expérience. Spécialisée en analyse de données et reporting.",
    availability: "Disponible dans 2 mois",
    salary: 46000,
    email: "lea.laurent@email.com",
    phone: "+33 6 90 12 34 56"
  },
  {
    id: 10,
    name: "Nathan Girard",
    photo: "https://i.pravatar.cc/150?img=17",
    title: "Architecte Cloud",
    location: "Paris, France",
    experience: 9,
    skills: [
      { name: "AWS", level: 95 },
      { name: "Azure", level: 85 },
      { name: "Architecture", level: 90 },
      { name: "Sécurité", level: 85 },
      { name: "Microservices", level: 90 }
    ],
    softSkills: ["Leadership", "Vision stratégique", "Mentoring"],
    bio: "Architecte cloud senior avec 9 ans d'expérience. Expert en conception d'architectures scalables.",
    availability: "Disponible immédiatement",
    salary: 70000,
    email: "nathan.girard@email.com",
    phone: "+33 6 01 23 45 67"
  },
  {
    id: 11,
    name: "Chloé Fontaine",
    photo: "https://i.pravatar.cc/150?img=20",
    title: "Développeuse Java/Spring",
    location: "Lille, France",
    experience: 5,
    skills: [
      { name: "Java", level: 90 },
      { name: "Spring Boot", level: 85 },
      { name: "Microservices", level: 80 },
      { name: "MySQL", level: 80 },
      { name: "REST API", level: 85 }
    ],
    softSkills: ["Rigueur", "Travail d'équipe", "Autonomie"],
    bio: "Développeuse Java avec 5 ans d'expérience en développement backend et microservices.",
    availability: "Disponible dans 1 mois",
    salary: 50000,
    email: "chloe.fontaine@email.com",
    phone: "+33 6 12 34 56 78"
  },
  {
    id: 12,
    name: "Maxime Rousseau",
    photo: "https://i.pravatar.cc/150?img=18",
    title: "Product Owner",
    location: "Paris, France",
    experience: 6,
    skills: [
      { name: "Product Management", level: 90 },
      { name: "Agile", level: 95 },
      { name: "User Stories", level: 85 },
      { name: "Roadmapping", level: 80 },
      { name: "Analytics", level: 75 }
    ],
    softSkills: ["Vision produit", "Communication", "Priorisation"],
    bio: "Product Owner avec 6 ans d'expérience. Expert en méthodologies agiles et gestion de backlog.",
    availability: "Disponible immédiatement",
    salary: 58000,
    email: "maxime.rousseau@email.com",
    phone: "+33 6 23 45 67 89"
  },
  {
    id: 13,
    name: "Julie Vincent",
    photo: "https://i.pravatar.cc/150?img=23",
    title: "Développeuse Front-End Angular",
    location: "Marseille, France",
    experience: 4,
    skills: [
      { name: "Angular", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "RxJS", level: 80 },
      { name: "HTML/CSS", level: 90 },
      { name: "Jest", level: 75 }
    ],
    softSkills: ["Créativité", "Attention aux détails", "Collaboration"],
    bio: "Développeuse front-end spécialisée en Angular. Passionnée par les interfaces utilisateur.",
    availability: "Disponible immédiatement",
    salary: 46000,
    email: "julie.vincent@email.com",
    phone: "+33 6 34 56 78 90"
  },
  {
    id: 14,
    name: "Antoine Michel",
    photo: "https://i.pravatar.cc/150?img=19",
    title: "Ingénieur Cybersécurité",
    location: "Paris, France",
    experience: 7,
    skills: [
      { name: "Sécurité réseau", level: 90 },
      { name: "Pentesting", level: 85 },
      { name: "SIEM", level: 80 },
      { name: "Cryptographie", level: 85 },
      { name: "ISO 27001", level: 75 }
    ],
    softSkills: ["Rigueur", "Analytique", "Veille technologique"],
    bio: "Ingénieur cybersécurité avec 7 ans d'expérience. Expert en tests d'intrusion et sécurité.",
    availability: "Disponible dans 2 mois",
    salary: 62000,
    email: "antoine.michel@email.com",
    phone: "+33 6 45 67 89 01"
  },
  {
    id: 15,
    name: "Sarah Leroy",
    photo: "https://i.pravatar.cc/150?img=24",
    title: "Scrum Master",
    location: "Lyon, France",
    experience: 5,
    skills: [
      { name: "Scrum", level: 95 },
      { name: "Facilitation", level: 90 },
      { name: "Coaching", level: 85 },
      { name: "Jira", level: 85 },
      { name: "Kanban", level: 80 }
    ],
    softSkills: ["Leadership", "Communication", "Empathie"],
    bio: "Scrum Master certifiée avec 5 ans d'expérience. Passionnée par l'amélioration continue.",
    availability: "Disponible immédiatement",
    salary: 52000,
    email: "sarah.leroy@email.com",
    phone: "+33 6 56 78 90 12"
  },
  {
    id: 16,
    name: "Pierre Garnier",
    photo: "https://i.pravatar.cc/150?img=21",
    title: "Développeur Backend Node.js",
    location: "Nantes, France",
    experience: 4,
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "REST API", level: 85 },
      { name: "GraphQL", level: 75 }
    ],
    softSkills: ["Autonomie", "Résolution de problèmes", "Collaboration"],
    bio: "Développeur backend spécialisé en Node.js. Expérience en APIs RESTful et GraphQL.",
    availability: "Disponible dans 1 mois",
    salary: 47000,
    email: "pierre.garnier@email.com",
    phone: "+33 6 67 89 01 23"
  },
  {
    id: 17,
    name: "Laura Bonnet",
    photo: "https://i.pravatar.cc/150?img=25",
    title: "Content Manager",
    location: "Bordeaux, France",
    experience: 5,
    skills: [
      { name: "Rédaction web", level: 90 },
      { name: "SEO", level: 85 },
      { name: "WordPress", level: 80 },
      { name: "Content Strategy", level: 85 },
      { name: "Analytics", level: 75 }
    ],
    softSkills: ["Créativité", "Organisation", "Communication"],
    bio: "Content manager avec 5 ans d'expérience. Spécialisée en stratégie de contenu et SEO.",
    availability: "Disponible immédiatement",
    salary: 42000,
    email: "laura.bonnet@email.com",
    phone: "+33 6 78 90 12 34"
  },
  {
    id: 18,
    name: "Julien Dupont",
    photo: "https://i.pravatar.cc/150?img=22",
    title: "Ingénieur Machine Learning",
    location: "Paris, France",
    experience: 6,
    skills: [
      { name: "Python", level: 95 },
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "Deep Learning", level: 85 },
      { name: "NLP", level: 75 }
    ],
    softSkills: ["Analytique", "Curiosité", "Innovation"],
    bio: "Ingénieur ML avec 6 ans d'expérience. Spécialisé en deep learning et traitement du langage.",
    availability: "Disponible dans 2 mois",
    salary: 65000,
    email: "julien.dupont@email.com",
    phone: "+33 6 89 01 23 45"
  },
  {
    id: 19,
    name: "Manon Blanc",
    photo: "https://i.pravatar.cc/150?img=26",
    title: "QA Engineer",
    location: "Toulouse, France",
    experience: 4,
    skills: [
      { name: "Tests automatisés", level: 85 },
      { name: "Selenium", level: 80 },
      { name: "Jest", level: 80 },
      { name: "Cypress", level: 75 },
      { name: "CI/CD", level: 70 }
    ],
    softSkills: ["Rigueur", "Attention aux détails", "Communication"],
    bio: "QA Engineer avec 4 ans d'expérience. Spécialisée en tests automatisés et qualité logicielle.",
    availability: "Disponible immédiatement",
    salary: 44000,
    email: "manon.blanc@email.com",
    phone: "+33 6 90 12 34 56"
  },
  {
    id: 20,
    name: "Romain Mercier",
    photo: "https://i.pravatar.cc/150?img=27",
    title: "Développeur PHP/Symfony",
    location: "Lille, France",
    experience: 5,
    skills: [
      { name: "PHP", level: 90 },
      { name: "Symfony", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "Doctrine", level: 80 },
      { name: "API Platform", level: 75 }
    ],
    softSkills: ["Rigueur", "Travail d'équipe", "Autonomie"],
    bio: "Développeur PHP avec 5 ans d'expérience. Expert en Symfony et développement d'APIs.",
    availability: "Disponible dans 1 mois",
    salary: 48000,
    email: "romain.mercier@email.com",
    phone: "+33 6 01 23 45 67"
  },
  {
    id: 21,
    name: "Océane Lambert",
    photo: "https://i.pravatar.cc/150?img=28",
    title: "UX Researcher",
    location: "Paris, France",
    experience: 4,
    skills: [
      { name: "User Research", level: 90 },
      { name: "Tests utilisateurs", level: 85 },
      { name: "Personas", level: 85 },
      { name: "Analytics", level: 75 },
      { name: "Wireframing", level: 70 }
    ],
    softSkills: ["Empathie", "Analytique", "Communication"],
    bio: "UX Researcher avec 4 ans d'expérience. Passionnée par la compréhension des utilisateurs.",
    availability: "Disponible immédiatement",
    salary: 46000,
    email: "oceane.lambert@email.com",
    phone: "+33 6 12 34 56 78"
  },
  {
    id: 22,
    name: "Théo Renard",
    photo: "https://i.pravatar.cc/150?img=29",
    title: "Développeur iOS Swift",
    location: "Lyon, France",
    experience: 5,
    skills: [
      { name: "Swift", level: 90 },
      { name: "iOS", level: 90 },
      { name: "SwiftUI", level: 80 },
      { name: "Core Data", level: 75 },
      { name: "REST API", level: 80 }
    ],
    softSkills: ["Créativité", "Attention aux détails", "Autonomie"],
    bio: "Développeur iOS avec 5 ans d'expérience. Spécialisé en Swift et développement natif.",
    availability: "Disponible dans 2 mois",
    salary: 52000,
    email: "theo.renard@email.com",
    phone: "+33 6 23 45 67 89"
  },
  {
    id: 23,
    name: "Inès Morel",
    photo: "https://i.pravatar.cc/150?img=30",
    title: "Growth Hacker",
    location: "Paris, France",
    experience: 3,
    skills: [
      { name: "Growth Marketing", level: 85 },
      { name: "A/B Testing", level: 80 },
      { name: "Analytics", level: 85 },
      { name: "SEO", level: 75 },
      { name: "Automation", level: 70 }
    ],
    softSkills: ["Créativité", "Analytique", "Expérimentation"],
    bio: "Growth hacker avec 3 ans d'expérience. Spécialisée en acquisition et optimisation de conversion.",
    availability: "Disponible immédiatement",
    salary: 45000,
    email: "ines.morel@email.com",
    phone: "+33 6 34 56 78 90"
  },
  {
    id: 24,
    name: "Victor Fournier",
    photo: "https://i.pravatar.cc/150?img=31",
    title: "Développeur Android Kotlin",
    location: "Marseille, France",
    experience: 4,
    skills: [
      { name: "Kotlin", level: 90 },
      { name: "Android", level: 85 },
      { name: "Jetpack Compose", level: 75 },
      { name: "Room", level: 80 },
      { name: "MVVM", level: 80 }
    ],
    softSkills: ["Autonomie", "Curiosité", "Collaboration"],
    bio: "Développeur Android avec 4 ans d'expérience. Expert en Kotlin et architecture MVVM.",
    availability: "Disponible dans 1 mois",
    salary: 49000,
    email: "victor.fournier@email.com",
    phone: "+33 6 45 67 89 01"
  },
  {
    id: 25,
    name: "Zoé Gauthier",
    photo: "https://i.pravatar.cc/150?img=32",
    title: "Data Engineer",
    location: "Toulouse, France",
    experience: 5,
    skills: [
      { name: "Python", level: 85 },
      { name: "Apache Spark", level: 80 },
      { name: "SQL", level: 90 },
      { name: "ETL", level: 85 },
      { name: "Airflow", level: 75 }
    ],
    softSkills: ["Rigueur", "Analytique", "Résolution de problèmes"],
    bio: "Data engineer avec 5 ans d'expérience. Spécialisée en pipelines de données et ETL.",
    availability: "Disponible immédiatement",
    salary: 54000,
    email: "zoe.gauthier@email.com",
    phone: "+33 6 56 78 90 12"
  },
  {
    id: 26,
    name: "Louis Perrin",
    photo: "https://i.pravatar.cc/150?img=33",
    title: "Tech Lead Full Stack",
    location: "Paris, France",
    experience: 8,
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "React", level: 90 },
      { name: "Node.js", level: 90 },
      { name: "Architecture", level: 85 },
      { name: "Leadership", level: 90 }
    ],
    softSkills: ["Leadership", "Mentoring", "Vision technique"],
    bio: "Tech Lead avec 8 ans d'expérience. Expert en architecture et management technique.",
    availability: "Disponible dans 2 mois",
    salary: 68000,
    email: "louis.perrin@email.com",
    phone: "+33 6 67 89 01 23"
  },
  {
    id: 27,
    name: "Anaïs Dufour",
    photo: "https://i.pravatar.cc/150?img=34",
    title: "Community Manager",
    location: "Bordeaux, France",
    experience: 4,
    skills: [
      { name: "Social Media", level: 90 },
      { name: "Content Creation", level: 85 },
      { name: "Community Management", level: 90 },
      { name: "Analytics", level: 75 },
      { name: "Canva", level: 80 }
    ],
    softSkills: ["Créativité", "Communication", "Réactivité"],
    bio: "Community manager avec 4 ans d'expérience. Passionnée par l'engagement communautaire.",
    availability: "Disponible immédiatement",
    salary: 38000,
    email: "anais.dufour@email.com",
    phone: "+33 6 78 90 12 34"
  },
  {
    id: 28,
    name: "Gabriel Roy",
    photo: "https://i.pravatar.cc/150?img=35",
    title: "Ingénieur Blockchain",
    location: "Paris, France",
    experience: 4,
    skills: [
      { name: "Solidity", level: 85 },
      { name: "Ethereum", level: 80 },
      { name: "Web3.js", level: 75 },
      { name: "Smart Contracts", level: 85 },
      { name: "JavaScript", level: 80 }
    ],
    softSkills: ["Innovation", "Autonomie", "Veille technologique"],
    bio: "Ingénieur blockchain avec 4 ans d'expérience. Spécialisé en smart contracts et DeFi.",
    availability: "Disponible dans 1 mois",
    salary: 58000,
    email: "gabriel.roy@email.com",
    phone: "+33 6 89 01 23 45"
  },
  {
    id: 29,
    name: "Jade Bertrand",
    photo: "https://i.pravatar.cc/150?img=36",
    title: "Développeuse Vue.js",
    location: "Nantes, France",
    experience: 3,
    skills: [
      { name: "Vue.js", level: 90 },
      { name: "Vuex", level: 80 },
      { name: "JavaScript", level: 85 },
      { name: "HTML/CSS", level: 85 },
      { name: "Nuxt.js", level: 75 }
    ],
    softSkills: ["Créativité", "Apprentissage rapide", "Collaboration"],
    bio: "Développeuse front-end spécialisée en Vue.js. Passionnée par les interfaces modernes.",
    availability: "Disponible immédiatement",
    salary: 44000,
    email: "jade.bertrand@email.com",
    phone: "+33 6 90 12 34 56"
  },
  {
    id: 30,
    name: "Arthur Marchand",
    photo: "https://i.pravatar.cc/150?img=37",
    title: "Architecte Solutions",
    location: "Lyon, France",
    experience: 10,
    skills: [
      { name: "Architecture", level: 95 },
      { name: "Cloud", level: 90 },
      { name: "Microservices", level: 90 },
      { name: "Domain-Driven Design", level: 85 },
      { name: "Leadership", level: 90 }
    ],
    softSkills: ["Vision stratégique", "Leadership", "Communication"],
    bio: "Architecte solutions avec 10 ans d'expérience. Expert en conception d'architectures complexes.",
    availability: "Disponible dans 3 mois",
    salary: 75000,
    email: "arthur.marchand@email.com",
    phone: "+33 6 01 23 45 67"
  },
  {
    id: 31,
    name: "Lina Chevalier",
    photo: "https://i.pravatar.cc/150?img=38",
    title: "Développeuse .NET",
    location: "Lille, France",
    experience: 5,
    skills: [
      { name: "C#", level: 90 },
      { name: ".NET Core", level: 85 },
      { name: "ASP.NET", level: 85 },
      { name: "SQL Server", level: 80 },
      { name: "Azure", level: 75 }
    ],
    softSkills: ["Rigueur", "Autonomie", "Travail d'équipe"],
    bio: "Développeuse .NET avec 5 ans d'expérience. Spécialisée en développement backend C#.",
    availability: "Disponible immédiatement",
    salary: 51000,
    email: "lina.chevalier@email.com",
    phone: "+33 6 12 34 56 78"
  },
  {
    id: 32,
    name: "Noah Giraud",
    photo: "https://i.pravatar.cc/150?img=39",
    title: "Consultant SAP",
    location: "Paris, France",
    experience: 6,
    skills: [
      { name: "SAP", level: 90 },
      { name: "ABAP", level: 80 },
      { name: "SAP HANA", level: 75 },
      { name: "Conseil", level: 85 },
      { name: "Gestion de projet", level: 80 }
    ],
    softSkills: ["Communication", "Analytique", "Adaptabilité"],
    bio: "Consultant SAP avec 6 ans d'expérience. Expert en implémentation et optimisation SAP.",
    availability: "Disponible dans 2 mois",
    salary: 60000,
    email: "noah.giraud@email.com",
    phone: "+33 6 23 45 67 89"
  },
  {
    id: 33,
    name: "Mila André",
    photo: "https://i.pravatar.cc/150?img=40",
    title: "Motion Designer",
    location: "Marseille, France",
    experience: 4,
    skills: [
      { name: "After Effects", level: 90 },
      { name: "Cinema 4D", level: 80 },
      { name: "Premiere Pro", level: 85 },
      { name: "Illustration", level: 75 },
      { name: "Animation", level: 90 }
    ],
    softSkills: ["Créativité", "Attention aux détails", "Gestion du temps"],
    bio: "Motion designer avec 4 ans d'expérience. Spécialisée en animation 2D/3D et vidéo.",
    availability: "Disponible immédiatement",
    salary: 42000,
    email: "mila.andre@email.com",
    phone: "+33 6 34 56 78 90"
  },
  {
    id: 34,
    name: "Ethan Faure",
    photo: "https://i.pravatar.cc/150?img=41",
    title: "Ingénieur Big Data",
    location: "Toulouse, France",
    experience: 6,
    skills: [
      { name: "Hadoop", level: 85 },
      { name: "Spark", level: 90 },
      { name: "Kafka", level: 80 },
      { name: "Python", level: 85 },
      { name: "Scala", level: 75 }
    ],
    softSkills: ["Analytique", "Résolution de problèmes", "Innovation"],
    bio: "Ingénieur Big Data avec 6 ans d'expérience. Expert en traitement de données massives.",
    availability: "Disponible dans 1 mois",
    salary: 58000,
    email: "ethan.faure@email.com",
    phone: "+33 6 45 67 89 01"
  },
  {
    id: 35,
    name: "Rose Lemoine",
    photo: "https://i.pravatar.cc/150?img=42",
    title: "Chef de Projet IT",
    location: "Paris, France",
    experience: 7,
    skills: [
      { name: "Gestion de projet", level: 90 },
      { name: "Agile", level: 85 },
      { name: "Budget", level: 80 },
      { name: "Stakeholder Management", level: 85 },
      { name: "PRINCE2", level: 75 }
    ],
    softSkills: ["Leadership", "Organisation", "Communication"],
    bio: "Chef de projet IT avec 7 ans d'expérience. Spécialisée en projets de transformation digitale.",
    availability: "Disponible immédiatement",
    salary: 62000,
    email: "rose.lemoine@email.com",
    phone: "+33 6 56 78 90 12"
  },
  {
    id: 36,
    name: "Adam Roussel",
    photo: "https://i.pravatar.cc/150?img=43",
    title: "Développeur Ruby on Rails",
    location: "Bordeaux, France",
    experience: 5,
    skills: [
      { name: "Ruby", level: 90 },
      { name: "Rails", level: 90 },
      { name: "PostgreSQL", level: 80 },
      { name: "Redis", level: 75 },
      { name: "TDD", level: 85 }
    ],
    softSkills: ["Rigueur", "Autonomie", "Collaboration"],
    bio: "Développeur Ruby on Rails avec 5 ans d'expérience. Passionné par le clean code et TDD.",
    availability: "Disponible dans 2 mois",
    salary: 50000,
    email: "adam.roussel@email.com",
    phone: "+33 6 67 89 01 23"
  },
  {
    id: 37,
    name: "Alice Barbier",
    photo: "https://i.pravatar.cc/150?img=44",
    title: "Responsable CRM",
    location: "Lyon, France",
    experience: 6,
    skills: [
      { name: "Salesforce", level: 85 },
      { name: "CRM Strategy", level: 90 },
      { name: "Marketing Automation", level: 80 },
      { name: "Analytics", level: 75 },
      { name: "Customer Success", level: 85 }
    ],
    softSkills: ["Stratégie", "Communication", "Orientation client"],
    bio: "Responsable CRM avec 6 ans d'expérience. Experte en Salesforce et stratégie client.",
    availability: "Disponible immédiatement",
    salary: 55000,
    email: "alice.barbier@email.com",
    phone: "+33 6 78 90 12 34"
  },
  {
    id: 38,
    name: "Tom Renaud",
    photo: "https://i.pravatar.cc/150?img=45",
    title: "Développeur Go",
    location: "Paris, France",
    experience: 4,
    skills: [
      { name: "Go", level: 90 },
      { name: "Microservices", level: 85 },
      { name: "Docker", level: 80 },
      { name: "gRPC", level: 75 },
      { name: "PostgreSQL", level: 80 }
    ],
    softSkills: ["Performance", "Autonomie", "Résolution de problèmes"],
    bio: "Développeur Go avec 4 ans d'expérience. Spécialisé en microservices haute performance.",
    availability: "Disponible dans 1 mois",
    salary: 52000,
    email: "tom.renaud@email.com",
    phone: "+33 6 89 01 23 45"
  },
  {
    id: 39,
    name: "Lily Masson",
    photo: "https://i.pravatar.cc/150?img=46",
    title: "UX Writer",
    location: "Nantes, France",
    experience: 3,
    skills: [
      { name: "UX Writing", level: 90 },
      { name: "Microcopy", level: 85 },
      { name: "Content Design", level: 80 },
      { name: "User Research", level: 75 },
      { name: "Figma", level: 70 }
    ],
    softSkills: ["Empathie", "Créativité", "Communication"],
    bio: "UX Writer avec 3 ans d'expérience. Spécialisée en création de contenus centrés utilisateur.",
    availability: "Disponible immédiatement",
    salary: 40000,
    email: "lily.masson@email.com",
    phone: "+33 6 90 12 34 56"
  },
  {
    id: 40,
    name: "Raphaël Fabre",
    photo: "https://i.pravatar.cc/150?img=47",
    title: "Ingénieur IA",
    location: "Paris, France",
    experience: 5,
    skills: [
      { name: "Python", level: 95 },
      { name: "Machine Learning", level: 90 },
      { name: "Deep Learning", level: 85 },
      { name: "Computer Vision", level: 80 },
      { name: "MLOps", level: 75 }
    ],
    softSkills: ["Innovation", "Analytique", "Recherche"],
    bio: "Ingénieur IA avec 5 ans d'expérience. Spécialisé en computer vision et deep learning.",
    availability: "Disponible dans 2 mois",
    salary: 64000,
    email: "raphael.fabre@email.com",
    phone: "+33 6 01 23 45 67"
  },
  {
    id: 41,
    name: "Eva Renault",
    photo: "https://i.pravatar.cc/150?img=48",
    title: "Développeuse Flutter",
    location: "Lille, France",
    experience: 3,
    skills: [
      { name: "Flutter", level: 90 },
      { name: "Dart", level: 85 },
      { name: "Firebase", level: 80 },
      { name: "iOS", level: 75 },
      { name: "Android", level: 75 }
    ],
    softSkills: ["Adaptabilité", "Créativité", "Apprentissage rapide"],
    bio: "Développeuse Flutter avec 3 ans d'expérience. Passionnée par le développement mobile cross-platform.",
    availability: "Disponible immédiatement",
    salary: 46000,
    email: "eva.renault@email.com",
    phone: "+33 6 12 34 56 78"
  },
  {
    id: 42,
    name: "Sacha Blanc",
    photo: "https://i.pravatar.cc/150?img=49",
    title: "Ingénieur Réseau",
    location: "Marseille, France",
    experience: 6,
    skills: [
      { name: "Cisco", level: 90 },
      { name: "Réseaux", level: 90 },
      { name: "Sécurité", level: 80 },
      { name: "VPN", level: 85 },
      { name: "Firewall", level: 80 }
    ],
    softSkills: ["Rigueur", "Résolution de problèmes", "Veille technologique"],
    bio: "Ingénieur réseau avec 6 ans d'expérience. Expert en infrastructure et sécurité réseau.",
    availability: "Disponible dans 1 mois",
    salary: 54000,
    email: "sacha.blanc@email.com",
    phone: "+33 6 23 45 67 89"
  },
  {
    id: 43,
    name: "Nora Picard",
    photo: "https://i.pravatar.cc/150?img=50",
    title: "Product Designer",
    location: "Paris, France",
    experience: 5,
    skills: [
      { name: "Product Design", level: 90 },
      { name: "Figma", level: 95 },
      { name: "User Research", level: 85 },
      { name: "Prototyping", level: 90 },
      { name: "Design System", level: 85 }
    ],
    softSkills: ["Créativité", "Empathie", "Vision produit"],
    bio: "Product designer avec 5 ans d'expérience. Spécialisée en design thinking et systèmes de design.",
    availability: "Disponible immédiatement",
    salary: 52000,
    email: "nora.picard@email.com",
    phone: "+33 6 34 56 78 90"
  },
  {
    id: 44,
    name: "Enzo Leclerc",
    photo: "https://i.pravatar.cc/150?img=51",
    title: "Développeur Rust",
    location: "Toulouse, France",
    experience: 4,
    skills: [
      { name: "Rust", level: 85 },
      { name: "Systems Programming", level: 80 },
      { name: "WebAssembly", level: 75 },
      { name: "Performance", level: 85 },
      { name: "Linux", level: 80 }
    ],
    softSkills: ["Rigueur", "Performance", "Innovation"],
    bio: "Développeur Rust avec 4 ans d'expérience. Passionné par la programmation système et performance.",
    availability: "Disponible dans 2 mois",
    salary: 56000,
    email: "enzo.leclerc@email.com",
    phone: "+33 6 45 67 89 01"
  },
  {
    id: 45,
    name: "Maya Durand",
    photo: "https://i.pravatar.cc/150?img=52",
    title: "Responsable E-commerce",
    location: "Bordeaux, France",
    experience: 6,
    skills: [
      { name: "E-commerce", level: 90 },
      { name: "Shopify", level: 85 },
      { name: "Marketing Digital", level: 85 },
      { name: "Analytics", level: 80 },
      { name: "CRO", level: 80 }
    ],
    softSkills: ["Stratégie", "Orientation résultats", "Créativité"],
    bio: "Responsable e-commerce avec 6 ans d'expérience. Experte en optimisation de conversion.",
    availability: "Disponible immédiatement",
    salary: 53000,
    email: "maya.durand@email.com",
    phone: "+33 6 56 78 90 12"
  },
  {
    id: 46,
    name: "Léo Vidal",
    photo: "https://i.pravatar.cc/150?img=53",
    title: "Développeur Elixir",
    location: "Lyon, France",
    experience: 4,
    skills: [
      { name: "Elixir", level: 85 },
      { name: "Phoenix", level: 80 },
      { name: "Erlang", level: 70 },
      { name: "PostgreSQL", level: 80 },
      { name: "Functional Programming", level: 85 }
    ],
    softSkills: ["Innovation", "Autonomie", "Résolution de problèmes"],
    bio: "Développeur Elixir avec 4 ans d'expérience. Passionné par la programmation fonctionnelle.",
    availability: "Disponible dans 1 mois",
    salary: 52000,
    email: "leo.vidal@email.com",
    phone: "+33 6 67 89 01 23"
  },
  {
    id: 47,
    name: "Ambre Girard",
    photo: "https://i.pravatar.cc/150?img=54",
    title: "SEO Manager",
    location: "Paris, France",
    experience: 5,
    skills: [
      { name: "SEO", level: 95 },
      { name: "Google Analytics", level: 85 },
      { name: "SEMrush", level: 80 },
      { name: "Content Strategy", level: 85 },
      { name: "Technical SEO", level: 80 }
    ],
    softSkills: ["Analytique", "Stratégie", "Veille"],
    bio: "SEO Manager avec 5 ans d'expérience. Experte en référencement naturel et stratégie de contenu.",
    availability: "Disponible immédiatement",
    salary: 50000,
    email: "ambre.girard@email.com",
    phone: "+33 6 78 90 12 34"
  },
  {
    id: 48,
    name: "Mathis Caron",
    photo: "https://i.pravatar.cc/150?img=55",
    title: "Développeur Scala",
    location: "Nantes, France",
    experience: 5,
    skills: [
      { name: "Scala", level: 90 },
      { name: "Akka", level: 80 },
      { name: "Spark", level: 75 },
      { name: "Functional Programming", level: 85 },
      { name: "Kafka", level: 75 }
    ],
    softSkills: ["Analytique", "Rigueur", "Innovation"],
    bio: "Développeur Scala avec 5 ans d'expérience. Spécialisé en systèmes distribués et Big Data.",
    availability: "Disponible dans 2 mois",
    salary: 58000,
    email: "mathis.caron@email.com",
    phone: "+33 6 89 01 23 45"
  },
  {
    id: 49,
    name: "Luna Perrot",
    photo: "https://i.pravatar.cc/150?img=56",
    title: "Brand Designer",
    location: "Lille, France",
    experience: 4,
    skills: [
      { name: "Branding", level: 90 },
      { name: "Illustrator", level: 90 },
      { name: "Photoshop", level: 85 },
      { name: "Typography", level: 85 },
      { name: "Identity Design", level: 90 }
    ],
    softSkills: ["Créativité", "Vision artistique", "Communication"],
    bio: "Brand designer avec 4 ans d'expérience. Spécialisée en identité visuelle et branding.",
    availability: "Disponible immédiatement",
    salary: 44000,
    email: "luna.perrot@email.com",
    phone: "+33 6 90 12 34 56"
  },
  {
    id: 50,
    name: "Axel Meunier",
    photo: "https://i.pravatar.cc/150?img=57",
    title: "Ingénieur SRE",
    location: "Paris, France",
    experience: 6,
    skills: [
      { name: "SRE", level: 90 },
      { name: "Kubernetes", level: 90 },
      { name: "Monitoring", level: 85 },
      { name: "Terraform", level: 85 },
      { name: "Python", level: 80 }
    ],
    softSkills: ["Fiabilité", "Résolution de problèmes", "Automatisation"],
    bio: "Ingénieur SRE avec 6 ans d'expérience. Expert en fiabilité et performance des systèmes.",
    availability: "Disponible dans 1 mois",
    salary: 62000,
    email: "axel.meunier@email.com",
    phone: "+33 6 01 23 45 67"
  }
];

export const mockJobs = [
  {
    id: 1,
    title: "Développeur Python Senior",
    company: "TechCorp",
    description: "Nous recherchons un développeur Python senior pour rejoindre notre équipe backend.",
    requirements: {
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      experience: 5,
      softSkills: ["Leadership", "Communication"]
    },
    salary: { min: 50000, max: 60000 },
    location: "Paris, France",
    remote: true,
    status: "open",
    postedDate: "2024-01-15",
    contractType: "CDI",
    recruiter: {
      id: "recruiter-1",
      name: "Marie Dupont",
      email: "marie.dupont@techcorp.com",
      phone: "+33 6 11 22 33 44",
      role: "Senior Tech Recruiter",
      canChat: true
    }
  },
  {
    id: 2,
    title: "Développeur Full Stack React/Node",
    company: "StartupXYZ",
    description: "Rejoignez notre startup en pleine croissance pour développer notre plateforme SaaS.",
    requirements: {
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      experience: 3,
      softSkills: ["Adaptabilité", "Travail d'équipe"]
    },
    salary: { min: 45000, max: 55000 },
    location: "Lyon, France",
    remote: false,
    status: "open",
    postedDate: "2024-01-20",
    contractType: "CDI",
    recruiter: {
      id: "recruiter-2",
      name: "Thomas Laurent",
      email: "thomas@startupxyz.com",
      phone: "+33 6 22 33 44 55",
      role: "Talent Acquisition Manager",
      canChat: true
    }
  },
  {
    id: 3,
    title: "Chef de Projet Digital",
    company: "Digital Agency",
    description: "Pilotez des projets digitaux d'envergure pour nos clients grands comptes.",
    requirements: {
      skills: ["Gestion de projet", "Agile/Scrum", "Product Management"],
      experience: 7,
      softSkills: ["Leadership", "Organisation", "Communication"]
    },
    salary: { min: 55000, max: 65000 },
    location: "Paris, France",
    remote: true,
    status: "open",
    postedDate: "2024-01-10",
    contractType: "CDI",
    recruiter: {
      id: "recruiter-3",
      name: "Sophie Bernard",
      email: "sophie@digitalagency.fr",
      phone: "+33 6 33 44 55 66",
      role: "HR Manager",
      canChat: true
    }
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataLab",
    description: "Développez des modèles de machine learning pour nos projets d'IA.",
    requirements: {
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
      experience: 4,
      softSkills: ["Analytique", "Curiosité"]
    },
    salary: { min: 50000, max: 58000 },
    location: "Toulouse, France",
    status: "open",
    postedDate: "2024-01-18",
    type: "CDI"
  },
  {
    id: 5,
    title: "Designer UX/UI Senior",
    company: "CreativeStudio",
    description: "Créez des expériences utilisateur exceptionnelles pour nos clients.",
    requirements: {
      skills: ["Figma", "User Research", "Prototyping", "Design System"],
      experience: 6,
      softSkills: ["Créativité", "Empathie", "Collaboration"]
    },
    salary: { min: 52000, max: 62000 },
    location: "Paris, France",
    status: "open",
    postedDate: "2024-01-12",
    type: "CDI"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudTech",
    description: "Automatisez et optimisez notre infrastructure cloud.",
    requirements: {
      skills: ["Kubernetes", "Docker", "CI/CD", "AWS"],
      experience: 5,
      softSkills: ["Autonomie", "Résolution de problèmes"]
    },
    salary: { min: 54000, max: 64000 },
    location: "Nantes, France",
    status: "open",
    postedDate: "2024-01-22",
    type: "CDI"
  },
  {
    id: 7,
    title: "Responsable Marketing Digital",
    company: "MarketPro",
    description: "Pilotez notre stratégie d'acquisition digitale.",
    requirements: {
      skills: ["SEO/SEA", "Google Analytics", "Content Marketing"],
      experience: 5,
      softSkills: ["Créativité", "Stratégie", "Communication"]
    },
    salary: { min: 48000, max: 56000 },
    location: "Bordeaux, France",
    status: "open",
    postedDate: "2024-01-14",
    type: "CDI"
  },
  {
    id: 8,
    title: "Développeur Mobile React Native",
    company: "MobileFirst",
    description: "Développez notre application mobile cross-platform.",
    requirements: {
      skills: ["React Native", "JavaScript", "iOS", "Android"],
      experience: 3,
      softSkills: ["Adaptabilité", "Travail d'équipe"]
    },
    salary: { min: 45000, max: 52000 },
    location: "Paris, France",
    status: "open",
    postedDate: "2024-01-16",
    type: "CDI"
  },
  {
    id: 9,
    title: "Business Analyst",
    company: "ConsultCorp",
    description: "Analysez les besoins métiers et proposez des solutions innovantes.",
    requirements: {
      skills: ["Analyse métier", "SQL", "Power BI", "Excel avancé"],
      experience: 4,
      softSkills: ["Analytique", "Communication", "Rigueur"]
    },
    salary: { min: 44000, max: 52000 },
    location: "Lyon, France",
    status: "open",
    postedDate: "2024-01-19",
    type: "CDI"
  },
  {
    id: 10,
    title: "Architecte Cloud AWS",
    company: "CloudExperts",
    description: "Concevez des architectures cloud scalables et sécurisées.",
    requirements: {
      skills: ["AWS", "Architecture", "Sécurité", "Microservices"],
      experience: 8,
      softSkills: ["Leadership", "Vision stratégique", "Mentoring"]
    },
    salary: { min: 68000, max: 78000 },
    location: "Paris, France",
    status: "open",
    postedDate: "2024-01-11",
    type: "CDI"
  },
  {
    id: 11,
    title: "Développeur Java/Spring",
    company: "EnterpriseSoft",
    description: "Développez des applications d'entreprise robustes.",
    requirements: {
      skills: ["Java", "Spring Boot", "Microservices", "MySQL"],
      experience: 5,
      softSkills: ["Rigueur", "Travail d'équipe", "Autonomie"]
    },
    salary: { min: 48000, max: 56000 },
    location: "Lille, France",
    status: "open",
    postedDate: "2024-01-17",
    type: "CDI"
  },
  {
    id: 12,
    title: "Product Owner",
    company: "ProductCo",
    description: "Définissez la vision produit et priorisez le backlog.",
    requirements: {
      skills: ["Product Management", "Agile", "User Stories", "Analytics"],
      experience: 5,
      softSkills: ["Vision produit", "Communication", "Priorisation"]
    },
    salary: { min: 56000, max: 64000 },
    location: "Paris, France",
    status: "open",
    postedDate: "2024-01-13",
    type: "CDI"
  },
  {
    id: 13,
    title: "Développeur Front-End Angular",
    company: "WebAgency",
    description: "Créez des interfaces web modernes et performantes.",
    requirements: {
      skills: ["Angular", "TypeScript", "RxJS", "HTML/CSS"],
      experience: 4,
      softSkills: ["Créativité", "Attention aux détails", "Collaboration"]
    },
    salary: { min: 44000, max: 52000 },
    location: "Marseille, France",
    status: "open",
    postedDate: "2024-01-21",
    type: "CDI"
  },
  {
    id: 14,
    title: "Ingénieur Cybersécurité",
    company: "SecureIT",
    description: "Protégez nos systèmes contre les menaces cyber.",
    requirements: {
      skills: ["Sécurité réseau", "Pentesting", "SIEM", "Cryptographie"],
      experience: 6,
      softSkills: ["Rigueur", "Analytique", "Veille technologique"]
    },
    salary: { min: 60000, max: 70000 },
    location: "Paris, France",
    status: "open",
    postedDate: "2024-01-09",
    type: "CDI"
  },
  {
    id: 15,
    title: "Scrum Master",
    company: "AgileTeam",
    description: "Accompagnez nos équipes dans leur transformation agile.",
    requirements: {
      skills: ["Scrum", "Facilitation", "Coaching", "Jira"],
      experience: 4,
      softSkills: ["Leadership", "Communication", "Empathie"]
    },
    salary: { min: 50000, max: 58000 },
    location: "Lyon, France",
    status: "open",
    postedDate: "2024-01-15",
    type: "CDI"
  },
  {
    id: 16,
    title: "Développeur Backend Node.js",
    company: "APIFirst",
    description: "Développez des APIs RESTful performantes.",
    requirements: {
      skills: ["Node.js", "Express", "MongoDB", "REST API"],
      experience: 4,
      softSkills: ["Autonomie", "Résolution de problèmes", "Collaboration"]
    },
    salary: { min: 46000, max: 54000 },
    location: "Nantes, France",
    status: "open",
    postedDate: "2024-01-18",
    type: "CDI"
  },
  {
    id: 17,
    title: "Content Manager",
    company: "ContentHub",
    description: "Créez et gérez notre stratégie de contenu.",
    requirements: {
      skills: ["Rédaction web", "SEO", "WordPress", "Content Strategy"],
      experience: 4,
      softSkills: ["Créativité", "Organisation", "Communication"]
    },
    salary: { min: 40000, max: 48000 },
    location: "Bordeaux, France",
    status: "open",
    postedDate: "2024-01-20",
    type: "CDI"
  },
  {
    id: 18,
    title: "Ingénieur Machine Learning",
    company: "AI Labs",
    description: "Développez des modèles d'IA de pointe.",
    requirements: {
      skills: ["Python", "TensorFlow", "Deep Learning", "NLP"],
      experience: 5,
      softSkills: ["Analytique", "Curiosité", "Innovation"]
    },
    salary: { min: 62000, max: 72000 },
    location: "Paris, France",
    status: "open",
    postedDate: "2024-01-12",
    type: "CDI"
  },
  {
    id: 19,
    title: "QA Engineer",
    company: "QualityFirst",
    description: "Assurez la qualité de nos applications.",
    requirements: {
      skills: ["Tests automatisés", "Selenium", "Jest", "Cypress"],
      experience: 3,
      softSkills: ["Rigueur", "Attention aux détails", "Communication"]
    },
    salary: { min: 42000, max: 50000 },
    location: "Toulouse, France",
    status: "open",
    postedDate: "2024-01-16",
    type: "CDI"
  },
  {
    id: 20,
    title: "Développeur PHP/Symfony",
    company: "WebDev",
    description: "Développez des applications web avec Symfony.",
    requirements: {
      skills: ["PHP", "Symfony", "MySQL", "API Platform"],
      experience: 5,
      softSkills: ["Rigueur", "Travail d'équipe", "Autonomie"]
    },
    salary: { min: 46000, max: 54000 },
    location: "Lille, France",
    status: "open",
    postedDate: "2024-01-14",
    type: "CDI"
  },
  {
    id: 21,
    title: "UX Researcher",
    company: "UserCentric",
    description: "Menez des recherches utilisateurs pour améliorer nos produits.",
    requirements: {
      skills: ["User Research", "Tests utilisateurs", "Personas", "Analytics"],
      experience: 4,
      softSkills: ["Empathie", "Analytique", "Communication"]
    },
    salary: { min: 44000, max: 52000 },
    location: "Paris, France",
    status: "open",
    postedDate: "2024-01-19",
    type: "CDI"
  },
  {
    id: 22,
    title: "Développeur iOS Swift",
    company: "AppleDevs",
    description: "Créez des applications iOS natives.",
    requirements: {
      skills: ["Swift", "iOS", "SwiftUI", "Core Data"],
      experience: 5,
      softSkills: ["Créativité", "Attention aux détails", "Autonomie"]
    },
    salary: { min: 50000, max: 58000 },
    location: "Lyon, France",
    status: "open",
    postedDate: "2024-01-11",
    type: "CDI"
  },
  {
    id: 23,
    title: "Growth Hacker",
    company: "GrowthLab",
    description: "Accélérez notre croissance avec des stratégies innovantes.",
    requirements: {
      skills: ["Growth Marketing", "A/B Testing", "Analytics", "SEO"],
      experience: 3,
      softSkills: ["Créativité", "Analytique", "Expérimentation"]
    },
    salary: { min: 43000, max: 51000 },
    location: "Paris, France",
    status: "open",
    postedDate: "2024-01-17",
    type: "CDI"
  },
  {
    id: 24,
    title: "Développeur Android Kotlin",
    company: "AndroidPro",
    description: "Développez des applications Android modernes.",
    requirements: {
      skills: ["Kotlin", "Android", "Jetpack Compose", "MVVM"],
      experience: 4,
      softSkills: ["Autonomie", "Curiosité", "Collaboration"]
    },
    salary: { min: 48000, max: 56000 },
    location: "Marseille, France",
    status: "open",
    postedDate: "2024-01-13",
    type: "CDI"
  },
  {
    id: 25,
    title: "Data Engineer",
    company: "DataPipeline",
    description: "Construisez des pipelines de données robustes.",
    requirements: {
      skills: ["Python", "Apache Spark", "SQL", "ETL", "Airflow"],
      experience: 5,
      softSkills: ["Rigueur", "Analytique", "Résolution de problèmes"]
    },
    salary: { min: 52000, max: 60000 },
    location: "Toulouse, France",
    status: "open",
    postedDate: "2024-01-15",
    type: "CDI"
  },
  {
    id: 26,
    title: "Tech Lead Full Stack",
    company: "TechLeaders",
    description: "Guidez notre équipe technique vers l'excellence.",
    requirements: {
      skills: ["JavaScript", "React", "Node.js", "Architecture", "Leadership"],
      experience: 8,
      softSkills: ["Leadership", "Mentoring", "Vision technique"]
    },
    salary: { min: 66000, max: 76000 },
    location: "Paris, France",
    status: "open",
    postedDate: "2024-01-10",
    type: "CDI"
  },
  {
    id: 27,
    title: "Community Manager",
    company: "SocialBrand",
    description: "Animez nos communautés sur les réseaux sociaux.",
    requirements: {
      skills: ["Social Media", "Content Creation", "Community Management"],
      experience: 3,
      softSkills: ["Créativité", "Communication", "Réactivité"]
    },
    salary: { min: 36000, max: 44000 },
    location: "Bordeaux, France",
    status: "open",
    postedDate: "2024-01-21",
    type: "CDI"
  },
  {
    id: 28,
    title: "Ingénieur Blockchain",
    company: "CryptoTech",
    description: "Développez des solutions blockchain innovantes.",
    requirements: {
      skills: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts"],
      experience: 4,
      softSkills: ["Innovation", "Autonomie", "Veille technologique"]
    },
    salary: { min: 56000, max: 66000 },
    location: "Paris, France",
    status: "open",
    postedDate: "2024-01-12",
    type: "CDI"
  },
  {
    id: 29,
    title: "Développeur Vue.js",
    company: "VueDevs",
    description: "Créez des applications web avec Vue.js.",
    requirements: {
      skills: ["Vue.js", "Vuex", "JavaScript", "HTML/CSS"],
      experience: 3,
      softSkills: ["Créativité", "Apprentissage rapide", "Collaboration"]
    },
    salary: { min: 42000, max: 50000 },
    location: "Nantes, France",
    status: "open",
    postedDate: "2024-01-18",
    type: "CDI"
  },
  {
    id: 30,
    title: "Architecte Solutions",
    company: "ArchitectPro",
    description: "Concevez des architectures logicielles complexes.",
    requirements: {
      skills: ["Architecture", "Cloud", "Microservices", "Domain-Driven Design"],
      experience: 10,
      softSkills: ["Vision stratégique", "Leadership", "Communication"]
    },
    salary: { min: 73000, max: 83000 },
    location: "Lyon, France",
    status: "open",
    postedDate: "2024-01-09",
    type: "CDI"
  }
];

export const mockApplications = [
  { id: 1, candidateId: 1, jobId: 1, status: "interview", appliedDate: "2024-01-16", notes: "Excellent profil technique" },
  { id: 2, candidateId: 2, jobId: 2, status: "screening", appliedDate: "2024-01-21", notes: "" },
  { id: 3, candidateId: 5, jobId: 5, status: "offer", appliedDate: "2024-01-13", notes: "Portfolio impressionnant" },
  { id: 4, candidateId: 6, jobId: 6, status: "interview", appliedDate: "2024-01-23", notes: "" },
  { id: 5, candidateId: 10, jobId: 10, status: "hired", appliedDate: "2024-01-12", notes: "Embauché!" },
];

