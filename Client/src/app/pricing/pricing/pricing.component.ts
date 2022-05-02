import { Component, OnInit } from '@angular/core';
import { PricingService } from 'src/app/_services/pricing.service';
import { MemberShipPlan } from '../model/memberShipPlan.model';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  subscriptionPeriod: boolean = false;
  membershipPlans: MemberShipPlan[] = [];

  constructor(private pricingService: PricingService) {
    this.membershipPlans = pricingService.getMemberships();
   }

  ngOnInit(): void {
  }

  onChangePeriod() {
    console.log(this.subscriptionPeriod);
  }
}
