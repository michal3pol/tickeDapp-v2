import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { default as dotenv } from 'dotenv';
import 'solidity-docgen';

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
    },
  },
  // defaultNetwork: "neondevnet",
    etherscan: {
        apiKey: {
            neonevm: "test"
        },
        customChains: [
            {
                network: "neonevm",
                chainId: 245022926,
                urls: {
                    apiURL: "https://devnet-api.neonscan.org/hardhat/verify",
                    browserURL: "https://devnet.neonscan.org"
                }
            },
            {
                network: "neonevm",
                chainId: 245022934,
                urls: {
                    apiURL: "https://api.neonscan.org/hardhat/verify",
                    browserURL: "https://neonscan.org"
                }
            }
        ]
    },
  networks: {
    eth_mainnet: {
      url: process.env['ETH_MMAINNET_API_KEY_URL'],
      accounts: [process.env['WALLET_PRIVATE_KEY']!],    
    },
    zk_mainnet: {
      url: process.env['ZK_MMAINNET_API_KEY_URL'],
      accounts: [process.env['WALLET_PRIVATE_KEY']!],    
    },
    sepolia: {
      url: process.env['SEPOLIA_API_KEY_URL'],
      accounts: [process.env['WALLET_PRIVATE_KEY']!],
    },
    zkEVM: {
      url: process.env["ZK_API_KEY_URL"],
      accounts: [process.env['ZK_WALLET_PRIVATE_KEY']!],
    },
    neondevnet: {
      url: "https://devnet.neonevm.org",
      accounts: [process.env["NEON_WALLET_PRIVATE_KEY"]!],
      chainId: 245022926
    },
    neon_mainnet: {
      url: "https://neon-proxy-mainnet.solana.p2p.org",
      accounts: [process.env["NEON_WALLET_PRIVATE_KEY"]!],
      chainId: 245022934
    },
    hardhat: {
      blockGasLimit: 10000000000,
    },
    localhost: {
      chainId: 31337,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-rep.txt",
    coinmarketcap: process.env['COINMARKET_API_KEY'],
    token: "ETH"
  },
  docgen: { 
    outputDir: "./documentation-solidity"
  } // if necessary to customize config
};

export default config;
