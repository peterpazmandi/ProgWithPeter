import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'source-code',
  templateUrl: './source-code.component.html',
  styleUrls: ['./source-code.component.css']
})
export class SourceCodeComponent implements OnInit {
  @Input() sourceCode: string;
  bsModalRef: BsModalRef;

  constructor(
    public accountService: AccountService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
  }


  onOpenLoginModal() {
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(LoginComponent, config);
  }
}
