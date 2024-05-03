export interface NftEventMetadata {
    name: string
    description: string
    image: string
    date: Date
}

export interface NftTicketMetadata {
    description: string;
    external_url?: string;
    image: string;
    name: string;
    attributes: Attribute[];
    // above opensea compatible properties, event is optional
    event?: NftEventMetadata
}
export interface Attribute {
    trait_type: string;
    value: string | number | Date;
    display_type?: string;
}

export const enum TRAIT_TYPE {
    SECTOR = 'Sector',
    TOKEN_ID = 'Token Id',
    PRICE = 'Price',
    SEAT_NO = 'Seat Number',
    DATE = 'Date'
}

export const enum DISPLAY_TYPE {
    DATE = 'date',
    NUMBER = 'number'
}

/// @TODO check for refactor 
export interface Contract {
    address: string
}
export interface Id {
    tokenId: number
    tokenMetadata: TokenMetadata
}
export interface TokenMetadata {
    tokenType: string
}
export interface TokenUri {
    raw: string
    gateway: string
}
export interface Metadata {
    name: string
    description: string
    attributes: Attribute[]
}

export interface NFT {
    contract: Contract
    id: Id
    balance: number
    tokenUri: TokenUri
    metadata: Metadata
}

export interface OwnedNFTs {
    ownedNfts: NFT[]
    totalCount: number
}