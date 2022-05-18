import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckoutSession } from '../_models/checkout/checkoutSession.model';
import { MembershipDto } from '../_models/membershipDto.model';
import { Session } from '../_models/session.model';
import { Subscription } from '../_models/subscription/subscription.model';
import { SubscriptionDto } from '../_models/subscriptionDto.model';
import { BaseService } from './base.service';

declare const Stripe: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {
  selectedMembership: MembershipDto;

  getMemberships() {
    return this.http.get(
      this.baseUrl + 'payments/products'
    );
  }

  requestMemberSession(priceId: string): void {
    this.http.post<Session>(this.baseUrl + 'payments/CreateCheckoutSession', {
      priceId: priceId,
      successUrl: environment.successUrl,
      failureUrl: environment.failureUrl
    }).subscribe((sessionResponse: any) => {
      console.log(sessionResponse);
      
      this.redirectToCheckout(sessionResponse);
    })
  }
  private redirectToCheckout(session: Session) {
    const stripe = Stripe(session.publicKey);

    stripe.redirectToCheckout({
      sessionId: session.sessionId
    })
  }

  getCheckoutSession(): Observable<CheckoutSession> {
    return this.http.get<CheckoutSession>(this.baseUrl + 'payments/GetCheckoutSession');
  }

  getSubscriptionBySubscriptionId(sessionId: string) {
    return this.http.get<Subscription>(this.baseUrl + 'payments/GetSubscriptionBySubscriptionId?subscriptionId=' + sessionId);
  }

  getActiveSubscriptionOfCustomer() {
    return this.http.get<SubscriptionDto>(this.baseUrl + 'payments/GetActiveSubscriptionOfCustomer');
  }
}
