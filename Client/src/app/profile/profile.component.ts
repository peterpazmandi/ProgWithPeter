import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { DynamicLoadingDirective } from '../_directives/dynamic-loading.directive';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';
import { YourCoursesComponent } from './courses/your-courses.component';
import { MembershipComponent } from './membership/membership.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild(DynamicLoadingDirective, {static: true}) profileHost: DynamicLoadingDirective
  currentUser: User;

  constructor(
    public accountService: AccountService,
    private cfr: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadProfileDetailes();
  }


  loadCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }

  loadProfileDetailes() {
    const viewContainerRef = this.profileHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(this.cfr.resolveComponentFactory(ProfileDetailsComponent));    
  }
  loadMemberships() {
    const viewContainerRef = this.profileHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(this.cfr.resolveComponentFactory(MembershipComponent));    
  }
  loadYourCourses() {
    const viewContainerRef = this.profileHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(this.cfr.resolveComponentFactory(YourCoursesComponent));    
  }
}
