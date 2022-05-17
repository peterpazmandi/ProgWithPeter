import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { MembershipDto } from 'src/app/_models/membershipDto.model';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { PriceRecurringInterval } from 'src/app/_utils/priceRecurringInterval.enum';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  subscriptionPeriod: boolean = false;
  memberships: MembershipDto[] = [];
  currentUser: User;
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    public accountService: AccountService,
    private pricingService: PaymentService,
    private router: Router) {
   }

  ngOnInit(): void {
    this.pricingService.getMemberships().subscribe(response => {
      this.memberships.push(...response as MembershipDto[]);
    }, error => {
      console.log(error);
    })
  }

  onChangePeriod() {
    console.log(this.subscriptionPeriod);
  }

  onOpenLoginModal() {
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(LoginComponent, config);
  }

  onEnrollClicked(selectedMembership: MembershipDto) {
    if(this.subscriptionPeriod) {
      selectedMembership.prices = selectedMembership.prices.filter(p => p.recurring.interval.toLowerCase() === PriceRecurringInterval.YEAR.toLowerCase())
    } else {
      selectedMembership.prices = selectedMembership.prices.filter(p => p.recurring.interval.toLowerCase() === PriceRecurringInterval.MONTH.toLowerCase())
    };
    this.pricingService.selectedMembership = selectedMembership;
    this.router.navigateByUrl('/checkout');
  }
}
