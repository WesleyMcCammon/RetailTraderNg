import { Component, Input, OnInit } from '@angular/core';
import { PriceChip } from 'src/app/model/priceChip';

@Component({
  selector: 'app-price-chip',
  templateUrl: './price-chip.component.html',
  styleUrls: ['./price-chip.component.css']
})
export class PriceChipComponent implements OnInit {
  @Input() title: string = '';

  priceChips: PriceChip[] = new Array<PriceChip>();

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
  }

  getChipBackgroundColor(priceChip: PriceChip) {
    return Math.abs(priceChip.difference) < 100 ? 'seagreen' : '#545454';
  }
}
