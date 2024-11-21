export default function Docs() {
    return (
        <div className="container mx-auto px-4 py-8 bg-gray-900 text-gray-100">
            <h1 className="text-4xl font-extrabold text-[#00FF94] mb-6 border-b border-[#00FF94]/50 pb-2">
                Documentation
            </h1>
            <p className="text-lg leading-relaxed mb-8">
                Welcome to the ChainPortal documentation. ChainPortal simplifies cross-chain asset management, enabling seamless swaps, secure transfers, and portfolio tracking across blockchain networks.
            </p>

            <section className="mb-10">
                <h2 className="text-3xl font-semibold mb-4 text-[#00FF94]">What We’ve Built</h2>
                <p className="text-lg leading-relaxed">
                    ChainPortal breaks down blockchain complexities, offering a unified, intuitive platform for managing assets across multiple chains. Our dApp integrates advanced tools to address interoperability, security, and user accessibility.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-3xl font-semibold mb-4 text-[#00FF94]">Technologies We Use</h2>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>
                        <strong className="text-gray-100">Dynamic:</strong> Wallet connection and authentication with top-tier security.
                    </li>
                    <li>
                        <strong className="text-gray-100">Onchain Kit:</strong> Efficient on-chain swaps directly within the app.
                    </li>
                    <li>
                        <strong className="text-gray-100">Chainlink CCIP:</strong> Secure and reliable cross-chain token transfers.
                    </li>
                    <li>
                        <strong className="text-gray-100">LayerZero (future integration):</strong> Broader cross-chain compatibility in future updates.
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-3xl font-semibold mb-4 text-[#00FF94]">What Makes ChainPortal Unique</h2>
                <p className="text-lg leading-relaxed mb-4">
                    ChainPortal integrates multiple protocols into a single platform, eliminating the need to navigate between different dApps. With Chainlink CCIP and Dynamic, we ensure secure and reliable cross-chain and on-chain transactions.
                </p>
                <p className="text-lg leading-relaxed">
                    Our user-friendly interface caters to both experienced blockchain users and beginners, making DeFi accessible to all.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-3xl font-semibold mb-4 text-[#00FF94]">Deployment</h2>
                <p className="text-lg leading-relaxed">
                    Chainlink CCIP contracts are deployed on the following mainnets:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Optimism Mainnet</li>
                    <li>Arbitrum Mainnet</li>
                    <li>Base Mainnet</li>
                </ul>
                <p className="mt-4 text-lg">
                    <strong className="text-gray-100">Contract Address:</strong>
                    <span className="text-[#00FF94] ml-2">0x3AcD9CE5468BD6B2Bab1493ef44F91F5616cA0FF</span>
                </p>
            </section>
        </div>
    );
}
