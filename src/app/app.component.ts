import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketWatchService } from './service/market-watch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-app';

  constructor(private router: Router, private marketWatchService: MarketWatchService) {

  }

  ngOnInit(): void {
    this.marketWatchService.mockBidAsk();
  }
  navigateTo(url: string) {
    const navigateUrl: string = `/${url}`
    this.router.navigate([navigateUrl]);
  }
}
