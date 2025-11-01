# Guide de Déploiement - AI Video & Image Cleaner

## 📋 Checklist Pré-Déploiement

Avant de déployer en production, assurez-vous d'avoir :

- [ ] Configuré Firebase en mode production
- [ ] Configuré Stripe en mode production (clés live)
- [ ] Obtenu un token Replicate valide
- [ ] Configuré un nom de domaine
- [ ] Préparé les variables d'environnement de production
- [ ] Testé l'application localement
- [ ] Vérifié les règles Firestore
- [ ] Configuré le webhook Stripe

## 🚀 Déploiement sur Vercel

### 1. Préparation

```bash
# Assurez-vous que le code est à jour
git add .
git commit -m "Ready for production"
git push origin main
```

### 2. Configuration Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Configurez le projet :
   - **Framework Preset** : Next.js
   - **Root Directory** : ./
   - **Build Command** : `npm run build`
   - **Output Directory** : `.next`

### 3. Variables d'Environnement

Ajoutez toutes les variables dans Vercel :

```env
# Firebase (Production)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Stripe (Production - clés LIVE)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Replicate
REPLICATE_API_TOKEN=

# JWT
JWT_SECRET=

# App URL (votre domaine)
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
```

### 4. Déploiement

Cliquez sur "Deploy" - Vercel va :
- Installer les dépendances
- Builder l'application
- Déployer automatiquement

### 5. Configuration du Domaine

1. Dans Vercel, allez dans "Settings" > "Domains"
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions Vercel

## 🔧 Configuration Post-Déploiement

### Stripe Webhook

1. Allez dans Stripe Dashboard > Developers > Webhooks
2. Cliquez sur "Add endpoint"
3. URL : `https://votre-domaine.com/api/webhook`
4. Sélectionnez l'événement : `checkout.session.completed`
5. Copiez le "Signing secret" et ajoutez-le à `STRIPE_WEBHOOK_SECRET`

### Firebase Security Rules

Mettez à jour les règles Firestore pour la production :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && request.auth.uid == userId;
    }
    
    match /transactions/{transactionId} {
      allow read: if request.auth != null && 
                     resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }
  }
}
```

### Firebase Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🔒 Sécurité en Production

### 1. HTTPS

Vercel active automatiquement HTTPS. Vérifiez que :
- Toutes les requêtes HTTP sont redirigées vers HTTPS
- Le certificat SSL est valide

### 2. Variables d'Environnement

- ✅ Utilisez les clés Stripe LIVE (pk_live_ et sk_live_)
- ✅ Générez un JWT_SECRET fort et unique
- ✅ Ne commitez JAMAIS les fichiers .env

### 3. Rate Limiting

Ajoutez un rate limiting sur les API routes sensibles :

```typescript
// Exemple avec Vercel Edge Config
import { ratelimit } from '@/lib/ratelimit'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return new Response('Too many requests', { status: 429 })
  }
  
  // ... votre logique
}
```

## 📊 Monitoring

### Vercel Analytics

Activez Vercel Analytics pour suivre :
- Performances
- Trafic
- Erreurs

### Stripe Dashboard

Surveillez :
- Paiements réussis/échoués
- Webhooks
- Disputes

### Firebase Console

Vérifiez :
- Authentifications
- Utilisation Firestore
- Erreurs

## 🔄 Mises à Jour

Pour déployer une mise à jour :

```bash
git add .
git commit -m "Description de la mise à jour"
git push origin main
```

Vercel redéploiera automatiquement.

## 🐛 Debugging en Production

### Logs Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Voir les logs
vercel logs
```

### Erreurs Courantes

**Erreur 500 sur /api/process**
- Vérifiez le token Replicate
- Vérifiez les limites de quota Replicate

**Webhook Stripe ne fonctionne pas**
- Vérifiez l'URL du webhook
- Vérifiez le STRIPE_WEBHOOK_SECRET
- Regardez les logs Stripe

**Authentification Firebase échoue**
- Vérifiez les domaines autorisés dans Firebase Console
- Vérifiez les clés API

## 📈 Optimisations

### Images

Utilisez Next.js Image pour optimiser :

```tsx
import Image from 'next/image'

<Image 
  src="/logo.png" 
  width={200} 
  height={200} 
  alt="Logo"
/>
```

### Caching

Configurez les headers de cache dans `next.config.js` :

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ]
  },
}
```

## 💰 Coûts Estimés

### Vercel
- **Hobby** : Gratuit (limites de bande passante)
- **Pro** : $20/mois (recommandé pour production)

### Firebase
- **Spark** : Gratuit (limites)
- **Blaze** : Pay-as-you-go (~$25-50/mois pour trafic moyen)

### Stripe
- 1.4% + 0.25€ par transaction européenne

### Replicate
- ~$0.0023 par seconde de traitement
- Budget estimé : $50-200/mois selon utilisation

**Total estimé** : $100-300/mois pour un trafic moyen

## 📞 Support

En cas de problème :
- Vérifiez les logs Vercel
- Consultez la documentation Firebase
- Contactez le support Stripe si nécessaire

---

**Bonne chance avec votre déploiement ! 🚀**
