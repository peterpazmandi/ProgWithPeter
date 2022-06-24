import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProfileFormService {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder) {
      this.initializeForms();
     }

  private initializeForms() {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]]
    })
  }
}
