import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/_models/category.model';

@Component({
  selector: '[category-browser-list-item]',
  templateUrl: './category-browser-list-item.component.html',
  styleUrls: ['./category-browser-list-item.component.css']
})
export class CategoryBrowserListItemComponent implements OnInit {
  @Input() item: Category;
  @Output() categorySelected: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() editCategory: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() deleteCategory: EventEmitter<Category> = new EventEmitter<Category>();

  constructor() { }

  ngOnInit(): void {
  }

  onCategorySelected(category: Category) {
    this.categorySelected.emit(category);
  }
}
