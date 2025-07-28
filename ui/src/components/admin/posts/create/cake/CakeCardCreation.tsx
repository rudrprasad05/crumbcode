"use client";

import { Badge } from "@/components/ui/badge";
import { useCake } from "@/context/CakeContext";
import { cn } from "@/lib/utils";
import { Cake, CakeTypeColorClasses, Media } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getTypeIcon } from "@/lib/icon-parse";

export default function CakeCardCreation({ cakeData }: { cakeData?: Cake }) {
  const { cake, setInitialCakeState } = useCake();
  const [isImageValid, setIsImageValid] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (cake.uuid == cakeData?.uuid) return;
    if (cakeData) {
      setInitialCakeState(cakeData);
    }
  }, [cakeData, setInitialCakeState]);

  useEffect(() => {
    console.log("uf hit");
    setIsImageValid(true);
    setIsImageLoaded(false);
  }, [cake?.media]);

  return (
    <div className="bg-white rounded-xl w-[340px] shadow-md overflow-hidden">
      <div className="relative w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
        {isImageValid ? (
          <>
            <Image
              width={100}
              height={100}
              src={cake.media?.url || "/image.svg"}
              onError={(e) => {
                e.currentTarget.onerror = null; // prevent infinite loop
                setIsImageValid(false);
              }}
              onLoad={() => setIsImageLoaded(true)}
              alt={(cake.media?.altText || cake.media?.fileName) as string}
              className={cn(
                "w-full h-full object-cover",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
            />
            {!isImageLoaded && (
              <div
                className={cn(
                  "absolute top-0 left-0 w-full h-full object-cover bg-gray-300 animate-pulse"
                )}
              ></div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            {getTypeIcon(cake.media as Media)}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex">
          <h3 className="grow text-xl font-semibold text-gray-900 mb-2">
            {cake.name as string}
          </h3>
          <div className="text-lg text-rose-600 font-bold">$ {cake.price}</div>
        </div>
        <p className="text-gray-600 mb-4">{cake.description as string}</p>
        <div className="flex justify-between w-full">
          <div>
            <Link
              href="#"
              className="text-rose-600 text-sm underline leading-2 font-medium hover:text-rose-800 transition-colors"
            >
              Order Online
            </Link>
          </div>
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
