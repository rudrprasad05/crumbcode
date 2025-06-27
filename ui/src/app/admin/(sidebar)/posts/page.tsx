import { PostsManager } from "@/components/admin/posts/posts-manager"

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
        <p className="text-gray-600 mt-2">Create and manage your cake products and feature highlights.</p>
      </div>

      <PostsManager />
    </div>
  )
}
