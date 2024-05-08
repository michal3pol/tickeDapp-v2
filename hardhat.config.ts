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
  networks: {
    sepolia: {
      url: process.env['SEPOLIA_API_KEY_URL'],
      accounts: [process.env['WALLET_PRIVATE_KEY']!],
    },
    zkEVM: {
      url: process.env["ZK_API_KEY_URL"],
      accounts: [process.env['ZK_WALLET_PRIVATE_KEY']!],
    },
    hardhat: {
      blockGasLimit: 10000000000,
    },
    localhost: {
      chainId: 31337,
    },
  },
  docgen: { 
    outputDir: "./documentation-solidity"
  } // if necessary to customize config
};

export default config;
