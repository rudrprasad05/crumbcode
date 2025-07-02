import { Loader2 } from "lucide-react";
import React from "react";

export default function LoadingContainer() {
  return (
    <div className="w-full h-48 rounded-lg grid place-items-center">
      <div className="text-center text-sm">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    </div>
  );
}
