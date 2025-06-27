"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CakeForm } from "./forms/cake-form"
import { FeatureForm } from "./forms/feature-form"
import type { Post } from "./posts-manager"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onCreatePost: (post: Omit<Post, "id" | "createdAt" | "updatedAt">) => void
}

export function CreatePostModal({ isOpen, onClose, onCreatePost }: CreatePostModalProps) {
  const [postType, setPostType] = useState<"cake" | "feature">("cake")
  const [basicData, setBasicData] = useState({
    title: "",
    description: "",
    isActive: true,
  })

  const handleSubmit = (typeSpecificData: any) => {
    const post: Omit<Post, "id" | "createdAt" | "updatedAt"> = {
      type: postType,
      title: basicData.title,
      description: basicData.description,
      isActive: basicData.isActive,
      ...typeSpecificData,
    }

    onCreatePost(post)
    handleClose()
  }

  const handleClose = () => {
    setBasicData({ title: "", description: "", isActive: true })
    setPostType("cake")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="post-type">Post Type</Label>
              <Select value={postType} onValueChange={(value: "cake" | "feature") => setPostType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cake">Cake Product</SelectItem>
                  <SelectItem value="feature">Feature Highlight</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={basicData.title}
                onChange={(e) => setBasicData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter post title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={basicData.description}
                onChange={(e) => setBasicData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter post description"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is-active"
                checked={basicData.isActive}
                onCheckedChange={(checked) => setBasicData((prev) => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="is-active">Active</Label>
            </div>
          </div>

          {postType === "cake" ? <CakeForm onSubmit={handleSubmit} /> : <FeatureForm onSubmit={handleSubmit} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
