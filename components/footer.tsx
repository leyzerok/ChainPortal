"use client";

import { TwitterLogo, GithubLogo, DiscordLogo, TelegramLogo } from '@phosphor-icons/react';

const socialLinks = [
  { name: 'Twitter', icon: TwitterLogo, href: '#' },
  { name: 'Discord', icon: DiscordLogo, href: '#' },
  { name: 'GitHub', icon: GithubLogo, href: '#' },
  { name: 'Telegram', icon: TelegramLogo, href: '#' },
];

const navLinks = [
  { name: 'Docs', href: '#' },
  { name: 'Terms of Use', href: '#' },
  { name: 'Privacy Policy', href: '#' },
];

export function Footer() {

  return (
    <footer className="bg-black border-t border-[#00FF94]/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-white">ChainPortal</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Your portal to a user-friendly multichain portfolio. Effortlessly manage assets, execute seamless swaps, perform cross-chain transfers, and track your portfolio across multiple networks.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00FF94] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Socials</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-[#00FF94] transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" weight="bold" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#00FF94]/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 ChainPortal Labs. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Powered by</span>
              <span className="text-[#00FF94]">Dynamic</span>
              <span>•</span>
              <span className="text-[#00FF94]">Onchain Kit</span>
              <span>•</span>
              <span className="text-[#00FF94]">Chainlink</span>
              <span>•</span>
              <span className="text-[#00FF94]">LayerZero</span>
              <span>•</span>
              <span className="text-[#00FF94]">Blockscout</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}