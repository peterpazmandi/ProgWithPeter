import { Component, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tag } from 'src/app/_models/tag.model';
import { TagsService } from 'src/app/_services/tags.service';

@Component({
  selector: 'tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent implements ControlValueAccessor {  
  historyIdentifier = [];
  keyword = 'name';
  tags = [];
  selectedTags: Tag[] = [];

  constructor(
    private tagsService: TagsService,
    private toastr: ToastrService,
    @Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
   }

  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  
  // AutoComplete
  selectEvent(item: any) {
    let alreadyAdded = this.selectedTags.filter(_item => _item.id === item.id).length > 0;
    if(!alreadyAdded) {
      this.selectedTags = this.selectedTags.filter(item => item.id === -1);
      for(let tag of this.ngControl?.control?.value as Tag[]) {
        this.selectedTags.push(tag);
      }      
      this.selectedTags.push({
        id: item.id,
        name: item.name
      } as Tag);
      this.ngControl?.control?.setValue(this.selectedTags);
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
    this.selectedTags = this.selectedTags.filter(item => item.id === -1);
    for(let tag of this.ngControl?.control?.value as Tag[]) {
      this.selectedTags.push(tag);
    }
    this.selectedTags = this.selectedTags.filter(item => item.id !== id);
    this.ngControl?.control?.setValue(this.selectedTags);
  }

}
