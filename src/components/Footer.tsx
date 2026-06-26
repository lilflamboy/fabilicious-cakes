import Link from 'next/link';

// Inline Instagram SVG icon
const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-pink-950 text-pink-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-extrabold text-white mb-2">Fabilicious Cakes</h2>
            <p className="text-sm text-pink-300 leading-relaxed mb-4">
              Fab &amp; Delicious | Cake By Choice | Treat Your Sweet Tooth
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/lilflamboy"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow on Instagram"
                className="w-9 h-9 rounded-lg bg-pink-900 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 flex items-center justify-center transition-all duration-300 text-pink-300 hover:text-white"
              >
                <InstagramIcon />
              </a>
              <a
                href="tel:+917021266239"
                title="Call us"
                className="w-9 h-9 rounded-lg bg-pink-900 hover:bg-green-600 flex items-center justify-center transition-all duration-300 text-pink-300 hover:text-white"
              >
                <PhoneIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Our Story', href: '/about' },
                { label: 'Menu & Pricing', href: '/menu' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Order Now', href: '/order' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-pink-300 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.instagram.com/lilflamboy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-pink-300 hover:text-pink-100 transition-colors group"
                >
                  <InstagramIcon />
                  @lilflamboy
                </a>
              </li>
              <li>
                <a
                  href="tel:+917021266239"
                  className="flex items-center gap-2 text-sm text-pink-300 hover:text-green-300 transition-colors"
                >
                  <PhoneIcon />
                  +91 70212 66239
                </a>
              </li>
              <li className="text-sm text-pink-400">
                Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Note</h3>
            <p className="text-xs text-pink-400 leading-relaxed">
              All cakes are made fresh to order. Please place your order at least 2 days in advance for custom cakes.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-pink-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-pink-500">
            (c) {new Date().getFullYear()} Fabilicious Cakes. All rights reserved.
          </p>
          <p className="text-xs text-pink-400 flex items-center gap-1.5">
            Designed &amp; built by{' '}
            <a
              href="https://www.instagram.com/lilflamboy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-pink-300 hover:text-white transition-colors duration-200"
            >
              Pratik Patil
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
