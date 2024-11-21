"use client";

import dynamic from 'next/dynamic';

const WalletInfo = dynamic(() => import('./../../components/WalletInfo'), { ssr: false });

export default function Home() {
  return <WalletInfo />;
}
