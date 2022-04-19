import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/_models/category.model';
import { OperationType } from '../upsert-category/upsert-category.component';

@Component({
  selector: 'app-upsert-categories',
  templateUrl: './upsert-categories.component.html',
  styleUrls: ['./upsert-categories.component.css']
})
export class UpsertCategoriesComponent implements OnInit {
  filterForm: FormGroup;
  pageNumber = 1;
  pageSize = 20;
  upsertCategory = false;
  lastSelectedCategory: Category | null;
  editCategory: Category | null;
  operationType: OperationType;

  constructor(
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeFilterForm();
  }

  private initializeFilterForm() {
    this.filterForm = this.fb.group({
      name: ['']
    })
  }

  filter() {
    
  }

  setLastSelectedCategory(category: Category) {
    this.lastSelectedCategory = category;
  }

  onEditCategory(category: Category) {
    this.operationType = OperationType.UPDATE;
    this.editCategory = category;
    this.upsertCategory = true;
  }

  onCreateCategory() {
    this.operationType = OperationType.CREATE;
    this.upsertCategory = true;
  }

  cancelUpsertWindow() {
    this.upsertCategory = false;
  }
}
