import { Injectable, EventEmitter } from '@angular/core';
import { Pivot, OHLCPrevDay, PivotLevel, BidAsk } from 'src/model/tcpMessage';

@Injectable({
  providedIn: 'root'
})
export class TcpMessageService {
  pivotEventEmitter: EventEmitter<Pivot> = new EventEmitter<Pivot>();
  prevOHLCEventEmitter: EventEmitter<OHLCPrevDay> = new EventEmitter<OHLCPrevDay>();
  bidAskEventEmitter: EventEmitter<BidAsk> = new EventEmitter<BidAsk>();

  constructor() { }
  public init() {  
    const events = new EventSource('http://localhost:3500/events', { withCredentials: false});
  
    events.onmessage = (event) => {
      const eventData: any = JSON.parse(JSON.parse(event.data));
      this.bidAskEventEmitter.emit({instrument: eventData.instrument, bid: eventData.bid, ask: eventData.ask});
      if(eventData.type === 'pivot') {   
        const pivot: Pivot = {
          instrument: eventData.instrument,
          tickSize: eventData.tickSize,
          type: eventData.type,
          lastUpdate: new Date(),
          pivotLevels: new Array<PivotLevel>()
        };
        [...eventData.data].forEach(pl => {
          pivot.pivotLevels.push({name: pl.name, value: pl.value, difference: pl.difference});
        });   
        this.pivotEventEmitter.emit(pivot);
      }
      else if(eventData.type === 'PrevOHLC') {
        const ohlcPrevDay: OHLCPrevDay = {
          instrument: eventData.instrument,
          tickSize: eventData.tickSize,
          type: eventData.type,
          lastUpdate: new Date(),
          previousDayHigh: eventData.data.previousDayHigh,
          previousDayHighDiff: eventData.data.previousDayHighDiff,
          previousDayLow: eventData.data.previousDayLow,
          previousDayLowDiff: eventData.data.previousDayLowDiff        
        }
        debugger;
        this.prevOHLCEventEmitter.emit(ohlcPrevDay);
      }
    };
  }
}
