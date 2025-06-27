import { PostCard } from "./post-card"
import type { Post } from "./posts-manager"

interface PostsListProps {
  posts: Post[]
  onEdit: (post: Post) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

export function PostsList({ posts, onEdit, onDelete, onToggleStatus }: PostsListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No posts found</div>
        <div className="text-gray-500 text-sm">Try adjusting your search or filter criteria</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={() => onEdit(post)}
          onDelete={() => onDelete(post.id)}
          onToggleStatus={() => onToggleStatus(post.id)}
        />
      ))}
    </div>
  )
}
