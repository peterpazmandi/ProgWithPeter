import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TreeItem, TreeviewItem } from 'ngx-treeview';
import { Category } from 'src/app/_models/category.model';

@Component({
  selector: 'upsert-category',
  templateUrl: './upsert-category.component.html',
  styleUrls: ['./upsert-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpsertCategoryComponent implements OnInit, AfterViewInit  {
  @Input() category: Category;
  @Input() parentCategory: Category;
  @Input() editCategory: Category;
  @Input() operationType: OperationType;
  upsertCategoryForm: FormGroup;
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder
  ) { }
  ngAfterViewInit(): void {
    if(this.operationType === OperationType.CREATE && this.parentCategory !== undefined && this.parentCategory !== null) {
      this.upsertCategoryForm.patchValue({      
        parentCategory: (this.parentCategory) ? new TreeviewItem({
          text: this.parentCategory.name,
          value: this.parentCategory.id
        } as TreeItem) : new TreeviewItem({
          text: "",
          value: null
        } as TreeItem)
      })
    } else if (this.operationType === OperationType.UPDATE && this.editCategory !== undefined && this.editCategory !== null) {
      this.upsertCategoryForm.patchValue({
        name: this.editCategory.name,
        parentCategory: (this.editCategory) ? new TreeviewItem({
          text: (this.parentCategory !== undefined) ? this.parentCategory.name : '',
          value: (this.parentCategory !== undefined) ? this.parentCategory.id : null
        } as TreeItem) : new TreeviewItem({
          text: "",
          value: null
        } as TreeItem)
      })
    }
  }
  

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.upsertCategoryForm = this.fb.group({
      name: [''],
      parentCategory: ['']
    });
    this.upsertCategoryForm.patchValue({
      name: this.editCategory.name,
      parentCategory: new TreeviewItem({
        text: "",
        value: null
      } as TreeItem)
    })
  }

  upsertCategory() {
    console.log(this.parentCategory);
    console.log(this.editCategory);
    console.log(this.upsertCategoryForm.value);
  }

  cancelWindow() {
    this.cancel.emit(true);
  }

  isCreationOperation(operationType: OperationType)  {
    return operationType === OperationType.CREATE;
  }
  isUpdateOperation(operationType: OperationType)  {
    return operationType === OperationType.UPDATE;
  }
}

export enum OperationType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}
