"use client";

import { Badge } from "@/components/ui/badge";
import { useCake } from "@/context/CakeContext";
import { useSocialMedia } from "@/context/SocialMediaContext";
import { cn } from "@/lib/utils";
import { Cake, CakeTypeColorClasses, SocialMedia } from "@/types";
import Link from "next/link";
import { useEffect } from "react";

export default function SocialMediaCardCreation({
  data,
}: {
  data?: SocialMedia;
}) {
  const { socialMedia, setInitialCakeState } = useSocialMedia();

  useEffect(() => {
    if (data) {
      setInitialCakeState(data);
    }
  }, [data]);

  return (
    <div className="bg-white rounded-xl w-[340px] shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden"></div>
      <div className="p-6">
        <div className="flex">
          <h3 className="grow text-xl font-semibold text-gray-900 mb-2">
            {socialMedia.name as string}
          </h3>
        </div>
        <div className="flex justify-between">
          <Link
            href="#"
            className="text-rose-600 text-sm underline leading-2 font-medium hover:text-rose-800 transition-colors"
          >
            Order Online
          </Link>
        </div>
      </div>
    </div>
  );
}
