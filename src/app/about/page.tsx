"use strict";

import Image from "next/image";
import { Heart, Sparkles, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "About Us | Fabilicious Cakes",
  description: "Learn about Fabilicious Cakes - Mumbai's premier home-based baking business focusing on hygiene, freshness, and quality.",
};

export default function About() {
  return (
    <div className="flex flex-col py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop"
              alt="Baking with love"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-serif mb-6">
              Our <span className="text-accent">Sweet</span> Story
            </h1>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              Welcome to Fabilicious Cakes! Born out of a pure passion for baking, we started our journey in our cozy home kitchen in Mumbai. What began as baking treats for friends and family quickly blossomed into a beloved local business.
            </p>
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              At Fabilicious Cakes, we believe that every celebration deserves a centerpiece that looks spectacular and tastes even better. We specialize in custom theme cakes, birthday cakes, and cupcakes, offering both egg and eggless options to cater to all your needs.
            </p>
            <div className="flex items-center gap-4 text-accent font-semibold text-lg">
              <Heart className="h-6 w-6 fill-current" />
              <span>Baked with love, just for you.</span>
            </div>
          </div>
        </div>

        {/* Our Promise Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4">Our Promise</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            We never compromise on the things that matter most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 font-serif">Impeccable Hygiene</h3>
            <p className="text-foreground/80">
              Operating from a home kitchen means we maintain the highest standards of cleanliness. Every utensil is sanitized, and we strictly follow food safety practices.
            </p>
          </div>

          <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 font-serif">Absolute Freshness</h3>
            <p className="text-foreground/80">
              We don't believe in stale cakes. Every order is baked fresh from scratch specifically for you, ensuring maximum flavor, moisture, and delight.
            </p>
          </div>

          <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 font-serif">Premium Quality</h3>
            <p className="text-foreground/80">
              From pure butter to high-quality couverture chocolate, we use only the finest ingredients. No artificial preservatives, just real, honest flavors.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
