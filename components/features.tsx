"use client";

import { Wallet, ArrowsLeftRight, ChartLineUp } from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: Icon;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, Icon }) => {
  return (
    <div className="p-6 rounded-lg border border-[#00FF94]/20 hover:border-[#00FF94]/40 transition-colors">
      <Icon className="w-12 h-12 text-[#00FF94] mb-4" weight="bold" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const features = [
  {
    title: 'Cross-Chain Swaps',
    description: 'Execute trades across different blockchains with optimal rates and minimal slippage',
    Icon: ArrowsLeftRight,
  },
  {
    title: 'Portfolio Management',
    description: 'Track and manage your assets across multiple chains in one unified interface',
    Icon: Wallet,
  },
  {
    title: 'Real-Time Analytics',
    description: 'Get detailed insights into your DeFi positions with advanced analytics',
    Icon: ChartLineUp,
  },
];

export function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-black/95">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Key Features</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Experience the next generation of DeFi with our comprehensive suite of tools
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              Icon={feature.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}