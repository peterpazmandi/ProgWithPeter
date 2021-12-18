import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/_models/tag.model';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.css']
})
export class TagItemComponent implements OnInit {
  @Input() tag: Tag

  constructor() { }

  ngOnInit(): void {
  }

}
