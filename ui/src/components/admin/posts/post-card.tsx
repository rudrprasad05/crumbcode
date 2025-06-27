"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, EyeOff, Cake, Truck, Wheat, Shield } from "lucide-react"
import type { Post } from "./posts-manager"

interface PostCardProps {
  post: Post
  onEdit: () => void
  onDelete: () => void
  onToggleStatus: () => void
}

export function PostCard({ post, onEdit, onDelete, onToggleStatus }: PostCardProps) {
  const getTypeIcon = () => {
    switch (post.type) {
      case "cake":
        return <Cake className="h-4 w-4" />
      case "feature":
        return getFeatureIcon()
      default:
        return <Cake className="h-4 w-4" />
    }
  }

  const getFeatureIcon = () => {
    switch (post.icon) {
      case "truck":
        return <Truck className="h-4 w-4" />
      case "wheat-off":
        return <Wheat className="h-4 w-4" />
      case "shield":
        return <Shield className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getTypeColor = () => {
    switch (post.type) {
      case "cake":
        return "bg-rose-100 text-rose-800"
      case "feature":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="group hover:shadow-md transition-shadow border-gray-200">
      <CardContent className="p-0">
        {post.type === "cake" && post.image ? (
          <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="aspect-video bg-gray-50 rounded-t-lg flex items-center justify-center">
            <div className="text-gray-400">{getTypeIcon()}</div>
          </div>
        )}

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className={`text-xs ${getTypeColor()}`}>
                  {post.type}
                </Badge>
                <Badge variant={post.isActive ? "default" : "secondary"} className="text-xs">
                  {post.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onToggleStatus}>
                  {post.isActive ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {post.isActive ? "Deactivate" : "Activate"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {post.type === "cake" && post.price && (
            <div className="text-lg font-semibold text-rose-600">${post.price.toFixed(2)}</div>
          )}

          <div className="text-xs text-gray-400">Updated {post.updatedAt.toLocaleDateString()}</div>
        </div>
      </CardContent>
    </Card>
  )
}
