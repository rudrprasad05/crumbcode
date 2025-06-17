import Link from "next/link";
import { Phone } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-rose-600">Crumb Code</h1>
        </div>

        <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex space-x-6 text-sm font-medium">
            <Link href="/" className="text-rose-600 hover:text-rose-800">
              Home
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-rose-600">
              Gallery
            </Link>
            <Link href="/prices" className="text-gray-700 hover:text-rose-600">
              Prices
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-rose-600">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center text-gray-700">
              <Phone className="h-4 w-4 mr-2" />
              <span>+679 999 9999</span>
            </div>
            <Link
              href="/order"
              className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition-colors"
            >
              Order Online
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
