import Link from "next/link";
import React from "react";

export default function CallToActions() {
  return <div>CallToActions</div>;
}

export function GotOccasionComingUp() {
  return (
    <div className="mt-20 bg-rose-50 rounded-xl  shadow-md p-8 text-center">
      <div className="container flex items-center justify-between mx-auto px-4">
        <h3 className="text-3xl font-bold text-gray-900">
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
  );
}
