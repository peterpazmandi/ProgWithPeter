import { Component, Input, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/_models/tutorialDto.model';
import { PostType } from 'src/app/_utils/post-type.enum';

@Component({
  selector: '[upsert-content-list-item]',
  templateUrl: './upsert-content-list-item.component.html',
  styleUrls: ['./upsert-content-list-item.component.css']
})
export class UpsertContentListItemComponent implements OnInit {
  @Input() item: any;
  @Input() postType: typeof PostType;

  constructor() {
    this.postType = PostType;
  }

  ngOnInit(): void {
  }

}
