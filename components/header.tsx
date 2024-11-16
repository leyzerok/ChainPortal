"use client";

import { useState } from 'react';
import Link from 'next/link';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { cn } from '@/lib/utils';
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Swap', href: '/swap'},
  { name: 'Bridge', href: '/bridge'},
  { name: 'Portfolio', href: '/portfolio'},
  { name: 'Docs', href: '/docs'},
];

export function Header() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-[#00FF94]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 space-x-4">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-[#00FF94] hover:text-[#00FF94]/90 transition-colors"
            onClick={() => setActiveTab('Home')}
          >
            <Image src="/static/logo.svg" alt="logo" width={40} height={40}></Image>
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
                  activeTab === item.name
                    ? "text-[#00FF94] bg-[#00FF94]/10"
                    : "text-gray-400 hover:text-[#00FF94] hover:bg-[#00FF94]/10"
                )}
                onClick={() => setActiveTab(item.name)}
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
