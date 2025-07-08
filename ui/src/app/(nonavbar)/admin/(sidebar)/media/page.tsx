import { MediaLibrary } from "@/components/admin/media/media-library";

export default async function MediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
        <p className="text-gray-600 mt-2">
          Manage your images, videos, and other media files.
        </p>
      </div>

      <MediaLibrary />
    </div>
  );
}
