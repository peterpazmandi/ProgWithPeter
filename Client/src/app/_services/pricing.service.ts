import { Injectable } from '@angular/core';
import { MembershipDto } from '../_models/membershipDto.model';
import { BaseService } from './base.service';

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
}
