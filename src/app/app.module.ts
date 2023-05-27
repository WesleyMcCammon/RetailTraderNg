import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatButtonModule} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatChipsModule} from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { PriceSummaryComponent } from './component/price-summary/price-summary.component';
import { MarketWatchComponent } from './component/market-watch/market-watch.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { BidAskComponent } from './component/bid-ask/bid-ask.component';
import { PriceChipComponent } from './component/price-chip/price-chip.component';
import { AlertChipComponent } from './component/alert-chip/alert-chip.component';
import { PriceSummaryFilterComponent } from './component/price-summary-filter/price-summary-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PriceSummaryComponent,
    MarketWatchComponent,
    DashboardComponent,
    BidAskComponent,
    PriceChipComponent,
    AlertChipComponent,
    PriceSummaryFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
