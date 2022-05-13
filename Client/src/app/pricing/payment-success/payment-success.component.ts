import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { CheckoutSession } from 'src/app/_models/checkout/checkoutSession.model';
import { Subscription } from 'src/app/_models/subscription/subscription.model';
import { AccountService } from 'src/app/_services/account.service';
import { PricingService } from 'src/app/_services/pricing.service';

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
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.pricingService.getCheckoutSession().subscribe(checkoutSession => {
      this.pricingService.getSubscriptionBySubscriptionId(checkoutSession.subscriptionId).subscribe(subscription => {
        this.checkoutSession = checkoutSession;
        this.subscription = subscription;
        
        this.updateUsersSubscriptionId();
      }, error => {
        console.log(error);
      })
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
      console.log(result);
    }, error => {
      console.log(error);
    });
  }

}
