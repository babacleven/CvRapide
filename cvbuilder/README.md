# 📄 CVBuilder

Un générateur de CV moderne et élégant pour créer et télécharger votre CV en PDF en quelques minutes.

**[Visiter l'application →](https://cvbuilder-alpha.vercel.app)**

## ✨ Fonctionnalités

- 🎨 **Multiples templates** - Classic, Modern, Minimal, Bold
- 📥 **Export PDF** - Téléchargez votre CV directement
- 🎭 **Aperçu en direct** - Voyez les changements en temps réel
- 📱 **Responsive** - Fonctionne sur tous les appareils
- 🎉 **Interface ludique** - Animations et effets visuels
- 💾 **Données persistantes** - Votre CV est sauvegardé

## 🛠️ Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Next.js** | 16.2.3 | Framework React |
| **React** | 19.2.5 | UI Library |
| **TypeScript** | 5 | Typage statique |
| **Tailwind CSS** | 3.4.1 | Styling |
| **DaisyUI** | 4.12.22 | Composants UI |
| **jsPDF** | 4.2.1 | Génération PDF |
| **html2canvas-pro** | 1.5.8 | Capture HTML |
| **Lucide React** | 0.468.0 | Icônes SVG |

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/babacleven/cvbuilder.git
cd cvbuilder

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📚 Structure du Projet

```
cvbuilder/
├── app/                  # Application Next.js
│   ├── layout.tsx       # Layout global
│   ├── page.tsx         # Page principale
│   └── ...
├── public/              # Assets statiques
├── type.ts              # Types TypeScript
├── presets.ts           # Données d'exemple
├── package.json         # Dépendances
├── tailwind.config.ts   # Configuration Tailwind
├── tsconfig.json        # Configuration TypeScript
└── next.config.ts       # Configuration Next.js
```

## 📋 Types de Données

Le CV est structuré autour de ces éléments :

```typescript
// Informations personnelles
PersonalDetails {
  fullName, email, phone, address, photoUrl, description, postSeeking
}

// Expérience professionnelle
Experience {
  jobTitle, companyName, startDate, endDate, description
}

// Formation
Education {
  school, degree, startDate, endDate, description
}

// Compétences
Skill { name }

// Langues
Language { language, proficiency }

// Loisirs
Hobby { name }
```

## 🎯 Cas d'Usage

Parfait pour :
- 👔 Créer un CV professionnel
- 🎓 Candidatures à des postes
- 📊 Portfolio en ligne
- 💼 Candidatures internationales

## 🛣️ Roadmap

- [ ] Sauvegarde en base de données
- [ ] Authentification utilisateur
- [ ] Plus de templates (10+)
- [ ] Export DOCX
- [ ] Partage de CV
- [ ] Thème clair/sombre

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer :

1. Fork le repository
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 License

Ce projet est open source et disponible sous la licence MIT.

## 📞 Support

Pour toute question ou problème, ouvrez une [issue](https://github.com/babacleven/cvbuilder/issues).

---

**Créé avec ❤️ par [babacleven](https://github.com/babacleven)**
