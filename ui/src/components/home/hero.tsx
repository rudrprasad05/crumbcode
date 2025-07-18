import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-rose-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Delicious Cakes
            <br />
            For Everyone
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-md">
            From birthdays to weddings or simply because you deserve a treat, we
            have the perfect cake for every occasion.
          </p>
          <Link
            href="/menu"
            className="bg-rose-600 text-white px-6 py-3 rounded-md hover:bg-rose-700 transition-colors inline-block font-medium"
          >
            Explore Menu
          </Link>
        </div>
      </div>
      <div className="absolute right-0 bottom-10 w-1/2 h-full hidden lg:block">
        <div className="relative w-full h-full">
          <Image
            width={1000}
            height={1000}
            src="/cc-hero-1.png"
            alt="Delicious cake showcase"
            className="absolute right-0 bottom-0 object-cover rounded-tl-3xl"
          />
        </div>
      </div>
    </section>
  );
}
