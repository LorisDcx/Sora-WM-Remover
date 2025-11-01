'use client'

import { useState, useEffect } from 'react'
import { FileUploader } from '@/components/FileUploader'
import { CanvasEditor } from '@/components/CanvasEditor'
import { CreditDisplay } from '@/components/CreditDisplay'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { Sparkles, Download, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { calculateCost } from '@/lib/utils'
import Link from 'next/link'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

type ProcessStep = 'upload' | 'edit' | 'processing' | 'complete'

export default function AppPage() {
  const [step, setStep] = useState<ProcessStep>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [maskData, setMaskData] = useState<string | null>(null)
  const [processedUrl, setProcessedUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [credits, setCredits] = useState(20) // Default free credits
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login')
      } else {
        // Fetch user credits from Firestore
        fetchUserCredits(user.uid)
      }
    })

    return () => unsubscribe()
  }, [router])

  const fetchUserCredits = async (userId: string) => {
    try {
      const response = await fetch(`/api/credits?userId=${userId}`)
      const data = await response.json()
      setCredits(data.credits || 20)
    } catch (error) {
      console.error('Error fetching credits:', error)
    }
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    
    // Calculate estimated cost
    const fileType = file.type.startsWith('image/') ? 'image' : 'video'
    const quality = 'HD' // Default to HD
    const cost = calculateCost(fileType, quality)
    setEstimatedCost(cost)

    // Create preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    
    setStep('edit')
  }

  const handleMaskComplete = (mask: string) => {
    setMaskData(mask)
  }

  const handleProcess = async () => {
    if (!selectedFile || !maskData || !agreedToTerms) {
      toast({
        title: 'Erreur',
        description: 'Veuillez accepter les conditions d\'utilisation',
        variant: 'destructive',
      })
      return
    }

    if (estimatedCost && credits < estimatedCost) {
      toast({
        title: 'Crédits insuffisants',
        description: 'Vous n\'avez pas assez de crédits pour ce traitement',
        variant: 'destructive',
      })
      return
    }

    setStep('processing')
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('mask', maskData)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 500)

      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error('Processing failed')
      }

      const data = await response.json()
      setProcessedUrl(data.resultUrl)
      setCredits(data.remainingCredits)
      setStep('complete')

      toast({
        title: 'Traitement terminé !',
        description: 'Votre fichier a été nettoyé avec succès',
      })
    } catch (error) {
      console.error('Processing error:', error)
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors du traitement',
        variant: 'destructive',
      })
      setStep('edit')
    }
  }

  const handleDownload = () => {
    if (processedUrl) {
      const a = document.createElement('a')
      a.href = processedUrl
      a.download = `cleaned_${selectedFile?.name || 'file'}`
      a.click()
    }
  }

  const resetProcess = () => {
    setStep('upload')
    setSelectedFile(null)
    setPreviewUrl(null)
    setMaskData(null)
    setProcessedUrl(null)
    setProgress(0)
    setEstimatedCost(null)
    setAgreedToTerms(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">AI Cleaner</span>
          </Link>
          <CreditDisplay credits={credits} estimatedCost={estimatedCost || undefined} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              <div className={`flex items-center gap-2 ${step === 'upload' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step !== 'upload' ? 'bg-green-500 text-white' : 'bg-blue-600 text-white'}`}>
                  {step !== 'upload' ? '✓' : '1'}
                </div>
                <span className="font-medium">Upload</span>
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className={`flex items-center gap-2 ${step === 'edit' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'processing' || step === 'complete' ? 'bg-green-500 text-white' : step === 'edit' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                  {step === 'processing' || step === 'complete' ? '✓' : '2'}
                </div>
                <span className="font-medium">Édition</span>
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className={`flex items-center gap-2 ${step === 'processing' || step === 'complete' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'complete' ? 'bg-green-500 text-white' : step === 'processing' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                  {step === 'complete' ? '✓' : '3'}
                </div>
                <span className="font-medium">Résultat</span>
              </div>
            </div>
          </div>

          {/* Upload Step */}
          {step === 'upload' && (
            <div>
              <h1 className="text-3xl font-bold text-center mb-8">
                Uploadez votre fichier
              </h1>
              <FileUploader onFileSelect={handleFileSelect} />
            </div>
          )}

          {/* Edit Step */}
          {step === 'edit' && previewUrl && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={resetProcess}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                <h1 className="text-2xl font-bold">Sélectionnez les zones à nettoyer</h1>
                <div className="w-24"></div>
              </div>

              <CanvasEditor imageUrl={previewUrl} onMaskComplete={handleMaskComplete} />

              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      Je confirme détenir les droits sur ce fichier et utiliser cet outil conformément à la loi. 
                      L'utilisation de ce service sur des contenus protégés par des tiers est strictement interdite.
                    </label>
                  </div>
                  <Button 
                    onClick={handleProcess} 
                    disabled={!maskData || !agreedToTerms || (estimatedCost !== null && credits < estimatedCost)}
                    className="w-full"
                    size="lg"
                  >
                    Lancer le traitement ({estimatedCost} crédits)
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Processing Step */}
          {step === 'processing' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Traitement en cours...</CardTitle>
                <CardDescription className="text-center">
                  L'IA nettoie votre fichier, cela peut prendre quelques instants
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Progress value={progress} className="mb-4" />
                <p className="text-center text-sm text-gray-600">{progress}%</p>
              </CardContent>
            </Card>
          )}

          {/* Complete Step */}
          {step === 'complete' && processedUrl && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Traitement terminé !</h1>
                <p className="text-gray-600">Votre fichier a été nettoyé avec succès</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    {selectedFile?.type.startsWith('image/') ? (
                      <img src={processedUrl} alt="Résultat" className="w-full h-auto rounded-lg" />
                    ) : (
                      <video src={processedUrl} controls className="w-full h-auto rounded-lg" />
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleDownload} className="flex-1" size="lg">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                    <Button onClick={resetProcess} variant="outline" className="flex-1" size="lg">
                      Nouveau traitement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
