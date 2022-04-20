import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TreeItem, TreeviewItem } from 'ngx-treeview';
import { Category } from 'src/app/_models/category.model';
import { CategoryService } from 'src/app/_services/category.service';

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
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService
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

    this.upsertCategoryForm.valueChanges.subscribe(value => {
      if(value) {
        this.parentCategory = {
          id: value.parentCategory.value,
          name: value.parentCategory.text,
        } as Category;
      }
    })
  }

  upsertCategory() {
    this.categoryService.upsertCategory(this.createCategoryFromForm()).subscribe((response: any) => {
      this.toastr.success(response.message);
    }, error => {
      console.log(error)
    });
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

  private createCategoryFromForm() {
    let category = {
      name: this.upsertCategoryForm.value['name'] as string,
      parentCategoryId: this.parentCategory.id
    } as Category;
    
    if(this.operationType === OperationType.UPDATE) {
      category.id = this.editCategory.id;
    }

    console.log(category);
    console.log(this.parentCategory);

    return category;
  }
}

export enum OperationType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}
