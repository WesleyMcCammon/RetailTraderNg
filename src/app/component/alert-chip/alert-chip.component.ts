import { Component, Input, OnInit } from '@angular/core';
import { AlertChip } from 'src/app/model/alertChip';

@Component({
  selector: 'app-alert-chip',
  templateUrl: './alert-chip.component.html',
  styleUrls: ['./alert-chip.component.css']
})
export class AlertChipComponent implements OnInit {
  @Input() title: string = '';

  alertChips: AlertChip[] = new Array<AlertChip>();

  ngOnInit(): void {
    this.alertChips.push({name: 'R1', time: new Date(2023, 5, 20, 6, 0, 0), age:10});
    this.alertChips.push({name: 'R3', time: new Date(2023, 5, 20, 3, 0, 0), age:10});
    this.alertChips.push({name: 'Pp', time: new Date(2023, 5, 20, 4, 0, 0), age:10});
    this.alertChips.push({name: 'VWAP', time: new Date(2023, 5, 20, 5, 0, 0), age:10});
    this.alertChips.push({name: 'R2', time: new Date(2023, 5, 20, 6, 0, 0), age:10});
  }

  getChipBackgroundColor(alertChip: AlertChip) {
    const currentDateTime = new Date();
    var diff = currentDateTime.getTime() - alertChip.time.getTime();
    var mins = Math.floor(diff / (1000 * 60));
    if(alertChip.name === 'R1') console.log(mins);
    diff -= mins * (1000 * 60);
    alertChip.age = diff;
    return Math.abs(alertChip.age) < 90 ? 'green' : 'indianred';
  }
}
