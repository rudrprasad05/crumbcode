"use client";

import { GetAllCakes } from "@/actions/Cake";
import { Cake } from "@/types";
import { useEffect, useState } from "react";
import ErrorContainer from "../global/ErrorContainer";
import LoadingContainer from "../global/LoadingContainer";
import CakeCard from "./cake-card";

export default function PopularCakes() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, seterror] = useState<any | null>(null);
  const [cakes, setcakes] = useState<Cake[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await GetAllCakes();
        setcakes(data);
        seterror(null);
        setIsLoading(false);
      } catch (error: any) {
        seterror(error);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-rose-600 font-medium">Most Popular</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Our Exclusive Cakes
          </h2>
        </div>

        {isLoading && !error && <LoadingContainer />}
        {!isLoading && error && <ErrorContainer />}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cakes.map((cake, index) => (
            <CakeCard
              key={index}
              title={cake.name}
              description={cake.description}
              imageSrc={cake.media?.url as string}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
