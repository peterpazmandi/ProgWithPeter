import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MembershipDto } from '../_models/membershipDto.model';
import { Session } from '../_models/session.model';
import { BaseService } from './base.service';

declare const Stripe: any;

@Injectable({
  providedIn: 'root'
})
export class PricingService extends BaseService {
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
      this.redirectToCheckout(sessionResponse);
    })
  }
  private redirectToCheckout(session: Session) {
    const stripe = Stripe(session.publicKey);

    stripe.redirectToCheckout({
      sessionId: session.sessionId
    })
  }

  getCheckoutSession() {
    return this.http.get(this.baseUrl + 'payments/GetCheckoutSession');
  }
}
