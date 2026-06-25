"use strict";

import Image from "next/image";
import Link from "next/link";
import CakeCard from "@/components/CakeCard";
import { CheckCircle2, Star } from "lucide-react";

import { cakes } from "@/data/cakes";

export default function Home() {
  const featuredCakes = cakes.filter(cake => cake.category === "Bestseller" || cake._id === "4").slice(0, 3);

  const testimonials = [
    {
      name: "Priya Sharma",
      review: "Absolutely loved the chocolate truffle cake! It was moist, rich, and the design was exactly what I asked for.",
      rating: 5,
    },
    {
      name: "Rahul Desai",
      review: "Ordered a custom theme cake for my daughter's 5th birthday. The attention to detail was amazing and it tasted heavenly.",
      rating: 5,
    },
    {
      name: "Sneha Patel",
      review: "The eggless red velvet is a must-try! Fabilicious Cakes never disappoints with their quality and freshness.",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Offer Banner */}
      <div className="bg-accent text-accent-foreground text-center py-2 px-4 text-sm font-medium">
        🎉 Special Offer: Get 10% off on your first order! Use code FAB10
      </div>

      {/* Hero Section */}
      <section className="relative bg-primary/10 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground font-serif leading-tight mb-6">
              Delicious Homemade Cakes <span className="text-accent">Made with Love</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 mb-10">
              Fab & Delicious 🤤 | Cake By Choice 🎂🍰 | Treat Your Sweet Tooth with Mumbai's finest custom homemade cakes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Order Now
              </Link>
              <Link
                href="/menu"
                className="bg-white text-accent border-2 border-accent px-8 py-4 rounded-full font-bold text-lg hover:bg-accent/5 transition-all shadow-sm"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/50 rounded-full blur-3xl"></div>
      </section>

      {/* Featured Cakes */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4">Our Bestsellers</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Handcrafted with premium ingredients and baked fresh for every order.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCakes.map((cake, idx) => (
              <CakeCard key={idx} {...cake} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-flex items-center text-accent font-semibold hover:text-accent/80 transition-colors"
            >
              See all cakes <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4">Why Choose Fabilicious?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10 text-center">
              <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">100% Homemade</h3>
              <p className="text-foreground/70">Baked in a clean, hygienic home kitchen with love and care, not in a commercial factory.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10 text-center">
              <div className="w-16 h-16 mx-auto bg-secondary/50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Premium Ingredients</h3>
              <p className="text-foreground/70">We use only the finest quality ingredients—real butter, pure chocolate, and fresh fruits.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10 text-center">
              <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Custom Designs</h3>
              <p className="text-foreground/70">Your dream cake brought to life! We specialize in custom theme cakes for all occasions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4">Happy Customers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 italic mb-6 flex-grow">"{t.review}"</p>
                <div className="font-bold text-foreground">- {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
