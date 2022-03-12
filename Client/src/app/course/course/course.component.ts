import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Course } from 'src/app/_models/courseDto.model';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { CourseService } from 'src/app/_services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;
  sidebarWidth = 'col-3';
  conetentWidth = 'col-9';
  sideBarVisible = true;
  waIntersectionObserver: IntersectionObserver;
  currentUser: User;

  constructor(
    private route: Router,
    private courseService: CourseService,
    public accountService: AccountService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadCourse();
  }

  loadCourse() {
    let re =/\_/gi;
    let title = this.route.url.split('/')[2].replace(re, ' ');
    this.courseService.getCourseByTitle(title, this.currentUser.id).subscribe(result => {
      this.course = result
    }, error => {
      console.error(error);
    })
  }

  loadCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }
}
