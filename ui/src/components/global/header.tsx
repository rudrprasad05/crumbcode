"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/auth/login", label: "Login" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-rose-600">Crumb Code</h1>
        </div>

        <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${
                  isActive(href) ? "text-rose-600" : "text-gray-700"
                } hover:text-rose-800`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link
              href="/contact"
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
