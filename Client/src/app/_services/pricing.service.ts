import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MembershipDto } from '../_models/membershipDto.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PricingService extends BaseService {

  getMemberships() {
    return this.http.get(
      this.baseUrl + 'payments/products'
    );
  }    
}
