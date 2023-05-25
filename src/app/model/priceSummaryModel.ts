import { Instrument } from "./instrument";

export interface PriceSummaryModel {
    instrument: Instrument;
    showDetails: boolean;
    showChart: boolean;
    bookmark: boolean;
    displayState: string;
}
