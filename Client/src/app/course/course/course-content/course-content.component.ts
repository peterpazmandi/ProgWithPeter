import { Component, Input, OnInit } from '@angular/core';
import { Section } from 'src/app/_models/sectionDto.model';

@Component({
  selector: 'course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {
  @Input() sections: Section[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
