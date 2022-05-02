import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemberShipPlan } from '../pricing/model/memberShipPlan.model';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor() { }  

  getMemberships(): MemberShipPlan[] {
    const beginnerMonthly = {
      id: '',
      priceId: environment.membershipBeginnerMonthlyPriceId,
      name: 'Beginner',
      price: '9.90',
      period: 'Monthly'} as MemberShipPlan
    const beginnerYearly = {
      id: '',
      priceId: environment.membershipBeginnerYearlyPriceId,
      name: 'Beginner',
      price: '79.90',
      period: 'Monthly'} as MemberShipPlan
    const professionalMonthly = {
      id: '',
      priceId: environment.membershipProfessionalMonthlyPriceId,
      name: 'Professional',
      price: '29.90',
      period: 'Yearly'} as MemberShipPlan
    const professionalYearly = {
      id: '',
      priceId: environment.membershipProfessionalYearlyPriceId,
      name: 'Professional',
      price: '239.90',
      period: 'Yearly'} as MemberShipPlan

    return [beginnerMonthly, beginnerYearly, professionalMonthly, professionalYearly];
  }
    
}
