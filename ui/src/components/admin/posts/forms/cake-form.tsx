"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface CakeFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function CakeForm({ onSubmit, initialData }: CakeFormProps) {
  const [formData, setFormData] = useState({
    image: initialData?.image || "",
    price: initialData?.price || "",
    ingredients: initialData?.ingredients || [],
    allergens: initialData?.allergens || [],
    sizes: initialData?.sizes || [{ name: "", price: "" }],
  })

  const [newIngredient, setNewIngredient] = useState("")
  const [newAllergen, setNewAllergen] = useState("")

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()],
      }))
      setNewIngredient("")
    }
  }

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const addAllergen = () => {
    if (newAllergen.trim()) {
      setFormData((prev) => ({
        ...prev,
        allergens: [...prev.allergens, newAllergen.trim()],
      }))
      setNewAllergen("")
    }
  }

  const removeAllergen = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      allergens: prev.allergens.filter((_, i) => i !== index),
    }))
  }

  const addSize = () => {
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { name: "", price: "" }],
    }))
  }

  const updateSize = (index: number, field: "name" | "price", value: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.map((size, i) => (i === index ? { ...size, [field]: value } : size)),
    }))
  }

  const removeSize = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    const processedData = {
      image: formData.image,
      price: Number.parseFloat(formData.price) || 0,
      ingredients: formData.ingredients,
      allergens: formData.allergens,
      sizes: formData.sizes
        .filter((size) => size.name && size.price)
        .map((size) => ({ name: size.name, price: Number.parseFloat(size.price) })),
    }

    onSubmit(processedData)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
          placeholder="Enter image URL"
        />
      </div>

      <div>
        <Label htmlFor="price">Base Price ($)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
          placeholder="0.00"
        />
      </div>

      <div>
        <Label>Ingredients</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Add ingredient"
            onKeyPress={(e) => e.key === "Enter" && addIngredient()}
          />
          <Button type="button" onClick={addIngredient} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.ingredients.map((ingredient, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {ingredient}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeIngredient(index)} />
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label>Allergens</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newAllergen}
            onChange={(e) => setNewAllergen(e.target.value)}
            placeholder="Add allergen"
            onKeyPress={(e) => e.key === "Enter" && addAllergen()}
          />
          <Button type="button" onClick={addAllergen} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.allergens.map((allergen, index) => (
            <Badge key={index} variant="destructive" className="flex items-center gap-1">
              {allergen}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeAllergen(index)} />
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Sizes & Pricing</Label>
          <Button type="button" onClick={addSize} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Size
          </Button>
        </div>
        <div className="space-y-2">
          {formData.sizes.map((size, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="Size name (e.g., Small 6 inch)"
                value={size.name}
                onChange={(e) => updateSize(index, "name", e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Price"
                type="number"
                step="0.01"
                value={size.price}
                onChange={(e) => updateSize(index, "price", e.target.value)}
                className="w-24"
              />
              <Button type="button" onClick={() => removeSize(index)} size="sm" variant="ghost">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" onClick={handleSubmit} className="bg-rose-500 hover:bg-rose-600 text-white">
          Create Cake Post
        </Button>
      </div>
    </div>
  )
}
