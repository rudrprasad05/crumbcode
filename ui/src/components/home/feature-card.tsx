import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl flex flex-col items-center shadow-md p-6 text-center">
      <div className="inline-flex items-center justify-center p-4 rounded-full bg-rose-100 text-rose-600 mb-4">
        <Icon className="h-12 w-12 stroke-1" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        href="/order"
        className="text-sm underline leading-1 mt-auto text-rose-600 font-medium hover:text-rose-800 transition-colors"
      >
        Order Online
      </Link>
    </div>
  );
}
