import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_models/courseDto.model';
import { User } from 'src/app/_models/user.model';
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
  currentUser: User;

  constructor(
    public courseService: CourseService,
    public accountService: AccountService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadCourses();
  }

  private loadCourses() {
    this.courseService.getPublishedCoursesOrderedByPublishDate(this.pageNumber, this.pageSize, (this.currentUser !== undefined) ? this.currentUser.id : -1).subscribe(response => {
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

  loadCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }
}
