import { Injectable } from '@angular/core';
import { BEGINNER_MEMBERSHIP, PROFESSIONAL_MEMBERSHIP, STANDARD_MEMBERSHIP } from '../_models/membership-desc.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipDescService {
  STANDARD_MEMBERSHIP = STANDARD_MEMBERSHIP;
  BEGINNER_MEMBERSHIP = BEGINNER_MEMBERSHIP;
  PROFESSIONAL_MEMBERSHIP = PROFESSIONAL_MEMBERSHIP;

  constructor() { }
}
