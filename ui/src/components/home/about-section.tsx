import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img
              src="https://bucket.procyonfiji.com/procyon/cc-pop-5.png"
              alt="Freshly baked cakes"
              className="rounded-xl w-full"
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
      </div>
    </section>
  );
}
