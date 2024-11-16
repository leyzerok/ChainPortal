"use client";

import Image from 'next/image';
import { Card } from '@/components/ui/card';

const networks = [
  {
    name: 'Polygon',
    logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    description: 'Low cost, high throughput Ethereum sidechain',
  },
  {
    name: 'Arbitrum',
    logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
    description: 'Ethereum L2 with EVM compatibility',
  },
  {
    name: 'Base',
    logo: 'https://avatars.githubusercontent.com/u/108554348?v=4',
    description: 'Coinbase-incubated Ethereum L2',
  },
];

export function Networks() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Supported Networks</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Trade and manage your assets across multiple chains with seamless integration
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {networks.map((network) => (
            <Card key={network.name} className="bg-black/50 border border-[#00FF94]/20 p-6 backdrop-blur-sm hover:border-[#00FF94]/40 transition-colors">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 relative mb-4">
                  <Image
                    src={network.logo}
                    alt={network.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{network.name}</h3>
                <p className="text-gray-400">{network.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}