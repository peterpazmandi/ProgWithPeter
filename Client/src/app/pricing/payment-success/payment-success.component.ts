import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { CheckoutSession } from 'src/app/_models/checkout/checkoutSession.model';
import { Subscription } from 'src/app/_models/subscription/subscription.model';
import { AccountService } from 'src/app/_services/account.service';
import { PricingService } from 'src/app/_services/pricing.service';
import { PaymentStatus } from 'src/app/_utils/paymentStatus.enum';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  checkoutSession: CheckoutSession;
  subscription: Subscription;

  constructor(
    private pricingService: PricingService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.pricingService.getCheckoutSession().subscribe(checkoutSession => {
      if(checkoutSession.paymentStatus === PaymentStatus.PAID) {
        this.pricingService.getSubscriptionBySubscriptionId(checkoutSession.subscriptionId).subscribe(subscription => {
          this.checkoutSession = checkoutSession;
          this.subscription = subscription;
          
          this.updateUsersSubscriptionId();
        }, error => {
          console.log(error);
        })
      } else {
        this.router.navigateByUrl('/pricing');
      }
    }, error => {
      console.log(error);      
    });
  }

  updateUsersSubscriptionId() {
    this.accountService.updateSubscriptionId(this.subscription.id).subscribe((result: any) => {
      if (result.isChanged) {
        this.toastr.success(result.message);
      } else {
        this.toastr.warning(result.message);
      }
    }, error => {
      console.log(error);
    });
  }

}
