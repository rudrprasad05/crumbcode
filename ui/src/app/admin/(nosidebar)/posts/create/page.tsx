"use client";

import CakeCardCreation from "@/components/admin/posts/create/CakeCardCreation";
import { CakeProvider } from "@/context/CakeContext";
import React from "react";

export default function page() {
  return (
    <CakeProvider>
      <div className="w-full h-full grid grid-cols-1 place-items-center">
        <CakeCardCreation />
      </div>
    </CakeProvider>
  );
}
