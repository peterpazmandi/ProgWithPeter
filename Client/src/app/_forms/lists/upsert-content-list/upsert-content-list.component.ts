import { Component, Input, OnInit } from '@angular/core';
import { PostType } from 'src/app/_utils/post-type.enum';

@Component({
  selector: 'upsert-content-list',
  templateUrl: './upsert-content-list.component.html',
  styleUrls: ['./upsert-content-list.component.css']
})
export class UpsertContentListComponent implements OnInit {
  @Input()  contentList: any[] = [];
  @Input() postType: string;

  constructor() {
    // this.postType = PostType;
   }

  ngOnInit(): void {
  }

}
