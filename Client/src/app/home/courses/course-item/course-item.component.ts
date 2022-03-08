import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/_models/courseDto.model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() course: Course;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

}
