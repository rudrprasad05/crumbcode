import { GetAllCakeTypes } from "@/actions/CakeType";
import CakeSection from "@/components/admin/posts/create/cake/CakeSection";

export default async function PostsPage() {
  const cakeTypes = await GetAllCakeTypes();

  return (
    <div className="space-y-6">
      <CakeSection />
    </div>
  );
}
