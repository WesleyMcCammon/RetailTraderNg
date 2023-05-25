import { Instrument } from "./instrument";

export interface BidAsk {
    instrument: Instrument;
    bid: number;
    ask: number;
}