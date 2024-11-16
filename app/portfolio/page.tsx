"use client";

import {useEffect, useState} from "react";
import {useDynamicContext} from "@dynamic-labs/sdk-react-core";


export default function Home() {
    const [walletAddress, setWalletAddress] = useState('');
    const {primaryWallet, user} = useDynamicContext();

    useEffect(() => {
        setWalletAddress(primaryWallet !== null ? primaryWallet.address : '');
    }, [primaryWallet]);

    console.log(primaryWallet)
    return (
        <>
            {walletAddress === '' && <p>Please connect your wallet</p>}
            {walletAddress !== '' && <div className="container mx-auto px-8">
                <div className="mt-16 p-8 rounded-b-lg  border-gray-400 border-2 justify-between flex">
                    <div className="flex-row items-center">
                        <div className="text-2xl">Connected wallet:</div>
                        <div className="text-gray-400 items-end">{walletAddress.substring(0, 5)}...{walletAddress.substring(walletAddress.length - 5)}</div>
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