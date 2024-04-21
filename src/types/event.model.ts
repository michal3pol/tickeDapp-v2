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