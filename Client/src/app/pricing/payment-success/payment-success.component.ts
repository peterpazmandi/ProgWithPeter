import { Component, OnInit } from '@angular/core';
import { PricingService } from 'src/app/_services/pricing.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private pricingService: PricingService) { }

  ngOnInit(): void {
    this.pricingService.getCheckoutSession().subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

}
