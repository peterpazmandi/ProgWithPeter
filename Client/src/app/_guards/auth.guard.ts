import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let isLoggedIn = false;
      this.accountService.currentUser$.subscribe(user => {
        if(user) { isLoggedIn = true; }
      })

      if(!isLoggedIn) {
        this.toastr.error("You don't have permission to access this area!")
        this.router.navigateByUrl('/');
      }

      return isLoggedIn;
    }
}