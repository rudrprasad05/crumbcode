import FeatureCard from "./feature-card";
import { Truck, Cake, Clock } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Delivery",
      description: "We offer free delivery to customers in Suva / Nausori",
      icon: Truck,
    },
    {
      title: "Special Request",
      description: "We do gluten free and eggless cakes as well",
      icon: Cake,
    },
    {
      title: "2 Day Delivery",
      description: "Your cake will be ready in 2 days",
      icon: Clock,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-rose-600 font-medium">Our Features</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Quality is Our Priority
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
