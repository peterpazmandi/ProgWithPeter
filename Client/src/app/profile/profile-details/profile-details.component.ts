import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  currentUser: User;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }

  resendEmailConfirmation() {
    this.accountService.resendConfirmEmail().subscribe(() => {
      this.toastr.success('Email confirmation has been sent out successfully.');
    }, error => {
      console.log(error.error);
    })
  }

}
