import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MarketWatchModel } from 'src/app/model/marketWatchModel';
import { PriceSummaryModel } from 'src/app/model/priceSummaryModel';
import { MarketWatchService } from 'src/app/service/market-watch.service';

@Component({
  selector: 'app-market-watch',
  templateUrl: './market-watch.component.html',
  styleUrls: ['./market-watch.component.css']
})
export class MarketWatchComponent implements OnInit {  
  marketWatchModel: MarketWatchModel = new MarketWatchModel();

  constructor(public marketWatchService: MarketWatchService, public changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.marketWatchService.getPriceSummary().subscribe((priceSummaryModels: PriceSummaryModel[]) => {
      this.sortPriceSummaryModel(priceSummaryModels);
    });
  }

  public onClickBookmark(symbol: string) {
    setTimeout(() => {
      const priceSummaryModel = this.marketWatchModel.priceSummaryModel.find(p => p.instrument.symbol === symbol)!;
      const newArray = this.marketWatchModel.priceSummaryModel.filter(p => p.instrument.symbol !== symbol);
      const newPriceSummaryModel = Object.create(priceSummaryModel);
      newPriceSummaryModel.displayState = 'hidden';
      newPriceSummaryModel.bookmark = !newPriceSummaryModel.bookmark;
      newArray.push(newPriceSummaryModel);
      this.sortPriceSummaryModel(newArray);
      setTimeout(() => {
        newPriceSummaryModel.displayState = 'show';}, 300
      );      
    }, 700);
  }

  private sortPriceSummaryModel(priceSummaryModels: PriceSummaryModel[]) {
    const sortedBookmarked = priceSummaryModels.filter(p => p.bookmark).sort((a,b) => a.instrument.symbol < b.instrument.symbol ? -1 : 1);
    const remaining = priceSummaryModels.filter(p => !p.bookmark).sort((a,b) => a.instrument.symbol < b.instrument.symbol ? -1 : 1);
    this.marketWatchModel.priceSummaryModel = sortedBookmarked.concat(remaining);
  }
}
