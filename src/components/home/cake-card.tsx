import Link from "next/link";

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
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href="/order"
          className="text-rose-600 font-medium hover:text-rose-800 transition-colors"
        >
          Order Online
        </Link>
      </div>
    </div>
  );
}
