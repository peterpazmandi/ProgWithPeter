import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tag } from 'src/app/_models/tag.model';
import { TagsService } from 'src/app/_services/tags.service';
import { UpsertTagModalComponent } from './upsert-tag-modal/upsert-tag-modal.component';

@Component({
  selector: 'app-upsert-tag-list',
  templateUrl: './upsert-tag-list.component.html',
  styleUrls: ['./upsert-tag-list.component.css']
})
export class UpsertTagListComponent implements OnInit {
  filterForm: FormGroup;
  pageNumber = 1;
  pageSize = 200;
  tags: Tag[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private tagsService: TagsService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.initializeFilterForm();

    this.getTags();
  }

  getTags() {
    this.tagsService.getAllTags(this.pageNumber, this.pageSize).subscribe(response => {
      this.tags = this.tags.filter(t => t.id === -1);
      this.tags.push(...response.result);
    }, error => {
      console.log(error);
    })
  }

  private initializeFilterForm() {
    this.filterForm = this.fb.group({
      name: ['']
    })
  }

  filter() {
    
  }

  onOpenAddTagModal() {    
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(UpsertTagModalComponent, config);
    this.bsModalRef.content?.onClose.subscribe((result: Tag) => {
      this.tags.push(result);
      this.tags.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
    })
  }

  onTagUpdated(tag: Tag) {
    this.tags = this.tags.filter(t => t.id !== tag.id);
    this.tags.push(tag);
    this.tags.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
  }
}
