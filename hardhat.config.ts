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
  networks: {
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
