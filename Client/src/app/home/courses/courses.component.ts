import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_models/courseDto.model';
import { CourseService } from 'src/app/_services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  pageNumber = 1;
  pageSize = 2;
  noMoreCourse: boolean = false;

  constructor(public courseService: CourseService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses() {
    this.courseService.getPublishedCoursesOrderedByPublishDate(this.pageNumber, this.pageSize).subscribe(response => {
      this.noMoreCourse = response.result.length < 2;
      this.courses.push(...response.result);
    }, error => {
      console.log(error);
    })
  }

  loadMoreCourses() {
    this.pageNumber++;
    this.loadCourses();
  }
}
