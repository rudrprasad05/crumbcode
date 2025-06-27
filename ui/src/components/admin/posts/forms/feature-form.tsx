"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus } from "lucide-react"

interface FeatureFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function FeatureForm({ onSubmit, initialData }: FeatureFormProps) {
  const [formData, setFormData] = useState({
    icon: initialData?.icon || "truck",
    benefits: initialData?.benefits || [],
  })

  const [newBenefit, setNewBenefit] = useState("")

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }))
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="icon">Icon</Label>
        <Select value={formData.icon} onValueChange={(value) => setFormData((prev) => ({ ...prev, icon: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="truck">Delivery Truck</SelectItem>
            <SelectItem value="wheat-off">Gluten Free</SelectItem>
            <SelectItem value="shield">Quality Guarantee</SelectItem>
            <SelectItem value="clock">Fast Service</SelectItem>
            <SelectItem value="heart">Made with Love</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Benefits</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newBenefit}
            onChange={(e) => setNewBenefit(e.target.value)}
            placeholder="Add benefit"
            onKeyPress={(e) => e.key === "Enter" && addBenefit()}
          />
          <Button type="button" onClick={addBenefit} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {formData.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <span className="flex-1 text-sm">{benefit}</span>
              <Button type="button" onClick={() => removeBenefit(index)} size="sm" variant="ghost">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" onClick={handleSubmit} className="bg-rose-500 hover:bg-rose-600 text-white">
          Create Feature Post
        </Button>
      </div>
    </div>
  )
}
