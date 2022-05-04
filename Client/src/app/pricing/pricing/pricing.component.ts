import { Component, OnInit } from '@angular/core';
import { MembershipDto } from 'src/app/_models/membershipDto.model';
import { PricingService } from 'src/app/_services/pricing.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  subscriptionPeriod: boolean = false;
  memberships: MembershipDto[] = [];

  constructor(private pricingService: PricingService) {
   }

  ngOnInit(): void {
    this.pricingService.getMemberships().subscribe(response => {
      this.memberships.push(...response as MembershipDto[]);
    }, error => {
      console.log(error);
    })
  }

  onChangePeriod() {
    console.log(this.subscriptionPeriod);
  }
}
