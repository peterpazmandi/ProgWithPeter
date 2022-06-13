import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  currentUser: User;

  constructor(
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }

}
