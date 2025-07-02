"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface CakeCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

export default function CakeCard({
  title,
  description,
  imageSrc,
}: CakeCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative w-full h-64">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse rounded" />
        )}

        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href="/order"
          className="text-rose-600 text-sm underline leading-2 font-medium hover:text-rose-800 transition-colors"
        >
          Order Online
        </Link>
      </div>
    </div>
  );
}
