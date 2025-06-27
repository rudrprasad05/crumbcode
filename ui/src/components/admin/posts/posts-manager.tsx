"use client"

import { useState } from "react"
import { PostsHeader } from "./posts-header"
import { PostsList } from "./posts-list"
import { CreatePostModal } from "./create-post-modal"
import { EditPostModal } from "./edit-post-modal"

export interface Post {
  id: string
  type: "cake" | "feature"
  title: string
  description: string
  image?: string
  price?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  // Cake-specific fields
  ingredients?: string[]
  allergens?: string[]
  sizes?: Array<{ name: string; price: number }>
  // Feature-specific fields
  icon?: string
  benefits?: string[]
}

// Mock data
const mockPosts: Post[] = [
  {
    id: "1",
    type: "cake",
    title: "Black Forest",
    description: "Rich chocolate, whipped cream, and cherries in every bite.",
    image: "/images/black-forest-cake.png",
    price: 45.99,
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    ingredients: ["Dark chocolate", "Whipped cream", "Fresh cherries", "Vanilla sponge"],
    allergens: ["Eggs", "Dairy", "Gluten"],
    sizes: [
      { name: "Small (6 inch)", price: 35.99 },
      { name: "Medium (8 inch)", price: 45.99 },
      { name: "Large (10 inch)", price: 65.99 },
    ],
  },
  {
    id: "2",
    type: "feature",
    title: "Delivery",
    description: "We offer free delivery to customers in Suva / Nausori",
    icon: "truck",
    isActive: true,
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    benefits: ["Free delivery within city limits", "Same day delivery available", "Contactless delivery option"],
  },
  {
    id: "3",
    type: "cake",
    title: "Vanilla Dream",
    description: "Classic vanilla cake with buttercream frosting and fresh berries.",
    image: "/placeholder.svg?height=300&width=300",
    price: 39.99,
    isActive: true,
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
    ingredients: ["Vanilla extract", "Buttercream", "Fresh berries", "Vanilla sponge"],
    allergens: ["Eggs", "Dairy", "Gluten"],
    sizes: [
      { name: "Small (6 inch)", price: 29.99 },
      { name: "Medium (8 inch)", price: 39.99 },
      { name: "Large (10 inch)", price: 55.99 },
    ],
  },
  {
    id: "4",
    type: "feature",
    title: "Gluten Free",
    description: "Delicious gluten-free options available for all our cakes",
    icon: "wheat-off",
    isActive: true,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    benefits: ["All cakes available gluten-free", "Same great taste", "Safe for celiac customers"],
  },
]

export function PostsManager() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(mockPosts)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterPosts(query, selectedType, selectedStatus)
  }

  const handleTypeFilter = (type: string) => {
    setSelectedType(type)
    filterPosts(searchQuery, type, selectedStatus)
  }

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status)
    filterPosts(searchQuery, selectedType, status)
  }

  const filterPosts = (query: string, type: string, status: string) => {
    let filtered = posts

    if (query) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (type !== "all") {
      filtered = filtered.filter((post) => post.type === type)
    }

    if (status !== "all") {
      const isActive = status === "active"
      filtered = filtered.filter((post) => post.isActive === isActive)
    }

    setFilteredPosts(filtered)
  }

  const handleCreatePost = (newPost: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const updatedPosts = [post, ...posts]
    setPosts(updatedPosts)
    setFilteredPosts(updatedPosts)
    setIsCreateModalOpen(false)
  }

  const handleEditPost = (updatedPost: Post) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? { ...updatedPost, updatedAt: new Date() } : post,
    )
    setPosts(updatedPosts)
    filterPosts(searchQuery, selectedType, selectedStatus)
    setEditingPost(null)
  }

  const handleDeletePost = (id: string) => {
    const updatedPosts = posts.filter((post) => post.id !== id)
    setPosts(updatedPosts)
    filterPosts(searchQuery, selectedType, selectedStatus)
  }

  const handleToggleStatus = (id: string) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, isActive: !post.isActive, updatedAt: new Date() } : post,
    )
    setPosts(updatedPosts)
    filterPosts(searchQuery, selectedType, selectedStatus)
  }

  return (
    <div className="space-y-6">
      <PostsHeader
        onCreatePost={() => setIsCreateModalOpen(true)}
        onSearch={handleSearch}
        onTypeFilter={handleTypeFilter}
        onStatusFilter={handleStatusFilter}
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        totalPosts={filteredPosts.length}
      />

      <PostsList
        posts={filteredPosts}
        onEdit={setEditingPost}
        onDelete={handleDeletePost}
        onToggleStatus={handleToggleStatus}
      />

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePost={handleCreatePost}
      />

      {editingPost && (
        <EditPostModal
          post={editingPost}
          isOpen={!!editingPost}
          onClose={() => setEditingPost(null)}
          onEditPost={handleEditPost}
        />
      )}
    </div>
  )
}
