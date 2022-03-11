import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Course } from 'src/app/_models/courseDto.model';
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

  constructor(
    private route: Router,
    private courseService: CourseService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.loadCourse();
  }

  loadCourse() {
    let re =/\-/gi;
    let title = this.route.url.split('/')[2].replace(re, ' ');
    console.log(title);
    this.courseService.getCourseByTitle(title).subscribe(result => {
      this.course = result
    }, error => {
      console.error(error);
    })
  }

}
