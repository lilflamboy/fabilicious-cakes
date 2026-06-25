"use strict";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-primary/10 border-t border-primary/20 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & About */}
          <div>
            <h3 className="text-2xl font-bold text-accent font-serif mb-4">Fabilicious Cakes</h3>
            <p className="text-foreground/80 mb-4">
              Fab & Delicious 🤤 | Cake By Choice 🎂🍰 | Treat Your Sweet Tooth
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-foreground/80 hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link href="/menu" className="text-foreground/80 hover:text-accent transition-colors">Menu & Pricing</Link></li>
              <li><Link href="/gallery" className="text-foreground/80 hover:text-accent transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="text-foreground/80 hover:text-accent transition-colors">Order Now</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-foreground/80">Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span className="text-foreground/80">+91 00000 00000</span>
              </li>

            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary/20 mt-12 pt-8 text-center text-foreground/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Fabilicious Cakes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
