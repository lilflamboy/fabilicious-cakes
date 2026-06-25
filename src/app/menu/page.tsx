import CakeCard from "@/components/CakeCard";
import { cakes, CakeData } from "@/data/cakes";

export const metadata = {
  title: "Menu | Fabilicious Cakes",
  description: "Explore our menu of custom homemade cakes, chocolate cakes, eggless options, and cupcakes.",
};

export default function Menu() {
  // Group cakes by category
  const groupedCakes: Record<string, CakeData[]> = {};
  cakes.forEach((cake) => {
    const category = cake.category || "Other";
    if (!groupedCakes[category]) {
      groupedCakes[category] = [];
    }
    groupedCakes[category].push(cake);
  });

  const categories = Object.keys(groupedCakes);

  return (
    <div className="flex flex-col py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-serif mb-6">
            Our <span className="text-accent">Menu</span>
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
            Browse our selection of freshly baked, homemade treats. Prices vary based on customization and size. 
            Contact us for exact quotes on custom designs!
          </p>

          <div className="inline-block bg-primary/5 border border-primary/20 rounded-2xl p-6 text-left shadow-sm">
            <h3 className="font-bold text-accent mb-3 font-serif text-center text-lg">Please Note</h3>
            <ul className="space-y-2 text-foreground/80 font-medium">
              <li className="flex items-center gap-2"><span className="text-accent text-xl leading-none">•</span> 100% Eggless Available</li>
              <li className="flex items-center gap-2"><span className="text-accent text-xl leading-none">•</span> Pure Chocolate Option Available</li>
              <li className="flex items-center gap-2"><span className="text-accent text-xl leading-none">•</span> Customization Available</li>
              <li className="flex items-center gap-2"><span className="text-accent text-xl leading-none">•</span> Order 1 Day Prior</li>
            </ul>
          </div>
        </div>

        <div className="space-y-20">
          {categories.length === 0 ? (
            <div className="text-center py-20 bg-primary/5 rounded-3xl border border-primary/20">
              <h2 className="text-2xl font-bold font-serif mb-4">Our Menu is currently being updated!</h2>
              <p className="text-foreground/70">Please check back soon for our delicious offerings.</p>
            </div>
          ) : (
            categories.map((category, idx) => (
              <div key={idx}>
                <h2 className="text-3xl font-bold text-foreground font-serif mb-8 border-b border-primary/20 pb-4">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupedCakes[category].map((item, itemIdx) => (
                    <CakeCard key={itemIdx} {...item} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
