"use strict";
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CakeCardProps {
  name: string;
  description: string;
  price: string;
  priceOptions?: { weight: string; price: string }[];
  imageUrl: string;
  category?: string;
  isVideo?: boolean;
}

export default function CakeCard({ name, description, price, priceOptions, imageUrl, category, isVideo }: CakeCardProps) {
  const [selectedWeight, setSelectedWeight] = useState<string>(
    priceOptions && priceOptions.length > 0 ? priceOptions[0].weight : "1 Kg"
  );

  const displayPrice = priceOptions && priceOptions.length > 0
    ? priceOptions.find(opt => opt.weight === selectedWeight)?.price || price
    : price;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/10 flex flex-col h-full">
      <div className="relative h-64 w-full overflow-hidden bg-primary/5 flex-shrink-0">
        {isVideo ? (
          <video
            src={imageUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {category && (
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-accent shadow-sm z-10">
            {category}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-foreground font-serif">{name}</h3>
          <span className="text-lg font-bold text-accent whitespace-nowrap ml-4">{displayPrice}</span>
        </div>
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="mt-auto">
          {priceOptions && priceOptions.length > 0 && (
            <div className="mb-4">
              <label className="text-xs font-medium text-foreground/70 mb-1 block">Select Weight:</label>
              <select 
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value)}
                className="w-full bg-primary/5 border border-primary/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent/50 text-foreground"
              >
                {priceOptions.map((opt, idx) => (
                  <option key={idx} value={opt.weight}>{opt.weight}</option>
                ))}
                <option value="Custom Weight">Custom Weight</option>
              </select>
            </div>
          )}

          <Link 
            href={`/contact?cake=${encodeURIComponent(name)}&weight=${encodeURIComponent(selectedWeight)}`}
            className="block w-full text-center bg-primary text-primary-foreground py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
