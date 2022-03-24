import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Section } from 'src/app/_models/sectionDto.model';
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { LectureService } from 'src/app/_services/lecture.service';

@Component({
  selector: 'course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {
  @Input() sections: Section[] = [];
  @Output() courseCompletionRate: EventEmitter<number> = new EventEmitter<number>(true);
  currentUser: User;

  constructor(
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

  handleClick(checkbox: Event) {
    let id = parseInt((<HTMLInputElement>checkbox.target).id);
    this.lectureService.setLectureCompletion(
      parseInt((<HTMLInputElement>checkbox.target).id),
      (<HTMLInputElement>checkbox.target).checked
    ).subscribe(completionRate => {
      this.courseCompletionRate.emit(completionRate as number);
    }, error => {
      console.log(error);
    })
  }
}
