import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Course } from 'src/app/_models/courseDto.model';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { CourseService } from 'src/app/_services/course.service';
import { environment } from 'src/environments/environment';

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

    this.scrollToTop();
  }

  loadCourse() {
    let re =/\_/gi;
    let title = this.route.url.split('/')[2].replace(re, ' ');
    this.courseService.getCourseByTitle(title, this.currentUser === undefined ? -1 : this.currentUser.id).subscribe(response => {
      this.course = response
      if(this.course.courseEnrollments.length > 0) {
        this.course.courseEnrollments[0].progress = this.course.courseEnrollments[0].progress * 100
      }
      console.log(this.course);
      this.updateMeta()
    }, error => {
      console.error(error);
    })
  }

  private updateMeta() {
    this.meta.updateTag({name: "title", content: this.course.post.meta?.seoTitle || ''})
    this.meta.updateTag({name: "description", content: this.course.post.meta?.metaDescription || ''})
    this.meta.updateTag({name: "image", content: this.course.post.featuredImageUrl})
    this.meta.updateTag({name: "site", content: environment.siteTitle})
  }

  loadCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }

  private scrollToTop() {
    window.scrollTo(0, 0);
  }
  
  hideSidebar() {
    this.sideBarVisible = !this.sideBarVisible;

    if(this.sideBarVisible) {
      this.sidebarWidth = 'col-3';
      this.conetentWidth = 'col-9';
    } else {
      this.sidebarWidth = 'col-1';
      this.conetentWidth = 'col';
    }
  }

  updateContent(event: string) {
    this.course.post.content = event;
  }
}
