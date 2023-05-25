import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { transition, style, animate, trigger, state } from '@angular/animations';

interface PriceChip {
  name: string;
  price: number;
  difference: number;
  color: string;
}

interface AlertChip {
  name: string;
  time: Date,
  age: number
}

@Component({
  selector: 'app-price-summary',
  templateUrl: './price-summary.component.html',
  styleUrls: ['./price-summary.component.css'],
  animations: [
    trigger("componentDisplayState", [
      state("hidden",
      style({
        opacity: 0
      })
    ),
    state("show",
      style({
        opacity: 1
      })
    ),
    transition( "show => hidden", animate( "1000ms ease-in-out" ) ),
    transition( "hidden => show", animate( "500ms ease-in-out" ) )
    ])
  ]
})
export class PriceSummaryComponent implements OnInit {
  @Input() symbol: string = '';
  @Input() description: string = '';
  @Input() showChart: boolean = false;
  @Input() showDetails: boolean = false;
  @Input() bookmark: boolean = false;
  _displayState: string = '';
  get displayState(): string { return this._displayState; }
  @Input('displayState') set displayState(value: string) {
    this._displayState = value;
  }
  @Output() selectBookmark = new EventEmitter<string>();

  showIcons: boolean = true;
  toggleBookmark() {
    this.selectBookmark.emit(this.symbol);
    this.displayState = 'hidden';
  }
  
  priceChips: PriceChip[] = new Array<PriceChip>();
  alertChips: AlertChip[] = new Array<AlertChip>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  ngOnInit(): void {

    this.priceChips.push({name: 'R4', price: 13500.25, difference: 23223.45, color: '#efefef'});
    this.priceChips.push({name: 'R3', price: 13500.25, difference: 23223.45, color: '#efefef'});
    this.priceChips.push({name: 'R2', price: 13500.25, difference: 23223.45, color: '#efefef'});
    this.priceChips.push({name: 'R1', price: 13500.25, difference: 99, color: '#efefef'});
    this.priceChips.push({name: 'Pp', price: 13500.25, difference: 23223.45, color: '#efefef'});
    this.priceChips.push({name: 'S1', price: 13500.25, difference: 23223.45, color: '#efefef'});
    this.priceChips.push({name: 'S2', price: 13500.25, difference: 23223.45, color: '#efefef'});
    this.priceChips.push({name: 'S3', price: 13500.25, difference: -99, color: '#efefef'});
    this.priceChips.push({name: 'S4', price: 13500.25, difference: 23223.45, color: '#efefef'});
    this.priceChips.push({name: 'VWAP', price: 13500.25, difference: 23223.45, color: '#efefef'});

    
    this.alertChips.push({name: 'R1', time: new Date(2023, 5, 20, 6, 0, 0), age:10});
    this.alertChips.push({name: 'R3', time: new Date(2023, 5, 20, 3, 0, 0), age:10});
    this.alertChips.push({name: 'Pp', time: new Date(2023, 5, 20, 4, 0, 0), age:10});
    this.alertChips.push({name: 'VWAP', time: new Date(2023, 5, 20, 5, 0, 0), age:10});
    this.alertChips.push({name: 'R2', time: new Date(2023, 5, 20, 6, 0, 0), age:10});
  }
  handleDone($event: any) {
    // if($event.toState === 'hidden')
    //   debugger;
  }

  getPriceChipBackgroundColor(priceChip: PriceChip) {
    return Math.abs(priceChip.difference) < 100 ? 'seagreen' : '#545454';
  }

  getAlertChipBackgroundColor(alertChip: AlertChip) {
    const currentDateTime = new Date();
    var diff = currentDateTime.getTime() - alertChip.time.getTime();
    var mins = Math.floor(diff / (1000 * 60));
    if(alertChip.name === 'R1') console.log(mins);
    diff -= mins * (1000 * 60);
    alertChip.age = diff;
    return Math.abs(alertChip.age) < 90 ? 'green' : 'indianred';
  }
}
