"use client";

import NewSocialDialog from "@/components/admin/socials/NewSocialDialog";
import SocialSection from "@/components/admin/socials/SocialSection";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudUpload, Search } from "lucide-react";

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <SocialSection />
    </div>
  );
}
