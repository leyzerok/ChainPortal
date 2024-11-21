"use client";

import { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function WalletInfo() {
  const { primaryWallet } = useDynamicContext();
  const walletAddress = primaryWallet?.address || '';

  const CHAIN_ID = 1;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (walletAddress) {
      getCurrentValue().then((data) => {
        console.log('data =', data);
        setData(data);
      });
    }
  }, [walletAddress]);

  async function getCurrentValue() {
    const endpoint = `https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/current_value?addresses=${walletAddress}&chain_id=${CHAIN_ID}`;
    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  return (
    <>
      {walletAddress === '' && (
        <div className="container justify-between flex mx-auto px-8 text-2xl">
          Please connect your wallet
        </div>
      )}
      {walletAddress !== '' && (
        <div className="container mx-auto px-8">
          <div className="mt-16 p-8 border-2 rounded-b-lg border-gray-400 justify-between flex">
            <div className="flex-row items-center">
              <div className="text-2xl">Connected wallet:</div>
              <div className="text-gray-400 items-end">
                {walletAddress.substring(0, 5)}...{walletAddress.substring(walletAddress.length - 5)}
              </div>
            </div>
            <div className="text-white flex space-x-4">
              <div>
                <div className="text-2xl">Total value</div>
                <div className="text-gray-400 items-end">{data}</div>
              </div>
              <div className="text-6xl items-center">${data}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
