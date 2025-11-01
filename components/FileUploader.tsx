'use client'

import { useCallback, useState } from 'react'
import { Upload, X, Image as ImageIcon, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface FileUploaderProps {
  onFileSelect: (file: File) => void
  acceptedTypes?: string
}

export function FileUploader({ onFileSelect, acceptedTypes = 'image/*,video/*' }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }, [])

  const handleFile = (file: File) => {
    setSelectedFile(file)
    
    // Create preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else if (file.type.startsWith('video/')) {
      setPreview(URL.createObjectURL(file))
    }

    onFileSelect(file)
  }

  const clearFile = () => {
    setSelectedFile(null)
    setPreview(null)
  }

  if (selectedFile && preview) {
    return (
      <Card className="p-6">
        <div className="relative">
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={clearFile}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {selectedFile.type.startsWith('image/') ? (
            <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" />
          ) : (
            <video src={preview} controls className="w-full h-auto rounded-lg" />
          )}
          
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium">{selectedFile.name}</p>
            <p className="text-xs">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={`p-12 border-2 border-dashed transition-colors ${
        dragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4 p-4 bg-blue-100 rounded-full">
          <Upload className="h-8 w-8 text-blue-600" />
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Uploadez votre fichier</h3>
        <p className="text-sm text-gray-600 mb-4">
          Glissez-déposez ou cliquez pour sélectionner
        </p>
        
        <div className="flex gap-4 mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <ImageIcon className="h-4 w-4" />
            JPG, PNG
          </span>
          <span className="flex items-center gap-1">
            <Video className="h-4 w-4" />
            MP4, MOV
          </span>
        </div>

        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept={acceptedTypes}
          onChange={handleChange}
        />
        <label htmlFor="file-upload">
          <Button asChild>
            <span>Sélectionner un fichier</span>
          </Button>
        </label>
      </div>
    </Card>
  )
}
