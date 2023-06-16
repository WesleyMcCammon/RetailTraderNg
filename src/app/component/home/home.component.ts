import { Component, OnInit } from '@angular/core';
import { TcpMessageService } from 'src/app/service/tcp-message.service';
import { BidAsk, OHLCPrevDay, Pivot, PivotLevel } from 'src/model/tcpMessage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pivots: Pivot[] = new Array<Pivot>();
  ohlcPrevDays: OHLCPrevDay[] = new Array<OHLCPrevDay>();
  instruments: string[] = new Array<string>();
  bidAsks: BidAsk[] = new Array<BidAsk>();
  staleDate: Date = new Date();

  constructor(private tcpMessageService: TcpMessageService) {
  }

  ngOnInit(): void {
    this.tcpMessageService.init();
    this.tcpMessageService.pivotEventEmitter.subscribe((pivot: Pivot) => {
      const existingPivot: Pivot = this.pivots.find(p => p.instrument === pivot.instrument)!;
      if(!existingPivot) {
        this.pivots.push(pivot);
      }
      else {
        existingPivot.lastUpdate = pivot.lastUpdate;
        existingPivot.pivotLevels = [...pivot.pivotLevels];
      }
      if(!this.instruments.includes(pivot.instrument)) {
        this.instruments.push(pivot.instrument);
      }
    });
    
    this.tcpMessageService.prevOHLCEventEmitter.subscribe((ohlcPrevDay: OHLCPrevDay) => {
      const existingOHLCPrevDay = this.ohlcPrevDays.find(p => p.instrument === ohlcPrevDay.instrument);
      if(!existingOHLCPrevDay) {
        this.ohlcPrevDays.push(ohlcPrevDay);
      }
      else {
        existingOHLCPrevDay.previousDayHigh = ohlcPrevDay.previousDayHigh;
        existingOHLCPrevDay.previousDayHighDiff = ohlcPrevDay.previousDayHighDiff;
        existingOHLCPrevDay.previousDayLow = ohlcPrevDay.previousDayLow;
        existingOHLCPrevDay.previousDayLowDiff = ohlcPrevDay.previousDayLowDiff;
        existingOHLCPrevDay.lastUpdate = ohlcPrevDay.lastUpdate;
      }
      if(!this.instruments.includes(ohlcPrevDay.instrument)) {
        this.instruments.push(ohlcPrevDay.instrument);
      }
    });

    this.tcpMessageService.bidAskEventEmitter.subscribe((bidAsk: BidAsk) => {
      const existingBidAsk: BidAsk = this.bidAsks.find(b => b.instrument === bidAsk.instrument)!;
      if(!existingBidAsk) {
        this.bidAsks.push(bidAsk);
      }
      else {
        existingBidAsk.ask = bidAsk.ask;
        existingBidAsk.bid = bidAsk.bid;
      }
    });
    this.staleDate = this.addMinutes(this.staleDate, -1);
    this.watchForStaleData();
  }

  getPivots(instrument: string): PivotLevel[] {
    const pivot: Pivot =  this.pivots.find(p => p.instrument === instrument)!;
    return pivot ? pivot.pivotLevels : [];
  }
  private addMinutes(date: Date, minutes: number) {
    const dateCopy = new Date(date);
    dateCopy.setMinutes(date.getMinutes() + minutes);

    return dateCopy;
  }
  
  getBid(instrument: string): string {
    const bidAsk: BidAsk = this.bidAsks.find(b => b.instrument === instrument)!;
    return bidAsk ? bidAsk.bid.toFixed(2) : '0.00';
  }
  
  getAsk(instrument: string): string {
    const bidAsk: BidAsk = this.bidAsks.find(b => b.instrument === instrument)!;
    return bidAsk ? bidAsk.ask.toFixed(2) : '0.00';
  }

  getPrevOHLC(instrument: string): PivotLevel[] {
    const ohlcPrevDay: OHLCPrevDay = this.ohlcPrevDays.find(p => p.instrument === instrument)!;
    const pivotLevels: PivotLevel[] = new Array<PivotLevel>();
    pivotLevels.push({name: 'Prev High', value: ohlcPrevDay.previousDayHigh, difference: ohlcPrevDay.previousDayHighDiff});
    pivotLevels.push({name: 'Prev Low', value: ohlcPrevDay.previousDayLow, difference: ohlcPrevDay.previousDayLowDiff});
    return pivotLevels;
  }
  private watchForStaleData() {
    this.staleDate.setSeconds(this.staleDate.getSeconds() + 1);
    setTimeout(() => {
      const pivots: Pivot[] = this.pivots.filter(p => p.lastUpdate < this.staleDate);
      pivots.forEach(p => {
        p.pivotLevels.forEach(pl => {
          pl.difference = 0,
          pl.value = 0
        })
      });
      this.watchForStaleData();
    }, 1000);
  }
}
