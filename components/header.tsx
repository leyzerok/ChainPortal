"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Dynamically import DynamicWidget
const DynamicWidget = dynamic(
  () => import('@dynamic-labs/sdk-react-core').then((mod) => mod.DynamicWidget),
  { ssr: false } // Disable server-side rendering for this component
);

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Swap', href: '/swap' },
  { name: 'Bridge', href: '/bridge' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Docs', href: '/docs' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-[#00FF94]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 space-x-4">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-[#00FF94] hover:text-[#00FF94]/90 transition-colors"
          >
            <Image src="/static/logo.svg" alt="logo" width={40} height={40} />
            <span className="text-xl font-bold">ChainPortal</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-[#00FF94] bg-[#00FF94]/10"
                    : "text-gray-400 hover:text-[#00FF94] hover:bg-[#00FF94]/10"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Wallet Integration */}
          <div className="flex items-center space-x-4">
            <DynamicWidget />
          </div>
        </div>
      </div>
    </header>
  );
}
