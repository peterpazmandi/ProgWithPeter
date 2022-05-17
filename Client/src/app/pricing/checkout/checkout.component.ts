import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/_services/payment.service';
import { MembershipTypes } from 'src/app/_utils/membershipTypes.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  membershipTypes: typeof MembershipTypes

  constructor(
    public pricingService: PaymentService,
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

  onCheckoutClicked() {
    this.pricingService.requestMemberSession(this.pricingService.selectedMembership.prices[0].id);
  }
}
