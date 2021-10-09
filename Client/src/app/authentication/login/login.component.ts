import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private accountService: AccountService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login() {
    this.loading = true;
    this.accountService.login(this.loginForm.value).subscribe(response => {
      this.loading = false;
      this.bsModalRef.hide();
    }, error => {
      this.loading = false;
    })
  }

  onOpenRegisterModal() {
    this.bsModalRef.hide();
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(RegisterComponent, config);
  }

  onOpenForgotPasswordModal() {
    this.bsModalRef.hide();
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(ForgotPasswordComponent, config);
  }

}
