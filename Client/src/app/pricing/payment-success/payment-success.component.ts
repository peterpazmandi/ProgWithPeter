import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { CheckoutSession } from 'src/app/_models/checkout/checkoutSession.model';
import { Subscription } from 'src/app/_models/subscription/subscription.model';
import { AccountService } from 'src/app/_services/account.service';
import { PaymentService } from 'src/app/_services/payment.service';
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
    private pricingService: PaymentService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    // this.reload(); // Needed because the user's data has to be updated
    this.pricingService.getCheckoutSession().subscribe(checkoutSession => {
      if(checkoutSession.paymentStatus === PaymentStatus.PAID) {
        this.pricingService.getSubscriptionBySubscriptionId(checkoutSession.subscriptionId).subscribe(subscription => {
          this.checkoutSession = checkoutSession;
          this.subscription = subscription;
          
          this.updateCustomerId();
        }, error => {
          console.log(error);
        })
      } else {
        this.router.navigateByUrl('/pricing');
      }
    }, error => {
      this.router.navigateByUrl('/pricing');    
    });
  }

  updateCustomerId() {
    this.accountService.updateCustomerId(this.subscription.customerId).subscribe((result: any) => {
      console.log(result);
      
      if (result.isChanged) {
        this.toastr.success(result.message);
      } else {
        this.toastr.warning(result.message);
      }
    }, error => {
      console.log(error);
    });
  }

  
  private reload() {
    this._document.defaultView?.location.reload();
  }
}
