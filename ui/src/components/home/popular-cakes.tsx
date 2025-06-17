import CakeCard from "./cake-card";

export default function PopularCakes() {
  const cakes = [
    {
      title: "Black Forest",
      description: "Rich chocolate, whipped cream, and cherries in every bite.",
      imageSrc: "https://bucket.procyonfiji.com/procyon/cc-pop-1.jpeg",
    },
    {
      title: "Cheese Cake",
      description: "Rich chocolate, whipped cream, and cherries in every bite.",
      imageSrc: "https://bucket.procyonfiji.com/procyon/cc-pop-4.jpeg",
    },
    {
      title: "Tiramisu",
      description: "Rich chocolate, whipped cream, and cherries in every bite.",
      imageSrc: "https://bucket.procyonfiji.com/procyon/cc-pop-3.jpeg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-rose-600 font-medium">Most Popular</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Our Exclusive Cakes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cakes.map((cake, index) => (
            <CakeCard
              key={index}
              title={cake.title}
              description={cake.description}
              imageSrc={cake.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
