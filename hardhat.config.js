require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    goerli: {
      url: process.env.QUICKNODE_API_KEY_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
    },
    // need to create api key
    // matic: {
    //   url: process.env.,
    //   accounts: [process.env.GOERLI_PRIVATE_KEY],
    // },
    hardhat: {
      blockGasLimit: 10000000000,
    },
    localhost: {
      chainId: 31337,
    }
  },
  namedAccounts: {
    deployer: {
      default: 0, 
      1: 0, 
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  // settings: {
  //   optimizer: {
  //     enabled: true,
  //     runs: 1
  //   }
  // }
};