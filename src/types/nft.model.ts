export interface NftEventMetadata {
    name: string
    description: string
    image?: string
    date: Date
}

export interface NftTicketMetadata {
    sector: string;
    tokenId: number
    price: string
    seatNo?: number
    numerable: boolean
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
export interface Attribute {
    display_type: string
    trait_type: string
    value: number
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