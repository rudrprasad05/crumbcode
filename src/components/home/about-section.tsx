import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-16 bg-rose-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Freshly baked cakes"
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          <div className="lg:w-1/2">
            <span className="text-rose-600 font-medium">
              Delicious & Home Made
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
              Enjoy Freshly Baked Goodness
            </h2>
            <p className="text-gray-700 mb-8">
              From our kitchen to your table, every treat is crafted with love.
              Indulge in flavors made to warm hearts and create sweet memories.
            </p>
            <Link
              href="/about"
              className="bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition-colors inline-block font-medium"
            >
              Our Story
            </Link>
          </div>
        </div>

        <div className="mt-20 bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Got an occasion coming up?
          </h3>
          <Link
            href="/contact"
            className="bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition-colors inline-block font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
