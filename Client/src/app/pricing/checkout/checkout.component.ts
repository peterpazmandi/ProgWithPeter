import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PricingService } from 'src/app/_services/pricing.service';
import { MembershipTypes } from 'src/app/_utils/membershipTypes.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  membershipTypes: typeof MembershipTypes

  constructor(
    public pricingService: PricingService,
    private toastr: ToastrService,
    private router: Router) {
    this.membershipTypes = MembershipTypes;
   }

  ngOnInit(): void {
    if(this.pricingService.selectedMembership === undefined) {
      this.router.navigateByUrl('/pricing');
      this.toastr.warning('First select a membership');

    }

    this.scrollToTop();
  }


  private scrollToTop() {
    window.scrollTo(0, 0);
  }
}
