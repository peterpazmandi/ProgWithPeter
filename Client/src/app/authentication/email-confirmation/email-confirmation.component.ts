import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;


  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail() {
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];

    this.accountService.confirmEmail(token, email).subscribe(() => {
      var userSub = this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        user.emailConfirmed = true;
        this.accountService.setCurrentUser(user);
      })
      userSub.unsubscribe;
      this.showSuccess = true;
    }, error => {
      this.showError = true;
      this.errorMessage = error.error;
    })
  }
}
