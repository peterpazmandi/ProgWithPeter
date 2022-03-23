import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private modalService: BsModalService,
    @Inject(DOCUMENT) private _document: Document) { }

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
    if(this.loginForm.valid) {
      this.loading = true;
      this.accountService.login(this.loginForm.value).subscribe(response => {
        this.loading = false;
        this.reload();
      }, error => {
        this.loading = false;
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  
  private reload() {
    this._document.defaultView?.location.reload();
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
