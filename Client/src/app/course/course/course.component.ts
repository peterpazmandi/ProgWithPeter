import { DOCUMENT } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { Course } from 'src/app/_models/courseDto.model';
import { Post } from 'src/app/_models/post.model';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { CourseService } from 'src/app/_services/course.service';
import { MembershipTypes } from 'src/app/_utils/membershipTypes.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;
  openedPost: Post;
  sidebarWidth = 'col-3';
  conetentWidth = 'col-9';
  sideBarVisible = true;
  waIntersectionObserver: IntersectionObserver;
  currentUser: User;
  bsModalRef: BsModalRef;

  constructor(
    private router: Router,
    private courseService: CourseService,
    public accountService: AccountService,
    private modalService: BsModalService,
    private meta: Meta,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadCourse();

    this.scrollToTop();
  }

  loadCourse() {
    let re =/\_/gi;
    let title = this.router.url.split('/')[2].replace(re, ' ');
    this.courseService.getCourseByTitle(title, this.currentUser === undefined ? -1 : this.currentUser.id).subscribe(response => {
      this.course = response
      if(this.course.courseEnrollments.length > 0) {
        this.course.courseEnrollments[0].progress = this.course.courseEnrollments[0].progress * 100
      }
      this.updateMeta();
      
      // A lecture has been opened
      if(this.router.url.split('/').length === 5) {
        // If the user has lower membership then Professional
        console.log(!this.currentUser.subscription);
        
        if(!this.currentUser.subscription || (this.currentUser.subscription && this.currentUser.subscription.membershipType.toLocaleLowerCase().includes(MembershipTypes.PROFESSIONAL))) {
          this.toastr.warning("To open a lecture you have to a Professional membership!");
          this.router.navigateByUrl("/");
        } else {
          for(let section of this.course.sections) {
            this.openedPost = section.lectures.find(l => 
              l.post.title.toLocaleLowerCase() === this.router.url.split('/')[4].replace(re, ' ').toLocaleLowerCase()
            )?.post as Post;
            if(this.openedPost) {
              break;
            }
          }
        }
      // A course has been opened
      } else {
        this.openedPost = this.course.post;
      }
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
    this.openedPost.content = event;
  }

  updateCourseProgress(event: number) {
    console.log(event);
    this.course.courseEnrollments[0].progress = event * 100;
  }

  redirectTo(courseSlug: string) {
    let uri = '/course/' + courseSlug;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }


  onOpenLoginModal() {
    const config = {
      class: 'modal-dialog-centered'
    }

    this.bsModalRef = this.modalService.show(LoginComponent, config);
  }
}
