import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/_models/category.model';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-upsert-categories',
  templateUrl: './upsert-categories.component.html',
  styleUrls: ['./upsert-categories.component.css']
})
export class UpsertCategoriesComponent implements OnInit {
  filterForm: FormGroup;
  pageNumber = 1;
  pageSize = 20;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.filterForm = this.fb.group({
      name: ['']
    })
  }

  filter() {
    
  }

  getChildCategories(category: Category ) {
    this.categoryService.getCategoriesByParentCategoryId(category.id).subscribe(response => {
      if(category.childCategories === undefined) {
        category.childCategories = [];
      }
      category.childCategories = category.childCategories.filter(c => c.id === -1);

      category.childCategories.push(...response);
    }, error => {
      console.log(error);
    })
  }
}
