import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from '../_services/theme.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RegisterComponent } from '../authentication/register/register.component';
import { Theme } from '../_theme/symbols';
import { LoginComponent } from '../authentication/login/login.component';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isChecked$ = new BehaviorSubject(false);
  collapsed = true;
  bsModalRef: BsModalRef;
  active: Theme;

  constructor(
    private themeService: ThemeService,
    private modalService: BsModalService,
    public accountService: AccountService) { }

  ngOnInit(): void {
    this.initTheme();
  }

  onToggleTheme() {
    this.active = this.themeService.getActiveTheme();
    if (this.active.name === 'light') {
      this.themeService.setTheme('dark');
      this.isChecked$.next(true)
    } else {
      this.themeService.setTheme('light');
      this.isChecked$.next(false)
    }
  }

  initTheme() {
    this.active = this.themeService.getActiveTheme();
    if (this.active.name === 'light') {
      this.isChecked$.next(false)
    } else {
      this.isChecked$.next(true)
    }
  }
  
  onToggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  onOpenRegisterModal() {
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(RegisterComponent, config);
  }

  onOpenLoginModal() {
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(LoginComponent, config);
  }

  onSignOut() {
    this.accountService.signout();
  }
}
