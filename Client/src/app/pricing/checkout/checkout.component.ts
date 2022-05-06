import { Component, OnInit } from '@angular/core';
import { PricingService } from 'src/app/_services/pricing.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private pricingService: PricingService) { }

  ngOnInit(): void {
    console.log(this.pricingService.selectedMembership);
  }

}
