import { Component, Input, OnInit } from '@angular/core';
import { UserCourseEnrollmentDto } from 'src/app/_models/UserCourseEnrollmentDto.model';

@Component({
  selector: '[your-course-list-item]',
  templateUrl: './your-course-list-item.component.html',
  styleUrls: ['./your-course-list-item.component.css']
})
export class YourCourseListItemComponent implements OnInit {
  @Input() enrolledCourse: UserCourseEnrollmentDto;

  constructor() { }

  ngOnInit(): void {
  }

}
