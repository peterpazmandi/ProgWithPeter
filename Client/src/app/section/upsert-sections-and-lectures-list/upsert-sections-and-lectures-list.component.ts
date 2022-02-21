import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/app/_models/sectionDto.model';

@Component({
  selector: 'upsert-sections-and-lectures-list',
  templateUrl: './upsert-sections-and-lectures-list.component.html',
  styleUrls: ['./upsert-sections-and-lectures-list.component.css']
})
export class UpsertSectionsAndLecturesListComponent implements OnInit {
  @Input() sections: Section[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
