import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PriceSummaryModel } from '../model/priceSummaryModel';
import { Instrument } from '../model/instrument';
import { BidAsk } from '../model/bidAsk';

@Injectable({
  providedIn: 'root'
})
export class MarketWatchService {
  instruments: Instrument[] = new Array<Instrument>();
  priceSummaryModel: PriceSummaryModel[] = new Array<PriceSummaryModel>();
  bidAsk: BidAsk[] = new Array<BidAsk>();

  bidAskEventEmitter: EventEmitter<BidAsk> = new EventEmitter<BidAsk>();
  constructor() { 
    this.setInstruments();
    this.setPriceSummary();
    this.setBidAsk();
  }

  private setInstruments() {
    this.instruments.push({market: 'forex', category: 'futures', symbol:'US30_USD', description: '' });
    this.instruments.push({market: 'forex', category: 'futures', symbol:'NAS100_USD', description: '' });
    this.instruments.push({market: 'forex', category: 'futures', symbol:'SPX500_USD', description: '' });
    this.instruments.push({market: 'forex', category: 'futures', symbol:'US2000_USD', description: '' });
    this.instruments.push({market: 'forex', category: 'futures', symbol:'XAU_USD', description: '' });
    this.instruments.push({market: 'forex', category: 'futures', symbol:'XAG_USD', description: ''});
    this.instruments.push({market: 'futures', category: 'index', symbol:'CME:ES', description: '' });
    this.instruments.push({market: 'futures', category: 'index', symbol:'CME:NQ', description: ''});
    this.instruments.push({market: 'futures', category: 'index', symbol:'CME:RTY', description: '' });
    this.instruments.push({market: 'futures', category: 'index', symbol:'CME:YM', description: ''});
    this.instruments.push({market: 'futures', category: 'energy', symbol:'NYMEX:CL', description: '' });
    this.instruments.push({market: 'futures', category: 'metal', symbol:'COMEX:GC', description: '' });
    this.instruments.push({market: 'futures', category: 'currency', symbol:'CME:6E', description: '' });
    this.instruments.push({market: 'forex', category: 'major', symbol:'EUR/USD', description: '' });
    this.instruments.push({market: 'forex', category: 'major', symbol:'USD/JPY', description: '' });
    this.instruments.push({market: 'forex', category: 'major', symbol:'GBP/USD', description: ''});
    this.instruments.push({market: 'forex', category: 'major', symbol:'USD/CHF', description: '' });
    this.instruments.push({market: 'forex', category: 'major', symbol:'AUD/USD', description: ''});
    this.instruments.push({market: 'forex', category: 'major', symbol:'USD/CAD', description: '' });
    this.instruments.push({market: 'forex', category: 'major', symbol:'NZD/USD', description: '' });
    this.instruments.push({market: 'forex', category: 'major', symbol:'EUR/GBP', description: '' });
  }
  private setPriceSummary() {
    this.instruments.forEach((instrument: Instrument) => {
      this.priceSummaryModel.push({instrument: instrument, displayState: 'show', showChart: false, showDetails: false, bookmark: false});
    });
  }
  private setBidAsk() {
    
    this.instruments.forEach((instrument: Instrument) => {      
      this.bidAsk.push({instrument: instrument, bid: 0, ask: 0});
    });

    const us30 = this.bidAsk.find(b => b.instrument.symbol === 'US30_USD')!;
    if(us30) { us30.bid = 33520, us30.ask = 33525};
  }
  public getPriceSummary(): Observable<PriceSummaryModel[]> {
    return of(this.priceSummaryModel);
  }

  private mockEventEmitter(symbol: string) {
    const bidAsk: BidAsk = this.bidAsk.find(b => b.instrument.symbol === symbol)!;
    const offset: number = symbol.indexOf("JPY") >= 0 ? .01 : .0001;
    const start: number = symbol.indexOf("JPY") >= 0 ? 111.00 : 1.00001;
    if(bidAsk) {
      if(bidAsk.bid === 0) {
        bidAsk.bid = start;
        bidAsk.ask = start + offset;
      }
      else {
        bidAsk.bid = bidAsk.bid + offset;
        bidAsk.ask = bidAsk.ask + offset;
      }
      this.bidAskEventEmitter.emit(bidAsk);
    }
  }
  public mockBidAsk() {
    setTimeout(() => {
      this.mockEventEmitter("AUD/USD");
      this.mockEventEmitter("USD/JPY");
      this.mockBidAsk();
    }, 1000);
  }
  public getBidAsk(): Observable<BidAsk[]> {
    return of(this.bidAsk);
  }
}
