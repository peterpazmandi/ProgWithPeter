import { AfterContentChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TreeItem, TreeviewItem } from 'ngx-treeview';
import { Category } from 'src/app/_models/category.model';

@Component({
  selector: 'upsert-category',
  templateUrl: './upsert-category.component.html',
  styleUrls: ['./upsert-category.component.css']
})
export class UpsertCategoryComponent implements OnInit, AfterContentChecked {
  @Input() category: Category;
  @Input() parentCategory: Category;
  upsertCategoryForm: FormGroup;
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder
  ) { }
  ngAfterContentChecked(): void {
    this.upsertCategoryForm.patchValue({      
      parentCategory: (this.parentCategory) ? new TreeviewItem({
        text: this.parentCategory.name,
        value: this.parentCategory.id
      } as TreeItem) : new TreeviewItem({
        text: "",
        value: null
      } as TreeItem)
    })
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.upsertCategoryForm = this.fb.group({
      name: [''],
      parentCategory: ['']
    });
  }

  upsertCategory() {
    console.log(this.upsertCategoryForm);
  }

  cancelWindow() {
    this.cancel.emit(true);
  }
}
