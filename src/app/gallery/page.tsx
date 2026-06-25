"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryImage {
  public_id: string;
  url: string;
  width: number;
  height: number;
}

// Fallback photos shown while Cloudinary gallery is empty
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?q=80&w=800&auto=format&fit=crop",
];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          setImages(data.images);
        } else {
          setUsingFallback(true);
        }
      } catch {
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const displayImages: { url: string; id: string }[] = usingFallback
    ? FALLBACK_IMAGES.map((url, i) => ({ url, id: `fallback-${i}` }))
    : images.map((img) => ({ url: img.url, id: img.public_id }));

  return (
    <div className="flex flex-col py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-serif mb-6">
            Our <span className="text-accent">Gallery</span>
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            A glimpse into our sweet creations. Follow us on Instagram for our latest custom designs!
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-primary/10 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayImages.map((img) => (
              <div
                key={img.id}
                className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-all border border-primary/10"
              >
                <Image
                  src={img.url}
                  alt="Cake design"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-white font-bold tracking-wider text-lg shadow-black drop-shadow-md">
                    Delicious
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && displayImages.length === 0 && (
          <div className="text-center py-20 text-foreground/50">
            <p className="text-xl">No photos yet. Check back soon! 🎂</p>
          </div>
        )}

      </div>
    </div>
  );
}
