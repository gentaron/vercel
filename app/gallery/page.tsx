"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Edit, Trash2, Save, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

interface GalleryImage {
  id: number
  src: string
  title: string
  description: string
  tags: string[]
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load images and available tags from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem("galleryImages")
    if (savedImages) {
      setImages(JSON.parse(savedImages))
    } else {
      // Default images
      const defaultImages: GalleryImage[] = [
        {
          id: 1,
          src: "/images/gallery/pose1.png",
          title: "Elegant Pose",
          description: "Pink Voltage in a graceful moment",
          tags: [],
        },
        {
          id: 2,
          src: "/images/gallery/heroic-winter.png",
          title: "Winter Hero",
          description: "Standing strong in the snow",
          tags: [],
        },
        {
          id: 3,
          src: "/images/gallery/slime-battle.png",
          title: "Slime Entity Battle",
          description: "Confronting the mysterious slime threat",
          tags: ["Slime Entity"],
        },
        {
          id: 4,
          src: "/images/gallery/red-background.png",
          title: "Power Stance",
          description: "Displaying her incredible strength",
          tags: [],
        },
        {
          id: 5,
          src: "/images/gallery/arena-victory.png",
          title: "Arena Victory",
          description: "Triumphant in the Gigapolis Colosseum",
          tags: [],
        },
        {
          id: 6,
          src: "/images/gallery/cheerful-pose.png",
          title: "Cheerful Moment",
          description: "Showing her bright personality",
          tags: [],
        },
        {
          id: 7,
          src: "/images/gallery/christmas-theme.png",
          title: "Holiday Spirit",
          description: "Celebrating the festive season",
          tags: [],
        },
        {
          id: 8,
          src: "/images/gallery/pink-energy.png",
          title: "Pink Lightning",
          description: "Surrounded by her signature energy",
          tags: [],
        },
      ]
      setImages(defaultImages)
      localStorage.setItem("galleryImages", JSON.stringify(defaultImages))
    }

    // Load available tags from battles
    const savedBattles = localStorage.getItem("battles")
    if (savedBattles) {
      const battles = JSON.parse(savedBattles)
      const opponents = battles.map((battle: any) => battle.opponent)
      setAvailableTags([...new Set(opponents)])
    }
  }, [])

  const saveImages = (newImages: GalleryImage[]) => {
    setImages(newImages)
    localStorage.setItem("galleryImages", JSON.stringify(newImages))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        const newImage: GalleryImage = {
          id: Date.now(),
          src: result,
          title: `Uploaded Image ${images.length + 1}`,
          description: "User uploaded image",
          tags: [],
        }
        saveImages([...images, newImage])
      }
      reader.readAsDataURL(file)
    }
  }

  const updateImage = (id: number, updates: Partial<GalleryImage>) => {
    const newImages = images.map((img) => (img.id === id ? { ...img, ...updates } : img))
    saveImages(newImages)
    setEditingId(null)
  }

  const deleteImage = (id: number) => {
    const newImages = images.filter((img) => img.id !== id)
    saveImages(newImages)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.15),transparent_50%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse-slower" />
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-blue-500/15 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Profile
          </Link>

          <Card className="bg-white/10 backdrop-blur-xl border border-pink-500/30 shadow-2xl">
            <CardContent className="p-8 text-center">
              <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent mb-4">
                Pink Voltage Gallery
              </h1>
              <p className="text-gray-300 mb-4">Character artwork and memorable moments</p>

              {/* Upload Button */}
              <button
                onClick={triggerFileInput}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Image
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </CardContent>
          </Card>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              isEditing={editingId === image.id}
              availableTags={availableTags}
              onEdit={() => setEditingId(image.id)}
              onSave={(updates) => updateImage(image.id, updates)}
              onCancel={() => setEditingId(null)}
              onDelete={() => deleteImage(image.id)}
              onView={() => setSelectedImage(image.src)}
            />
          ))}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
              <Image src={selectedImage || "/placeholder.svg"} alt="Enlarged view" fill className="object-contain" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Click on any image to view in full size • Use the + button to add your own images
          </p>
        </div>
      </div>
    </div>
  )
}

interface ImageCardProps {
  image: GalleryImage
  isEditing: boolean
  availableTags: string[]
  onEdit: () => void
  onSave: (updates: Partial<GalleryImage>) => void
  onCancel: () => void
  onDelete: () => void
  onView: () => void
}

function ImageCard({ image, isEditing, availableTags, onEdit, onSave, onCancel, onDelete, onView }: ImageCardProps) {
  const [editData, setEditData] = useState(image)
  const [newTag, setNewTag] = useState("")

  const handleSave = () => {
    onSave(editData)
  }

  const addTag = (tag: string) => {
    if (tag && !editData.tags.includes(tag)) {
      setEditData({ ...editData, tags: [...editData.tags, tag] })
    }
    setNewTag("")
  }

  const removeTag = (tagToRemove: string) => {
    setEditData({ ...editData, tags: editData.tags.filter((tag) => tag !== tagToRemove) })
  }

  if (isEditing) {
    return (
      <Card className="bg-white/10 backdrop-blur-xl border border-pink-500/30">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Edit Image</h3>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onCancel} className="text-gray-400 hover:text-white">
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
            <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="title" className="text-white text-sm">
                Title
              </Label>
              <Input
                id="title"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="bg-white/10 border-white/20 text-white text-sm"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-white text-sm">
                Description
              </Label>
              <Input
                id="description"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="bg-white/10 border-white/20 text-white text-sm"
              />
            </div>

            <div>
              <Label className="text-white text-sm">Tags</Label>
              <div className="flex flex-wrap gap-1 mb-2">
                {editData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-pink-500/20 text-pink-300 text-xs">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 text-pink-400 hover:text-pink-200">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add custom tag"
                  className="bg-white/10 border-white/20 text-white text-xs"
                  onKeyPress={(e) => e.key === "Enter" && addTag(newTag)}
                />
                <Button size="sm" onClick={() => addTag(newTag)} className="bg-blue-600 hover:bg-blue-700 text-xs">
                  <Tag className="w-3 h-3" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-1">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    className="text-xs bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 px-2 py-1 rounded"
                    disabled={editData.tags.includes(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      <CardContent className="p-4">
        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden cursor-pointer" onClick={onView}>
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-semibold text-lg group-hover:text-pink-300 transition-colors">
            {image.title}
          </h3>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={onEdit} className="text-gray-400 hover:text-white p-1">
              <Edit className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onDelete} className="text-red-400 hover:text-red-300 p-1">
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-3">{image.description}</p>

        {image.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {image.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-pink-500/20 text-pink-300 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
