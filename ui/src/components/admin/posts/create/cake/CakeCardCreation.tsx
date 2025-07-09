"use client";

import { Badge } from "@/components/ui/badge";
import { useCake } from "@/context/CakeContext";
import { cn } from "@/lib/utils";
import { Cake, CakeTypeColorClasses } from "@/types";
import Link from "next/link";
import { useEffect } from "react";

export default function CakeCardCreation({ cakeData }: { cakeData?: Cake }) {
  const { cake, setInitialCakeState } = useCake();

  useEffect(() => {
    if (cakeData) {
      setInitialCakeState(cakeData);
    }
  }, [cakeData]);

  return (
    <div className="bg-white rounded-xl w-[340px] shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={cake.media?.url as string}
          alt={""}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex">
          <h3 className="grow text-xl font-semibold text-gray-900 mb-2">
            {cake.name as string}
          </h3>
          <div className="text-lg text-rose-600 font-bold">$ {cake.price}</div>
        </div>
        <p className="text-gray-600 mb-4">{cake.description as string}</p>
        <div className="flex justify-between">
          <Link
            href="#"
            className="text-rose-600 text-sm underline leading-2 font-medium hover:text-rose-800 transition-colors"
          >
            Order Online
          </Link>
          <Badge
            className={cn(
              "text-white",
              CakeTypeColorClasses[cake.cakeType?.color as string]
            )}
          >
            {cake.cakeType?.name || "no tag"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
