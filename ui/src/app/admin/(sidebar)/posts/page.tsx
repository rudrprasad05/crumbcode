import { GetAllCakes } from "@/actions/Cake";
import { GetAllCakeTypes } from "@/actions/CakeType";
import CakeSection from "@/components/admin/posts/create/cake/CakeSection";
import CakeTypesSection from "@/components/admin/posts/create/caketype/CakeTypesSection";
import { PostsManager } from "@/components/admin/posts/posts-manager";

export default async function PostsPage() {
  const cakeTypes = await GetAllCakeTypes();
  const cakes = await GetAllCakes();

  return (
    <div className="space-y-6">
      {/* <PostsManager /> */}
      <CakeSection data={cakes} />
      <CakeTypesSection data={cakeTypes} />
    </div>
  );
}
