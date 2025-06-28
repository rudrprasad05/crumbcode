"use client";

import CakeEditor from "@/components/admin/posts/create/cake/CakeEditor";
import CakeTypeEditor from "@/components/admin/posts/create/caketype/CakeTypeEditor";
import { CakeProvider } from "@/context/CakeContext";
import { useSearchParams } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();
  const paramType = searchParams.get("type");

  if (paramType?.toLowerCase() === "cake") {
    <CakeEditor />;
  } else if (paramType?.toLowerCase() === "services") {
    return (
      <CakeProvider>
        <div className="w-full h-full grid grid-cols-1 place-items-center">
          ser
        </div>
      </CakeProvider>
    );
  } else if (paramType?.toLowerCase() === "allergen") {
    return (
      <CakeProvider>
        <div className="w-full h-full grid grid-cols-1 place-items-center">
          all
        </div>
      </CakeProvider>
    );
  } else if (paramType?.toLowerCase() === "category") {
    return <CakeTypeEditor />;
  } else {
    return <div>Incorrect Url</div>;
  }
}
