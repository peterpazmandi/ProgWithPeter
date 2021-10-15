import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        console.log("You don't have permission to access this area!");
        if(user) return true;

        this.toastr.error("You don't have permission to access this area!")
        this.router.parseUrl('');
        console.log("You don't have permission to access this area!");

        return false;
      })
    );
  }  
}