import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
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
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      firstname: [''],
      lastname: [''],
      gender: ['male'],
      country: ['']
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl | any) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true};
    }
  }

  register() {
    if(this.registerForm.valid) {
      this.loading = true;
      this.accountService.register(this.registerForm.value).subscribe(response => {
        this.loading = false;
        this.result = true;
      }, error => {
        this.loading = false;
      })
    } else {
      this.registerForm.markAllAsTouched();
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
