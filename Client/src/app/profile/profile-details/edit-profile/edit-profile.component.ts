import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateEmialComponent } from 'src/app/authentication/update-emial/update-emial.component';
import { UpdatePasswordComponent } from 'src/app/authentication/update-password/update-password.component';
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
  
  onOpenUpdatePasswordModal() {
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(UpdatePasswordComponent, config);
  }
}
