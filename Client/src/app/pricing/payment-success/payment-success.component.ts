import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CheckoutSession } from 'src/app/_models/checkout/checkoutSession.model';
import { Subscription } from 'src/app/_models/subscription/subscription.model';
import { PricingService } from 'src/app/_services/pricing.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  checkoutSession: CheckoutSession;
  subscription: Subscription;

  constructor(private pricingService: PricingService) { }

  ngOnInit(): void {
    this.pricingService.getCheckoutSession().subscribe(checkoutSession => {
      this.pricingService.getSubscriptionBySubscriptionId(checkoutSession.subscriptionId).subscribe(subscription => {
        this.checkoutSession = checkoutSession;
        this.subscription = subscription;
      }, error => {
        console.log(error);
        
      })
    }, error => {
      console.log(error);
      
    });
  }

}
