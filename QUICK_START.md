# 🚀 Quick Start Guide

## Installation Rapide

### 1. Installer les dépendances

```bash
npm install
```

**Note**: Les erreurs TypeScript actuelles sont normales - elles disparaîtront après l'installation des dépendances.

### 2. Créer le fichier .env.local

Copiez `.env.example` vers `.env.local` et remplissez vos clés :

```bash
cp .env.example .env.local
```

### 3. Configuration minimale pour tester

Pour démarrer rapidement en mode développement, vous avez besoin de :

#### Firebase (Obligatoire)
1. Créez un projet sur https://console.firebase.google.com/
2. Activez Authentication > Email/Password
3. Créez une base Firestore
4. Copiez les clés dans `.env.local`

#### Stripe (Obligatoire pour les paiements)
1. Créez un compte sur https://stripe.com
2. Mode test : récupérez les clés de test
3. Ajoutez-les dans `.env.local`

#### Replicate (Obligatoire pour le traitement IA)
1. Créez un compte sur https://replicate.com
2. Récupérez votre token API
3. Ajoutez-le dans `.env.local`

### 4. Lancer le serveur

```bash
npm run dev
```

Ouvrez http://localhost:3000

## 🎯 Fonctionnalités Disponibles

### ✅ Prêt à l'emploi
- Page d'accueil avec présentation
- Système d'authentification (Email + Google)
- Upload de fichiers
- Éditeur canvas pour sélection de zones
- Système de crédits
- Pages légales (CGU, Privacy, DMCA)

### ⚙️ Nécessite Configuration
- **Traitement IA** : Nécessite token Replicate
- **Paiements** : Nécessite configuration Stripe complète
- **Stockage fichiers** : Actuellement local (à migrer vers Firebase Storage en production)

## 📝 Checklist Avant Premier Test

- [ ] `npm install` exécuté avec succès
- [ ] `.env.local` créé avec toutes les variables
- [ ] Firebase configuré (Auth + Firestore)
- [ ] Stripe configuré (clés test)
- [ ] Replicate configuré (token API)
- [ ] `npm run dev` démarre sans erreur

## 🧪 Test Rapide

1. **Créer un compte**
   - Allez sur http://localhost:3000/login
   - Créez un compte avec email/password
   - Vous recevez 20 crédits gratuits

2. **Tester l'upload**
   - Allez sur http://localhost:3000/app
   - Uploadez une image
   - Sélectionnez une zone avec le brush
   - Validez (nécessite Replicate configuré)

3. **Tester les paiements**
   - Allez sur la page d'accueil
   - Section pricing
   - Cliquez sur "Choisir ce pack"
   - Utilisez une carte test Stripe : `4242 4242 4242 4242`

## ⚠️ Problèmes Courants

### Erreur "Module not found"
```bash
# Solution
npm install
```

### Erreur Firebase
- Vérifiez que toutes les clés Firebase sont correctes
- Vérifiez que Authentication est activé
- Vérifiez que Firestore est créé

### Erreur Stripe
- Vérifiez que vous utilisez les clés TEST (pk_test_ et sk_test_)
- Le webhook n'est pas nécessaire en développement local

### Erreur Replicate
- Vérifiez que votre token est valide
- Vérifiez votre quota API

## 📚 Documentation Complète

- **README.md** : Documentation complète du projet
- **DEPLOYMENT.md** : Guide de déploiement en production
- **Code** : Tous les fichiers sont commentés

## 🎨 Personnalisation

### Modifier les couleurs
Éditez `app/globals.css` pour changer le thème.

### Modifier les prix
Éditez `lib/stripe.ts` pour ajuster les packs de crédits.

### Modifier les coûts en crédits
Éditez `lib/utils.ts` dans la fonction `calculateCost()`.

## 🚀 Prochaines Étapes

1. **Tester localement** avec les configurations minimales
2. **Personnaliser** le design et les textes
3. **Configurer Firebase Storage** pour les fichiers en production
4. **Configurer Stripe Webhook** pour la production
5. **Déployer sur Vercel** (voir DEPLOYMENT.md)

## 💡 Conseils

- Utilisez toujours les clés TEST en développement
- Ne commitez JAMAIS le fichier `.env.local`
- Testez les paiements avec les cartes test Stripe
- Surveillez votre quota Replicate

## 📧 Besoin d'Aide ?

Consultez :
- README.md pour la documentation complète
- DEPLOYMENT.md pour le déploiement
- Les commentaires dans le code

---

**Bon développement ! 🎉**
