import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ForgotPasswordDto } from 'src/app/_models/forgotPasswordDto.model';
import { AccountService } from 'src/app/_services/account.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  loading: boolean = false;
  result: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private accountService: AccountService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required]
    })
  }

  sendForgotPassword() {
    if(this.forgotPasswordForm.valid) {
      const forgotPass = { ...this.forgotPasswordForm.value };
      const forgotPasswordDto: ForgotPasswordDto = {
        email: forgotPass.email
      }
  
      this.accountService.forgotPassword(forgotPasswordDto).subscribe(result => {
        this.loading = false;
        this.result = true;
      }, error => {
        console.log(error.error);
        this.loading = false;
      })
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }

  onOpenLoginModal() {
    this.bsModalRef.hide();
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(LoginComponent, config);
  }
}
