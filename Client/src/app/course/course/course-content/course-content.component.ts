import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  //TODO: ha nincs jososultsága a felhasználónak, akkor ne tudjon belenézni a lecture-be

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
    var lectureActivities: LectureActivity[] = this.course.sections[sectionIndex].lectures[lectureIndex].lectureActivities as LectureActivity[];
    console.log((lectureActivities as LectureActivity[]).length);
    
    if(lectureActivities !== undefined && (lectureActivities as LectureActivity[]).length > 0) {
      lectureActivities[0].isCompleted = lectureIsCompleted;
    } else {
      (lectureActivities as LectureActivity[]).push({
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
