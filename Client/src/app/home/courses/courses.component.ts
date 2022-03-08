import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_models/courseDto.model';
import { AccountService } from 'src/app/_services/account.service';
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

  constructor(
    public courseService: CourseService,
    public accountService: AccountService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses() {
    this.courseService.getPublishedCoursesOrderedByPublishDate(this.pageNumber, this.pageSize).subscribe(response => {
      this.noMoreCourse = response.result.length < 2;
      this.courses.push(...response.result);
      this.updateCourseEnrollments();
    }, error => {
      console.log(error);
    })
  }

  loadMoreCourses() {
    this.pageNumber++;
    this.loadCourses();
  }

  updateCourseEnrollments() {
    this.accountService.currentUser$.subscribe(user => {
      for(let i = 0; i < user.courseEnrollments.length; i++) {
        let course = this.courses.find(c => c.id === user.courseEnrollments[i].courseId);
        if(course) {
          course.progress = user.courseEnrollments[i].progress*100;
        }
      }
      console.table(this.courses);
    })
  }
}
