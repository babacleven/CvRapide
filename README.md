# CvRapide

Générateur de CV en ligne, moderne et rapide. Créez, personnalisez et téléchargez votre CV en PDF en quelques minutes.

## Fonctionnalités

**6 modèles de CV** - Classique, Moderne, Minimaliste, Audacieux, Profil, Compétences
**Export PDF** - Téléchargement haute qualité en un clic
**Aperçu en direct** - Les modifications s'affichent en temps réel
**Thèmes multiples** - 33 thèmes de couleurs via DaisyUI
**Interface ludique** - Animations, confettis et effets visuels
**Données persistantes** - CV sauvegardé automatiquement dans le navigateur
**Responsive** - Utilisable sur tous les appareils

## Stack Technique

| Technologie | Usage |
|-------------|-------|
| **Next.js 16** | Framework React |
| **React 19** | UI Library |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styling |
| **DaisyUI** | Composants UI |
| **jsPDF + html2canvas-pro** | Génération PDF |
| **Lucide React** | Icônes SVG |

## Démarrage Rapide

### Prérequis

Node.js 18+
npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/babacleven/CvRapide.git
cd CvRapide/cvbuilder

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du Projet

```
CvRapide/
└── cvbuilder/            # Application Next.js
    ├── app/              # Pages et composants
    │   ├── page.tsx      # Landing page
    │   ├── builder/      # Éditeur de CV
    │   └── components/   # Formulaires et templates
    ├── public/           # Assets statiques
    ├── type.ts           # Types TypeScript
    ├── presets.ts        # Données d'exemple
    └── package.json      # Dépendances
```

## Utilisation

1. Rendez-vous sur `/builder`
2. Remplissez vos informations (profil, expérience, formation, compétences, langues, loisirs)
3. Choisissez un modèle et un thème
4. Exportez votre CV en PDF

## Contribution

1. Fork le repository
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## License

Projet sous licence MIT - voir [LICENSE](cvbuilder/LICENSE).

---

**Créé avec amour par [babacleven](https://github.com/babacleven)**
