import { BlockchainSelector } from "src/types/blockchain-selector.model";
import { environment } from "./environment";

// first one is default one 
export const blockchains: BlockchainSelector[] = [
    {
        contractAddr: environment.zkevmContractEventFactoryAddress,
        blockchainAppApi: environment.zkevmAppApi,
        name: "Polygon zkEVM",
        chainId: 2442
    },
    {
        contractAddr: environment.neonContractEventFactoryAddress,
        blockchainAppApi: environment.neonAppApi,
        name: "Neon EVM",
        chainId: 245022926
    },
    {
        contractAddr: environment.sepoliaContractEventFactoryAddress,
        blockchainAppApi: environment.sepoliaAlchemyApi,
        name: "Sepolia",
        chainId: 11155111
    }
]