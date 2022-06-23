import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  currentUser: User;
  updateProfilePictureEndpoint = environment.updateProfilePictureEndpoint;

  updateProfileForm: FormGroup;

  inEditMode = false;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.initializeForm();

    this.updateProfileForm.controls["featuredImageUrl"].valueChanges.subscribe(photo => {
      this.currentUser.photoUrl = photo;
      this.accountService.setCurrentUser(this.currentUser);
    })
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

  private initializeForm() {
    this.updateProfileForm = this.fb.group({
      featuredImageUrl: [''],
    })
  }

  onOpenEditMode() {
    this.inEditMode = !this.inEditMode;
  }
}
