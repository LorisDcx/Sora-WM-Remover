import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Video & Image Cleaner - Nettoyez vos contenus légalement",
  description: "Supprimez les filigranes, logos ou objets indésirables de vos propres contenus en quelques secondes grâce à l'IA.",
  keywords: "video cleaner AI, remove objects from video, legal watermark remover, AI retouch tool",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
