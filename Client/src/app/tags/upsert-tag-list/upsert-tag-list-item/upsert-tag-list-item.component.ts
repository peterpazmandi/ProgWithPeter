import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tag } from 'src/app/_models/tag.model';
import { UpsertTagModalComponent } from '../upsert-tag-modal/upsert-tag-modal.component';

@Component({
  selector: '[upsert-tag-list-item]',
  templateUrl: './upsert-tag-list-item.component.html',
  styleUrls: ['./upsert-tag-list-item.component.css']
})
export class UpsertTagListItemComponent implements OnInit {
  @Input() item: Tag;
  @Output() updatedTag: EventEmitter<Tag> = new EventEmitter<Tag>();
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  onOpenUpdateTagModal(tag: Tag) {
    const initialState = {
      data: tag,
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(UpsertTagModalComponent, { initialState });
    this.bsModalRef.content?.onClose.subscribe((result: Tag) => {
      this.updatedTag.emit(result);
    })
  }
}
