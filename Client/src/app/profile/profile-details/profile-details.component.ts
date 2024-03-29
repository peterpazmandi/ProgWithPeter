import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { UpdateProfileDetailesDto } from 'src/app/_models/updateProfileDetailesDto.model';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';
import { ProfileFormService } from './profile-form.service';

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
    public profileFormService: ProfileFormService,
    private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.initializeForms();

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

  private initializeForms() {
    this.updateProfileForm = this.fb.group({
      featuredImageUrl: [''],
    })
    
    this.profileFormService.profileForm.patchValue({
      username: this.currentUser.username,
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      gender: this.currentUser.gender,
      country: this.currentUser.country
    });
  }

  onOpenEditMode() {
    this.inEditMode = !this.inEditMode;
  }

  onSaveEditProfile() {
    let user = this.createUpdateProfileDetailesDto();
    this.accountService.updateProfileDetailes(
      user
      ).subscribe((result: any) => {
        this.toastr.success(result.message);
        this.accountService.updateCurrentUsersProfileDetailes(user);
        this.inEditMode = !this.inEditMode;
    })
  }

  private createUpdateProfileDetailesDto(): UpdateProfileDetailesDto {
    return {
      username: this.profileFormService.profileForm.value['username'] as string,
      firstName: this.profileFormService.profileForm.value['firstName'] as string,
      lastName: this.profileFormService.profileForm.value['lastName'] as string,
      gender: this.profileFormService.profileForm.value['gender'] as string,
      country: this.profileFormService.profileForm.value['country'] as string
    } as UpdateProfileDetailesDto
  }
}
