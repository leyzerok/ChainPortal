"use client";

import {useEffect, useState} from "react";
import {useDynamicContext} from "@dynamic-labs/sdk-react-core";


export default function Home() {
    const [walletAddress, setWalletAddress] = useState('');
    const {primaryWallet, user} = useDynamicContext();
    const CHAIN_ID = 1;
    const API_KEY = 'YcI3QnvciPQqwuFm7FKEOclnunaiIZQd';

    useEffect(() => {
        setWalletAddress(primaryWallet !== null ? primaryWallet.address : '');
        walletAddress && getCurrentValue().then(r => console.log(`data = ${r}`));
    }, [primaryWallet]);

    async function getCurrentValue() {
        const hardcoded = '0x7fC78c95101D4bf54988Bb6E169E8552cA6773F1';
        const endpoint = `https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/current_value?addresses=${hardcoded}&chain_id=${CHAIN_ID}`;
        const data = await fetch(endpoint, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        }).then((res) => res.json());
        console.log(data)
        return data;
    }


    console.log(primaryWallet)
    return (
        <>
            {walletAddress === '' && <div className="container justify-between flex mx-auto px-8 text-2xl">Please connect your wallet</div>}
            {walletAddress !== '' && <div className="container mx-auto px-8">
                <div className="mt-16 p-8 border-2 rounded-b-lg border-gray-400 justify-between flex">
                    <div className="flex-row items-center">
                        <div className="text-2xl">Connected wallet:</div>
                        <div
                            className="text-gray-400 items-end">{walletAddress.substring(0, 5)}...{walletAddress.substring(walletAddress.length - 5)}</div>
                    </div>
                    <div className="text-white flex space-x-4">
                        <div>
                            <div className="text-2xl">Total value</div>
                            <div className="text-gray-400 items-end">{8}</div>
                        </div>
                        <div className="text-6xl items-center">$1.3K</div>
                    </div>
                </div>
            </div>}
        </>
    );
}