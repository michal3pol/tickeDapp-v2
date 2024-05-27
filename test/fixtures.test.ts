import { BigNumber } from "ethers";

export interface RateScoreTest {
    postiveVotes: BigNumber;
    negativeVotes: BigNumber;
}

export const enum ErrorMessages {
    AlreadyVoted = "AlreadyVoted",
    OnlyOwner = "OnlyOwner",
    InsufficientFounds = "InsufficientFounds"
} 

// constants
export const eventType = 0;
export const ipfsLink = 'https://ipfs.link';
export const sectorsName = ["A1", "A2", "A3", "A4"];
export const sectorsNoPlace = [25, 25, 25, 25];
export const sectorsNumerable = [true, true, false, false];
export const sectorsPrice = [1000000000000000, 1000000000000000, 1000000000000000, 1000000000000000];

