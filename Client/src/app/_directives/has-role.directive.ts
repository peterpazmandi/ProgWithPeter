import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { retry, take } from 'rxjs/operators';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]' //*appHasRole='["Admin"]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: User;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit(): void {
    // clear view of no roles
    if(!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }

    if(this.user?.roles.some(r => this.appHasRole.includes(r as string))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
