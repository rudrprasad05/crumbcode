"use client";

import { PostSidebarLogo } from "@/components/admin/sidebar/sidebar-logo";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CakeProvider, useCake } from "@/context/CakeContext";
import { cn } from "@/lib/utils";
import { Cake } from "@/types";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ArrowLeft, CloudOff, CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CakeCardCreation from "./CakeCardCreation";
import SideBarConfigTab from "./SideBarConfigTab";
import SidebarDetailsTab from "./SidebarDetailsTab";
import { EditorSaveButton } from "@/components/global/EditorSaveButton";

export default function CakeEditor({ cake }: { cake?: Cake }) {
  return (
    <CakeProvider>
      <div className="min-h-screen w-full overflow-hidden bg-gray-50 relative">
        <Header />
        <div className="flex-1 min-h-screen flex flex-row">
          <ResizablePanelGroup
            direction="horizontal"
            className="flex-1 overflow-hidden"
          >
            <ResizablePanel defaultSize={60} minSize={30}>
              <main className="w-full h-full p-6">
                <div className="w-full h-full grid place-items-center">
                  <CakeCardCreation cakeData={cake} />
                </div>
              </main>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={40} minSize={20}>
              <SideBar />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </CakeProvider>
  );
}

function Header() {
  const router = useRouter();
  const { saveCakeContext, hasChanged, isSaving } = useCake();

  useEffect(() => {}, [hasChanged]);

  return (
    <div className="w-full flex items-center border border-gray-200 p-4">
      <div
        className="cursor-pointer flex gap-2 items-center text-sm"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </div>
      <div className="ml-5 text-lg font-bold">
        <h1>Cake Editor</h1>
      </div>
      <EditorSaveButton
        hasChanged={hasChanged}
        isSaving={isSaving}
        save={saveCakeContext}
      />
      <SidebarHeader className="ml-5">
        <PostSidebarLogo />
      </SidebarHeader>
    </div>
  );
}

function SideBar() {
  const [state, setState] = useState<"edit" | "config">("edit");
  return (
    <Tabs
      defaultValue="edit"
      className="w-full overflow-hidden relative h-screen px-6 pb-6 border border-gray-200 border-t-0 flex flex-col"
    >
      <TabsPrimitive.List className="w-full border-solid border-b flex flex-row pt-2">
        <TabsPrimitive.Trigger
          onClick={() => setState("edit")}
          className={cn(
            "text-sm text-black/60 flex-grow px-8 cursor-pointer py-4 text-center border-solid border-blue-500 hover:border-b transition",
            state == "edit" ? "border-b" : "border-none"
          )}
          value="edit"
        >
          Edit
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger
          onClick={() => setState("config")}
          className={cn(
            "text-sm text-black/60  flex-grow px-8 cursor-pointer py-2 text-center border-solid border-blue-500 hover:border-b transition",
            state == "config" ? "border-b" : "border-none"
          )}
          value="config"
        >
          Config
        </TabsPrimitive.Trigger>
      </TabsPrimitive.List>
      <TabsContent value="edit">
        <SidebarDetailsTab />
      </TabsContent>
      <TabsContent value="config">
        <SideBarConfigTab />
      </TabsContent>
    </Tabs>
  );
}
