import { Component, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TreeItem, TreeviewItem } from 'ngx-treeview';
import { Category } from 'src/app/_models/category.model';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements ControlValueAccessor, OnInit {
  selectedCategory: TreeviewItem[] = [];
  categories: TreeviewItem[];
  value = 11;

  constructor(
    @Self() public ngControl: NgControl,
    private categoryService: CategoryService) { 
      this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.getChildCategories(null as any);

    var sub = this.ngControl.valueChanges?.subscribe((category : TreeviewItem) => {
      this.selectedCategory.push(category);
      this.getInitialCategories(category.value as number);
      sub?.unsubscribe();
    })
  }  

  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }


  private generateTreeviewItemArray(categories: Category[]): TreeviewItem[] {
    let treeViewItems: TreeviewItem[] = [];
    for (let index = 0; index < categories.length; index++) {
      treeViewItems.push(new TreeviewItem({
          text: categories[index].name,
          value: categories[index].id
        } as TreeItem
      ));
    }
    return treeViewItems;
  }
  private getInitialCategories(categoryId: number) {
    this.categoryService.getCategories(categoryId).subscribe((result: any) => {
      this.categories = this.generateTreeviewItemArray(result as Category[]);
    }, error => {
      console.log('API Error: ' + error);
    });
  }
  onCategoryValueChange(value: number): void {
    let selectedItem = this.categories.find(i => i.value === value) as TreeviewItem;
    this.selectedCategory.push(selectedItem);
    this.ngControl?.control?.setValue(selectedItem);
    this.ngControl?.control?.markAsDirty();
    this.getChildCategories(selectedItem.value);
  }

  onRemoveCategories() {
    this.selectedCategory = this.selectedCategory.filter(i => i.value < 0) as TreeviewItem[]; 
    this.ngControl?.control?.setValue(null);
    this.ngControl?.control?.markAsDirty();
    this.getChildCategories(null as any);   
  }
  private getChildCategories(value: number) {    
    this.categories = [new TreeviewItem({ text: "", value: 0 })];

    this.categoryService.getCategories(value).subscribe((result: any) => {
      this.categories = this.generateTreeviewItemArray(result as Category[]);
    }, error => {
      console.log('API Error: ' + error);
    });
  }
}
