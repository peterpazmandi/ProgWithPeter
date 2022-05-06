import { Component, OnInit } from '@angular/core';
import { PricingService } from 'src/app/_services/pricing.service';
import { MembershipTypes } from 'src/app/_utils/membershipTypes.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  membershipTypes: typeof MembershipTypes

  constructor(public pricingService: PricingService) {
    this.membershipTypes = MembershipTypes;
   }

  ngOnInit(): void {
    console.log(this.pricingService.selectedMembership);

    this.scrollToTop();
  }


  private scrollToTop() {
    window.scrollTo(0, 0);
  }
}
