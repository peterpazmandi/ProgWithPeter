import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Token } from './_models/token.model';
import { User } from './_models/user.model';
import { AccountService } from './_services/account.service';
import { ThemeService } from './_services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Programming with Peter';

  constructor(
    private themeService: ThemeService,
    public accountService: AccountService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if(theme) {
      this.themeService.setTheme(theme);
    }
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user') as string);
    if(user) {
      var token: Token = JSON.parse(atob(user.token.split('.')[1]));
      var expDate = new Date(token.exp * 1000);
      if(user && (new Date()) < expDate) {
        this.accountService.setCurrentUser(user);
      } else {
        this.accountService.signout();
      }
    }
  }

  resendEmailConfirmation() {
    this.accountService.resendConfirmEmail().subscribe(() => {
      this.toastr.success('Email confirmation has been sent out successfully.');
    }, error => {
      console.log(error.errror);
    })
  }
}
