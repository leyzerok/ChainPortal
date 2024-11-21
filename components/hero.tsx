"use client";

import { ArrowRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#00FF94_0%,transparent_25%)] animate-pulse" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#00FF94]">
          Your Gateway to <br />Cross-Chain DeFi
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Seamlessly manage your multi-chain portfolio and execute cross-chain swaps with institutional-grade security
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-[#00FF94] text-black hover:bg-[#00FF94]/90"
            onClick={() => router.push('/swap')}
          >
            Launch App
            <ArrowRight className="ml-2 h-5 w-5" weight="bold" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#00FF94] text-[#00FF94] hover:bg-[#00FF94]/10"
            onClick={() => router.push('/docs')}
          >
            Read Docs
          </Button>
        </div>
      </div>
    </section>
  );
}