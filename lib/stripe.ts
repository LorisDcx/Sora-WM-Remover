import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const CREDIT_PACKS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 5,
    credits: 100,
    pricePerCredit: 0.05,
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 15,
    credits: 400,
    pricePerCredit: 0.0375,
    popular: true,
  },
  {
    id: 'studio',
    name: 'Studio',
    price: 40,
    credits: 1000,
    pricePerCredit: 0.04,
    popular: false,
  },
]
