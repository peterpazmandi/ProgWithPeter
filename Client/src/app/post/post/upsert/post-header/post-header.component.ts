import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TreeItem, TreeviewItem } from 'ngx-treeview';
import { MyUploadAdapter } from 'src/app/shared/my-upload-adapter';
import { Category } from 'src/app/_models/category.model';
import { Tag } from 'src/app/_models/tag.model';
import { CategoryService } from 'src/app/_services/category.service';
import { TagsService } from 'src/app/_services/tags.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostHeaderComponent implements OnInit {
  @Input() createTutorialForm: FormGroup;
  
  apiUrl = environment.apiUrl;
  serverUrl = environment.serverUrl;
  
  selectedCategory: TreeviewItem[] = [];
  selectedTags: Tag[] = [];
  featuredImageUrl: string = '';

  // Tags
  historyIdentifier = [];
  keyword = 'name';
  tags = [];
  
  value = 11;
  categories: TreeviewItem[];

  constructor(
    private categoryService: CategoryService,
    private tagsService: TagsService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  onCategoryValueChange(value: number): void {
    let selectedItem = this.categories.find(i => i.value === value) as TreeviewItem;
    this.selectedCategory.push(selectedItem);
    this.createTutorialForm.patchValue({
      category: selectedItem
    })
    this.getChildCategories(selectedItem.value);
  }

  onRemoveCategories() {
    this.selectedCategory = this.selectedCategory.filter(i => i.value < 0) as TreeviewItem[];
    this.getChildCategories(null as any);
    this.createTutorialForm.patchValue({
      category: null
    })
  }

  // Category
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
  private getInitialCategories() {
    this.categoryService.getCategories(null).subscribe((result: any) => {
      this.categories = this.generateTreeviewItemArray(result as Category[]);
    }, error => {
      console.log('API Error: ' + error);
    });
  }
  private getChildCategories(value: number) {    
    this.categories = [new TreeviewItem({ text: "", value: 0 })];

    this.categoryService.getCategories(value).subscribe((result: any) => {
      this.categories = this.generateTreeviewItemArray(result as Category[]);
    }, error => {
      console.log('API Error: ' + error);
    });
  }

  
  // AutoComplete
  selectEvent(item: any) {
    let alreadyAdded = this.selectedTags.filter(_item => _item.id === item.id).length > 0;
    if(!alreadyAdded) {
      this.selectedTags.push({
        id: item.id,
        name: item.name
      } as Tag);
      this.createTutorialForm.patchValue({
        tags: this.selectedTags
      })
    } else {
      this.toastr.warning('You have already added ' + item.name);
    }
  }
  onChangeSearch(searchText: string) {
    this.tagsService.searchTags(searchText)?.subscribe(result => {
      if(result) {
        this.tags = result as [];
      }
    })
  }

  onRemoveTag(id: number) {
    this.selectedTags = this.selectedTags.filter(item => item.id !== id);

    if(this.selectedTags.length === 0) {
      this.createTutorialForm.patchValue({
        tags: []
      })
    }
  }

  onReady($event: any) {
    $event.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new MyUploadAdapter(loader, this.serverUrl, this.apiUrl);
    };
  }
}
