import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Course } from 'src/app/_models/courseDto.model';
import { LectureActivity } from 'src/app/_models/lectureActivityDto.model';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { LectureService } from 'src/app/_services/lecture.service';

@Component({
  selector: 'course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {
  @Input() course: Course;
  @Output() courseCompletionRate: EventEmitter<number> = new EventEmitter<number>(true);
  currentUser: User;

  constructor(
    protected route: Router,
    public accountService: AccountService,
    public lectureService: LectureService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }

  handleClick(sectionIndex: number, checkbox: Event) {
    const lectureIndex = parseInt((<HTMLInputElement>checkbox.target).id);
    const lectureIsCompleted = (<HTMLInputElement>checkbox.target).checked;
    
    this.updateLectureActivity(sectionIndex, lectureIndex, lectureIsCompleted);
    
    this.lectureService.setLectureCompletion(
      this.course.sections[sectionIndex].lectures[lectureIndex].id,
      lectureIsCompleted
    ).subscribe(completionRate => {
      this.courseCompletionRate.emit(completionRate as number);
    }, error => {
      console.log(error);
    })
  }

  private updateLectureActivity(sectionIndex: number, lectureIndex: number, lectureIsCompleted: boolean) {
    if(this.course.sections[sectionIndex].lectures[lectureIndex].lectureActivities !== undefined) {
      this.course.sections[sectionIndex].lectures[lectureIndex].lectureActivities[0].isCompleted = lectureIsCompleted;
    } else {
      this.course.sections[sectionIndex].lectures[lectureIndex].lectureActivities.push({
        isCompleted: lectureIsCompleted
      } as LectureActivity)
    }
  }

  redirectTo(courseSlug: string, lectureSlug: string) {
    let uri = '/course/' + courseSlug + '/lecture/' + lectureSlug
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.route.navigate([uri]));
  }
}
