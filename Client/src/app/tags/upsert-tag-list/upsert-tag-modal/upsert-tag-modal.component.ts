import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Tag } from 'src/app/_models/tag.model';
import { TagsService } from 'src/app/_services/tags.service';
import { OperationType } from 'src/app/_utils/operation-type.enum';

@Component({
  selector: 'app-upsert-tag-modal',
  templateUrl: './upsert-tag-modal.component.html',
  styleUrls: ['./upsert-tag-modal.component.css']
})
export class UpsertTagModalComponent implements OnInit {
  upsertTagForm: FormGroup;
  public onClose: Subject<Tag>;
  data: Tag;
  operationType: OperationType;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private tagsService: TagsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.initializeForm();

    if(this.data) {
      this.upsertTagForm.patchValue({
        name: this.data.name
      });

      this.operationType = OperationType.UPDATE;
    } else {
      this.operationType = OperationType.CREATE;
    }
  }

  private initializeForm() {
    this.upsertTagForm = this.fb.group({
      id: 0,
      name: ['', Validators.required]
    })
  }

  upsertTag() {
    let tag = {
      name: this.upsertTagForm.value['name'] as string
    } as Tag;

    if(this.operationType === OperationType.UPDATE) {
      tag.id = this.data.id
    }
    
    this.tagsService.upsertTag(tag).subscribe((response: any) => {
      this.toastr.success(response.message);
    }, error => {
      console.log(error);
    });

    this.onClose.next(tag);
    this.bsModalRef.hide();
  }

  isCreationOperation()  {
    return this.operationType === OperationType.CREATE;
  }
  isUpdateOperation()  {
    return this.operationType === OperationType.UPDATE;
  }
}
