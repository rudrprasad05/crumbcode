import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function CakeCardCreation() {
  let item = {} as any;
  return (
    <div className="bg-white rounded-xl w-[340px] shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={"/placeholder.svg"}
          alt={""}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">title</h3>
        <p className="text-gray-600 mb-4">desc</p>
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
