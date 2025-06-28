import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CakeTypeProvider, useCakeType } from "@/context/CakeTypeContext";
import PostHeader from "../PostHeader";
import CakeTypeCreation from "./CakeTypeCreation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

let colors = [
  "gray-600",
  "rose-600",
  "blue-600",
  "green-600",
  "purple-600",
  "yellow-600",
];

export default function CakeTypeEditor() {
  const { saveContext, hasChanged } = useCakeType();
  return (
    <CakeTypeProvider>
      <div className="min-h-screen w-full overflow-hidden bg-gray-50 relative">
        <PostHeader
          header="Create New Category"
          onSave={saveContext}
          hasChanged={hasChanged}
        />
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
              {colors.map((i) => (
                <div
                  key={i}
                  onClick={() => updateValues("color", i)}
                  className={cn(
                    `relative w-8 h-8 bg-${i} border-${i}/50 border-solid rounded-lg shadow-sm`
                  )}
                >
                  {i === data.color && (
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
