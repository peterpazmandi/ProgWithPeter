import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/_models/category.model';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'category-browser',
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.css']
})
export class CategoryBrowserComponent implements OnInit {
  selectedCategories: Category[] = [];
  levelCategories: Category[] = [];
  @Output() lastSelectedCategory: EventEmitter<Category | null> = new EventEmitter<Category | null>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategoriesByParentCategoryId(null);
  }

  getHighestLevelCategories() {
    this.selectedCategories = this.selectedCategories.filter(c => c.id === -1);
    this.getCategoriesByParentCategoryId(null);
  }

  onCategorySelected(category: Category) {
    this.getCategoriesByParentCategoryId(category.id);

    this.selectedCategories.push(category);
    this.emitLastSelectedCategory();
  }

  onRemoveFromSelectedCategories(category: Category) {
    this.selectedCategories = this.removeCategoriesFromIndex(category);
    this.emitLastSelectedCategory();
    this.getCategoriesByParentCategoryId(
      this.selectedCategories.length > 0 ? this.selectedCategories[this.selectedCategories.length - 1].id : null
    );
  }

  getCategoriesByParentCategoryId(categoryId: number | null) {
    this.levelCategories = this.levelCategories.filter(c => c.id === -1);
    this.categoryService.getCategoriesByParentCategoryId(categoryId).subscribe(response => {
      this.levelCategories.push(...response);
    }, error => {
      console.log(error);
    })
  }

  private removeCategoriesFromIndex(category: Category) {
    let index = this.selectedCategories.indexOf(category);
    let toRemoveItems: Category[] = [];
    for(let i = index+1; i < this.selectedCategories.length; i++)  {
      toRemoveItems.push(this.selectedCategories[i]);
    }
    return this.selectedCategories.filter(c => !toRemoveItems.includes(c));
  }

  private emitLastSelectedCategory() {
    if(this.selectedCategories.length === 0) {
      this.lastSelectedCategory.emit(null);
    } else {
      this.lastSelectedCategory.emit(this.selectedCategories[this.selectedCategories.length-1]);
    }
  }
}
