export interface TcpMessage {
    instrument: string;
    type: string;
    tickSize: number;
    bid: number;
    ask: number;
    data: any[];
}

export interface BidAsk {
    instrument: string;
    bid: number;
    ask: number;
}
export interface PivotLevel {
    name: string;
    value: number;
    difference: number;
}

export interface NT8Data {
    instrument: string;
    type: string;
    tickSize: number;
    lastUpdate: Date;
}

export interface Pivot extends NT8Data {
    pivotLevels: PivotLevel[];
}

export interface OHLCPrevDay extends NT8Data {
    previousDayHigh: number;
    previousDayLow: number; 
    previousDayHighDiff: number;
    previousDayLowDiff: number;
}