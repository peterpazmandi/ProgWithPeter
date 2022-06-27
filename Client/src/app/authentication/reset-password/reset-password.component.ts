import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ResetPasswordDto } from 'src/app/_models/resetPasswordDto.model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;  

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    this.resetPasswordForm.controls.password.valueChanges.subscribe(() => {
      this.resetPasswordForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl | any) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true};
    }
  }

  resetPassword() {
    if(this.resetPasswordForm.valid) {
      this.showSuccess = this.showError = false;
  
      const resetPass = { ... this.resetPasswordForm.value };
      const resetPassDto: ResetPasswordDto = {
        password: resetPass.password,
        confirmPassword: resetPass.confirmPassword,
        token: this.route.snapshot.queryParams['token'],
        email: this.route.snapshot.queryParams['email']
      }
  
      this.accountService.resetPassword(resetPassDto).subscribe(result => {
        this.showSuccess = true;
      }, error => {
        this.showError = true;
        console.log(error.error);
      })
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
