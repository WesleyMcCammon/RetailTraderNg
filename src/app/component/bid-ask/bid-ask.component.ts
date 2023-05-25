import { Component, OnInit, Input } from '@angular/core';
import { BidAsk } from 'src/app/model/bidAsk';
import { MarketWatchService } from 'src/app/service/market-watch.service';

@Component({
  selector: 'app-bid-ask',
  templateUrl: './bid-ask.component.html',
  styleUrls: ['./bid-ask.component.css']
})
export class BidAskComponent implements OnInit {
  @Input() symbol: string = '';
  bid: string = '';
  ask: string = '';

  constructor(private marketWatchService: MarketWatchService) {}

  ngOnInit(): void {
    const precision = this.symbol.indexOf("JPY") >= 0 ? 2 : 5;
    this.marketWatchService.bidAskEventEmitter.subscribe((bidAsk: BidAsk) => {
      if(bidAsk.instrument.symbol === this.symbol) {
        this.bid = bidAsk.bid.toFixed(precision);
        this.ask = bidAsk.ask.toFixed(precision);
      }
    });
  }
}
