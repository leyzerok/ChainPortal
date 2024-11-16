import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
dotenv.config();
const {
  DEV_PRIVATE_KEY,
  PROD_PRIVATE_KEY,
  ETHERSCAN_KEY,
  POLYGONSCAN_KEY,
  ETHEREUM_RPC,
  POLYON_RPC,
  SEPOLIA_RPC,
  AMOY_RPC,
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.27",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 137,
      forking: {
        url: `${POLYON_RPC}`,
        blockNumber: 56001748,
      },
    },
    mainnet: {
      url: `${ETHEREUM_RPC}`,
      chainId: 1,
      accounts: [`${PROD_PRIVATE_KEY}`],
      gasPrice: 35000000000, //35 gwei
    },
    sepolia: {
      url: `${SEPOLIA_RPC}`,
      chainId: 11155111,
      accounts: [`${DEV_PRIVATE_KEY}`],
    },
    polygon: {
      url: `${POLYON_RPC}`,
      chainId: 137,
      accounts: [`${PROD_PRIVATE_KEY}`],
    },
    amoy: {
      url: `${AMOY_RPC}`,
      chainId: 80002,
      accounts: [`${DEV_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_KEY,
      sepolia: ETHERSCAN_KEY,
      amoy: POLYGONSCAN_KEY,
      polygonMumbai: POLYGONSCAN_KEY,
    },
    customChains: [
      {
        network: "mainnet",
        chainId: 1,
        urls: {
          apiURL: "https://api.etherscan.io/api",
          browserURL: "https://etherscan.io",
        },
      },
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io/",
        },
      },
      {
        network: "amoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com/",
        },
      },
    ],
  },
};

export default config;
