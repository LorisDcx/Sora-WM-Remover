# AI Video & Image Cleaner 🎨

Une application SaaS moderne permettant de retirer des filigranes, objets ou éléments gênants de vos propres images et vidéos grâce à l'IA.

## 🎯 Caractéristiques

- **Upload & Processing** : Interface intuitive pour uploader et traiter des images/vidéos
- **Éditeur Canvas** : Sélection précise des zones à nettoyer avec un brush personnalisable
- **Système de Crédits** : Modèle freemium avec 20 crédits gratuits à l'inscription
- **Paiements Stripe** : Achat de packs de crédits sécurisé
- **Authentification Firebase** : Connexion email/password ou Google
- **100% Légal** : Conçu pour une utilisation uniquement sur vos propres contenus
- **Responsive** : Interface optimisée desktop et mobile

## 🛠️ Stack Technique

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **TailwindCSS** - Styling moderne
- **shadcn/ui** - Composants UI de qualité
- **Lucide React** - Icônes

### Backend
- **Next.js API Routes** - Endpoints serverless
- **Firebase** - Authentication & Firestore Database
- **Stripe** - Gestion des paiements
- **Replicate** - Traitement IA (Stable Diffusion Inpainting)

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Firebase
- Compte Stripe
- Compte Replicate

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd "SORA WM Remover"
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Replicate API
REPLICATE_API_TOKEN=r8_...

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configuration Firebase

1. Créez un projet sur [Firebase Console](https://console.firebase.google.com/)
2. Activez Authentication (Email/Password et Google)
3. Créez une base Firestore
4. Ajoutez les règles Firestore :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Configuration Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Récupérez vos clés API (test mode)
3. Configurez un webhook pointant vers `https://votre-domaine.com/api/webhook`
4. Sélectionnez l'événement `checkout.session.completed`

### 6. Configuration Replicate

1. Créez un compte sur [Replicate](https://replicate.com)
2. Récupérez votre token API
3. Le modèle utilisé : `stability-ai/stable-diffusion-inpainting`

### 7. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
├── app/
│   ├── api/              # API Routes
│   │   ├── upload/       # Upload de fichiers
│   │   ├── process/      # Traitement IA
│   │   ├── credits/      # Gestion des crédits
│   │   ├── checkout/     # Stripe checkout
│   │   └── webhook/      # Stripe webhooks
│   ├── app/              # Application principale
│   ├── legal/            # Pages légales (CGU, Privacy, DMCA)
│   ├── login/            # Page de connexion
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Page d'accueil
│   └── globals.css       # Styles globaux
├── components/
│   ├── ui/               # Composants shadcn/ui
│   ├── FileUploader.tsx  # Upload de fichiers
│   ├── CanvasEditor.tsx  # Éditeur de masque
│   └── CreditDisplay.tsx # Affichage des crédits
├── lib/
│   ├── firebase.ts       # Configuration Firebase
│   ├── stripe.ts         # Configuration Stripe
│   └── utils.ts          # Utilitaires
└── public/
    └── uploads/          # Fichiers uploadés (temporaires)
```

## 💳 Système de Crédits

| Pack | Prix | Crédits | Prix/crédit |
|------|------|---------|-------------|
| Starter | 5€ | 100 | 0.05€ |
| Pro | 15€ | 400 | 0.0375€ |
| Studio | 40€ | 1000 | 0.04€ |

### Consommation

- **Image HD** : 5 crédits
- **Vidéo 1s HD** : 8 crédits
- **Vidéo 1s 4K** : 16 crédits

## 🚀 Déploiement

### Vercel (Recommandé)

1. Pushez votre code sur GitHub
2. Importez le projet sur [Vercel](https://vercel.com)
3. Ajoutez toutes les variables d'environnement
4. Déployez !

### Autres plateformes

L'application peut être déployée sur toute plateforme supportant Next.js :
- Netlify
- Railway
- Render
- AWS Amplify

## ⚖️ Conformité Légale

### Utilisation Légale Uniquement

Cette application est conçue pour être utilisée **uniquement sur des contenus dont vous détenez les droits**. 

**Interdictions strictes** :
- ❌ Retirer des filigranes de contenus tiers
- ❌ Modifier des œuvres protégées sans autorisation
- ❌ Contourner des mesures de protection
- ❌ Violer des droits de propriété intellectuelle

### Protection des données (RGPD)

- Suppression automatique des fichiers après 48h
- Pas de revente de données
- Droit d'accès, rectification et suppression
- Stockage sécurisé sur Firebase

### DMCA

Procédure de signalement disponible sur `/legal/dmca`

## 🔒 Sécurité

- Authentification Firebase sécurisée
- Paiements via Stripe (PCI-DSS compliant)
- Validation côté serveur
- Suppression automatique des fichiers
- Variables d'environnement pour les secrets

## 🧪 Tests

```bash
# Lancer les tests (à configurer)
npm test

# Linter
npm run lint

# Build de production
npm run build
```

## 📝 TODO / Améliorations Futures

- [ ] Support de plus de formats vidéo
- [ ] Traitement batch (plusieurs fichiers)
- [ ] API publique pour B2B
- [ ] Mode hors-ligne avec PWA
- [ ] Historique des traitements étendu
- [ ] Système d'affiliation
- [ ] Tests unitaires et E2E
- [ ] Mode sombre
- [ ] Support multilingue

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📧 Contact

- Email : support@aicleaner.com
- DMCA : dmca@aicleaner.com

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)
- [Stripe](https://stripe.com/)
- [Replicate](https://replicate.com/)
- [Lucide Icons](https://lucide.dev/)

---

**⚠️ Rappel Important** : Cet outil doit être utilisé de manière responsable et légale. L'utilisation sur des contenus dont vous ne détenez pas les droits est strictement interdite et peut entraîner des poursuites judiciaires.
