import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UpdatePasswordDto } from 'src/app/_models/updatePasswordDto.model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;

  constructor(
    private router: Router,
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.updatePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required, this.matchValues('newPassword')]]
    })
    this.updatePasswordForm.controls.newPassword.valueChanges.subscribe(() => {
      this.updatePasswordForm.controls.confirmNewPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl | any) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true};
    }
  }

  onSubmit() {
    this.accountService.updatePassword({
      currentPassword: (this.updatePasswordForm?.value['currentPassword'] as string),
      newPassword: (this.updatePasswordForm?.value['newPassword'] as string),
      confirmNewPassword: (this.updatePasswordForm?.value['confirmNewPassword'] as string),
    } as UpdatePasswordDto).subscribe(result => {
      this.bsModalRef.hide();
      this.toastr.success("You have successfully updated your password!", "Success!");
    })
  }

  private reload() {
    this._document.defaultView?.location.reload();
  }
}
