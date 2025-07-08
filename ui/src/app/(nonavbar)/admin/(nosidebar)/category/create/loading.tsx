import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="flex items-center gap-6">
        <div>Loading</div>
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    </div>
  );
}
