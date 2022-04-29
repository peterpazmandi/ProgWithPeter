import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  subscriptionPeriod: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onChangePeriod() {
    console.log(this.subscriptionPeriod);
  }
}
