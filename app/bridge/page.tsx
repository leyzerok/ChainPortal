"use client";


import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getWeb3Provider } from "@dynamic-labs/ethers-v6";


// TODO: currently I get reverse without message

export default function BridgePage() {
    const [sellAmount, setSellAmount] = useState<number | string>("");
    const [buyAmount, setBuyAmount] = useState<number | string>("");
    const [ccipMessage, setCcipMessage] = useState<string | null>(null);

    const { primaryWallet } = useDynamicContext();
    const walletAddress = primaryWallet?.address || "";

    const contractAddress = "0x141fa059441E0ca23ce184B6A78bafD2A517DdE8";
    const contractAbi = [
        {
            "inputs": [
                { "internalType": "bytes", "name": "_receiver", "type": "bytes" },
                { "internalType": "address", "name": "_token", "type": "address" },
                { "internalType": "uint256", "name": "_amount", "type": "uint256" },
                { "internalType": "address", "name": "_feeTokenAddress", "type": "address" }
            ],
            "name": "getCcipMessage",
            "outputs": [
                {
                    "components": [
                        { "internalType": "bytes", "name": "receiver", "type": "bytes" },
                        { "internalType": "bytes", "name": "data", "type": "bytes" },
                        {
                            "components": [
                                { "internalType": "address", "name": "token", "type": "address" },
                                { "internalType": "uint256", "name": "amount", "type": "uint256" }
                            ],
                            "internalType": "struct Client.EVMTokenAmount[]",
                            "name": "tokenAmounts",
                            "type": "tuple[]"
                        },
                        { "internalType": "address", "name": "feeToken", "type": "address" },
                        { "internalType": "bytes", "name": "extraArgs", "type": "bytes" }
                    ],
                    "internalType": "struct Client.EVM2AnyMessage",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const usdcAddress = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
    const feeTokenAddress = ethers.ZeroAddress;

    const calculateBuyAmount = (sellAmount: number | string) => {
        if (!sellAmount || isNaN(Number(sellAmount))) return "";
        return sellAmount; // Bridging maintains the same amount (1:1 transfer)
    };

    const getCcipMessage = async () => {
        if (!primaryWallet) {
            console.error("Wallet is not connected.");
            return;
        }

        try {            
            if (!ethers.isAddress(usdcAddress) || !ethers.isAddress(feeTokenAddress)) {
                throw new Error("Invalid token or fee token address.");
            }

            const provider = await getWeb3Provider(primaryWallet);
            const contract = new ethers.Contract(contractAddress, contractAbi, provider);

            const amount = ethers.parseUnits(sellAmount.toString(), 6);

            // ??????????? NOT SURE ????? Encode receiver address as bytes  // didnt work with regular address too
            const encodedReceiver = ethers.AbiCoder.defaultAbiCoder().encode(["address"], [walletAddress]);

            const message = await contract.getCcipMessage(encodedReceiver, usdcAddress, amount, feeTokenAddress);

            console.log("CCIP Message:", message);
            setCcipMessage(JSON.stringify(message, null, 2));
        } catch (error) {
            console.error("Error getting CCIP message:", error);
            setCcipMessage(null);
        }
    };

    useEffect(() => {
        const calculatedAmount = calculateBuyAmount(sellAmount);
        setBuyAmount(calculatedAmount);
    }, [sellAmount]);

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <div className="bg-neutral-900 text-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-xl font-semibold mb-6">Bridge USDC</h2>

                {walletAddress ? (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm mb-2">Amount to Bridge (USDC)</label>
                            <div className="flex items-center border border-gray-700 rounded-lg p-2">
                                <input
                                    type="number"
                                    value={sellAmount}
                                    onChange={(e) => setSellAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="bg-transparent text-white w-full outline-none"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm mb-2">Receiving Amount (USDC)</label>
                            <div className="flex items-center border border-gray-700 rounded-lg p-2">
                                <input
                                    type="text"
                                    value={buyAmount}
                                    readOnly
                                    placeholder="0.00"
                                    className="bg-transparent text-white w-full outline-none"
                                />
                            </div>
                        </div>

                        <button
                            className="bg-white text-black font-semibold w-full py-2 rounded-lg"
                            onClick={getCcipMessage}
                        >
                            Bridge
                        </button>

                        {ccipMessage && (
                            <div className="bg-gray-800 text-white mt-4 p-4 rounded-lg">
                                <pre>{ccipMessage}</pre>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-red-500 text-center">Wallet not connected. Please connect your wallet.</p>
                )}
            </div>
        </div>
    );
}