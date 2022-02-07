import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'upsert-content-list',
  templateUrl: './upsert-content-list.component.html',
  styleUrls: ['./upsert-content-list.component.css']
})
export class UpsertContentListComponent implements OnInit {
  @Input()  contentList: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
