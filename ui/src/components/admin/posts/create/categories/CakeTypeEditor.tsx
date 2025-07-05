import { PostSidebarLogo } from "@/components/admin/sidebar/sidebar-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { CakeTypeProvider, useCakeType } from "@/context/CakeTypeContext";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, CloudOff, CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";
import CakeTypeCreation from "./CakeTypeCreation";
import { CakeTypeColorClasses, CakeTypeColors } from "@/types";

export default function CakeTypeEditor() {
  return (
    <CakeTypeProvider>
      <div className="min-h-screen w-full overflow-hidden bg-gray-50 relative">
        <Header />
        <div className="flex-1 min-h-screen flex flex-row">
          <main className=" flex-1 p-6">
            <div className="w-full h-full grid grid-cols-1 place-items-center">
              <CakeTypeCreation />
            </div>
          </main>
          <SideBar />
        </div>
      </div>
    </CakeTypeProvider>
  );
}

function Header() {
  const router = useRouter();
  const { saveContext, hasChanged } = useCakeType();

  return (
    <div className="w-full flex items-center border border-gray-200 p-4">
      <div
        className="cursor-pointer flex gap-2 items-center text-sm"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </div>
      <div className="ml-5 text-xl font-bold">
        <h1>Create New Category</h1>
      </div>
      <div className="flex gap-2 items-center ml-auto">
        <div className="text-sm text-gray-500 ">
          {hasChanged ? (
            <div className="flex items-center gap-2">
              <CloudOff className="w-4 h-4 " /> Changes not saved
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CloudUpload className="w-4 h-4 " /> Saved to Cloud
            </div>
          )}
        </div>
        <Button
          disabled={!hasChanged}
          onClick={saveContext}
          variant={"outline"}
        >
          Save
        </Button>
      </div>
      <SidebarHeader className="ml-5">
        <PostSidebarLogo />
      </SidebarHeader>
    </div>
  );
}

function SideBar() {
  const { data, updateValues } = useCakeType();

  return (
    <div className="overflow-hidden relative h-screen w-[500px] p-4 border border-gray-200 border-t-0 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="font-bold">Enter details</div>
      </div>
      <div className="grow">
        <div className="space-y-6 w-full py-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={data.name ?? ""}
              onChange={(e) => updateValues("name", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description ?? ""}
              onChange={(e) => updateValues("description", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Color</Label>
            <div className="flex gap-2">
              {CakeTypeColors.map((item, i) => (
                <div
                  key={i}
                  onClick={() => updateValues("color", item)}
                  className={cn(
                    "relative w-8 h-8 border-solid rounded-lg shadow-sm",
                    CakeTypeColorClasses[item]
                  )}
                >
                  {item === data.color && (
                    <div className="rounded-full p-0.5 absolute bg-blue-500 text-white top-0 right-0">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
