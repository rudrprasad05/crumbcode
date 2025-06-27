"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { CakeForm } from "./forms/cake-form"
import { FeatureForm } from "./forms/feature-form"
import type { Post } from "./posts-manager"

interface EditPostModalProps {
  post: Post
  isOpen: boolean
  onClose: () => void
  onEditPost: (post: Post) => void
}

export function EditPostModal({ post, isOpen, onClose, onEditPost }: EditPostModalProps) {
  const [basicData, setBasicData] = useState({
    title: post.title,
    description: post.description,
    isActive: post.isActive,
  })

  const handleSubmit = (typeSpecificData: any) => {
    const updatedPost: Post = {
      ...post,
      title: basicData.title,
      description: basicData.description,
      isActive: basicData.isActive,
      ...typeSpecificData,
    }

    onEditPost(updatedPost)
  }

  const handleClose = () => {
    setBasicData({
      title: post.title,
      description: post.description,
      isActive: post.isActive,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {post.type === "cake" ? "Cake" : "Feature"} Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
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

          {post.type === "cake" ? (
            <CakeForm onSubmit={handleSubmit} initialData={post} />
          ) : (
            <FeatureForm onSubmit={handleSubmit} initialData={post} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
