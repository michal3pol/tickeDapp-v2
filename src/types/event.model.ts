export interface RateScore {
    postiveVotes: number;
    negativeVotes: number;
}
  
export interface EventInfo {
    eventAddress: string;
    descLink: string;
}
  
export enum EventType {
    Other,
    Sport,
    Culture,
    Conference,
    Festival,
    Family,
    Virtual
}

export interface EventData {
    name: string;
    description: string;
    image: string;
    date: Date;
    sectors: SectorData[];
    eventAddress?: string;
    ipfsLink?: string;
}

export interface SectorData {
    name: string;
    numerableSeats: boolean;
    seatsFrom?: number;
    seatsTo: number;
    price: string;
}


