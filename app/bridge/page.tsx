"use client";

import React, { useState, useEffect } from "react";

export default function BridgePage() {
    const [sellAmount, setSellAmount] = useState<number | string>("");
    const [buyAmount, setBuyAmount] = useState<number | string>("");
    const [selectedSellToken, setSelectedSellToken] = useState<string>("USDC");

    const conversionRates: Record<string, number> = {
        ETH: 1
    };

    const calculateBuyAmount = (sellAmount: number | string) => {
        if (!sellAmount || isNaN(Number(sellAmount))) return "";
        const rate = conversionRates[selectedSellToken] || 1;
        return (Number(sellAmount) * rate).toFixed(4);
    };

    useEffect(() => {
        const calculatedAmount = calculateBuyAmount(sellAmount);
        setBuyAmount(calculatedAmount);
    }, [sellAmount, selectedSellToken]);

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <div className="bg-neutral-900 text-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-xl font-semibold mb-6">Bridge</h2>

                <div className="mb-4">
                    <label className="block text-sm mb-2">Sell</label>
                    <div className="flex items-center border border-gray-700 rounded-lg p-2">
                        <input
                            type="number"
                            value={sellAmount}
                            onChange={(e) => setSellAmount(e.target.value)}
                            placeholder="0.00"
                            className="bg-transparent text-white w-full outline-none"
                        />
                        <select
                            value={selectedSellToken}
                            onChange={(e) => setSelectedSellToken(e.target.value)}
                            className="bg-transparent text-white outline-none ml-2"
                        >
                            <option value="ETH">ETH</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-2">Buy</label>
                    <div className="flex items-center border border-gray-700 rounded-lg p-2">
                        <input
                            type="text"
                            value={buyAmount}
                            readOnly
                            placeholder="0.00"
                            className="bg-transparent text-white w-full outline-none"
                        />
                        <span className="ml-2 text-white">ETH</span>
                    </div>
                </div>

                <div className="text-gray-500 text-sm mb-6">Estimated Gas: 0.00</div>

                <button className="bg-white text-black font-semibold w-full py-2 rounded-lg">
                    Bridge
                </button>
            </div>
        </div>
    );
};
