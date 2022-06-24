import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ResetPasswordComponent } from 'src/app/authentication/reset-password/reset-password.component';
import { UpdateEmialComponent } from 'src/app/authentication/update-emial/update-emial.component';
import { ProfileFormService } from '../profile-form.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(
    public profileFormService: ProfileFormService,
    private modalService: BsModalService) { }

  ngOnInit(): void { }
  
  onOpenUpdateEmailModal() {
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(UpdateEmialComponent, config);
  }
  
  onOpenResetPasswordModal() {
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(ResetPasswordComponent, config);
  }
}
