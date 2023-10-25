// Loading env configs for deploying and public contract source
import * as dotenv from 'dotenv';
dotenv.config();
import { HardhatUserConfig } from 'hardhat/config';

import '@nomicfoundation/hardhat-toolbox';
// Using hardhat-ethers plugin for deploying
// See here: https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html
//           https://hardhat.org/guides/deploying.html
import '@nomiclabs/hardhat-ethers';

import '@nomicfoundation/hardhat-chai-matchers';

// Verify and public source code on etherscan
import '@nomiclabs/hardhat-etherscan';

// Upgradeable
import '@openzeppelin/hardhat-upgrades';

// Coverage testing
import 'solidity-coverage';

// check size
import 'hardhat-contract-sizer';

// reporter
import 'hardhat-gas-reporter';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      accounts: { count: 20 },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.DEPLOY_ACCOUNT!],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.DEPLOY_ACCOUNT!],
    },
    ethereum: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.DEPLOY_ACCOUNT!],
    },
    frame: {
      url: 'http://127.0.0.1:1248', // To run inside WSL2, see IP in file /etc/resolv.conf
      timeout: 4000000
    }
  },
  etherscan: {
    apiKey: {
      mainnet: `${process.env.ETHERSCAN_API_KEY}`,
      goerli: `${process.env.ETHERSCAN_API_KEY}`,
      sepolia: `${process.env.ETHERSCAN_API_KEY}`,
    }
  },

  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: true },
          },
          viaIR: true,
        },
      },
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 200000000,
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
      configFile: './mocha-report.json',
    },
  },
  gasReporter: {
    currency: 'BNB',
    gasPrice: 21,
    enabled: false, // process.env.REPORT_GAS ? true :
  },
};

export default config;
