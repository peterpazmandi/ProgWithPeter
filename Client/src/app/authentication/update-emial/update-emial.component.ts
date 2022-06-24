import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UpdateEmailDto } from 'src/app/_models/updateEmailDto.model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-update-emial',
  templateUrl: './update-emial.component.html',
  styleUrls: ['./update-emial.component.css']
})
export class UpdateEmialComponent implements OnInit {
  updateEmailForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.updateEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit(){
    this.accountService.updateUserEmail({
      email: (this.updateEmailForm.value['email'] as string),
      password: (this.updateEmailForm?.value['password'] as string)
    } as UpdateEmailDto).subscribe(result => {
      this.toastr.success('We just sent you a confirmation email!', 'Email successfully updated.');
      
      this.bsModalRef.hide();
    })
  }
}
