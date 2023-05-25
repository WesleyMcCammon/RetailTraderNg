import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { transition, style, animate, trigger, state } from '@angular/animations';

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

  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  ngOnInit(): void {
  }

  handleDone($event: any) {
    // if($event.toState === 'hidden')
    //   debugger;
  }
}
