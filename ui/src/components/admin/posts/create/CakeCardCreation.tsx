"use client";

import { useCake } from "@/context/CakeContext";
import Link from "next/link";

export default function CakeCardCreation() {
  const { cake, setCake } = useCake();
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
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {cake.name as string}
        </h3>
        <p className="text-gray-600 mb-4">{cake.description as string}</p>
        <Link
          href="#"
          className="text-rose-600 text-sm underline leading-2 font-medium hover:text-rose-800 transition-colors"
        >
          Order Online
        </Link>
      </div>
    </div>
  );
}
