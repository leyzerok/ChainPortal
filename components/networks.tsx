"use client";

import Image from 'next/image';
import { Card } from '@/components/ui/card';

const networks = [
  {
    name: 'Ethereum Mainnet',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    description: 'The OG blockchain where all the magic of smart contracts and dApps started',
  },
  {
    name: 'Polygon',
    logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    description: 'Ethereum’s faster, cheaper buddy that helps avoid those crazy gas fees',
  },
  {
    name: 'Arbitrum',
    logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
    description: 'A turbo boost for Ethereum—faster and cheaper, but still connected to the main chain',
  },
  {
    name: 'Base',
    logo: 'https://avatars.githubusercontent.com/u/108554348?v=4',
    description: 'Coinbase’s chill L2 that makes Ethereum easier to use and less pricey',
  },
  {
    name: 'Optimism',
    logo: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png',
    description: 'A no-drama L2 for Ethereum, built to make transactions quick and cheap',
  },
  {
    name: 'Gnosis',
    logo: 'https://avatars.githubusercontent.com/u/92709226?v=4',
    description: 'Ethereum’s sidekick for building cool tools like wallets and governance apps',
  }
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
