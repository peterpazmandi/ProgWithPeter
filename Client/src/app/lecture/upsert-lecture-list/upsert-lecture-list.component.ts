import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Lecture } from 'src/app/_models/lectureDto.model';
import { CourseService } from 'src/app/_services/course.service';
import { PostType } from 'src/app/_utils/post-type.enum';
import { Status } from 'src/app/_utils/status.enum';

@Component({
  selector: 'app-upsert-lecture-list',
  templateUrl: './upsert-lecture-list.component.html',
  styleUrls: ['./upsert-lecture-list.component.css']
})
export class UpsertLectureListComponent implements OnInit {
  filterForm: FormGroup;
  pageNumber = 1;
  pageSize = 20;
  lectures: Lecture[] = [];
  public statuses = Status;
  numbers: number[] = [];

  postType: typeof PostType;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService) { 
    this.postType = PostType;
  }

  ngOnInit(): void {
    this.initializeForm();
    for(let i = 0; i < 10; i++) {
      this.numbers.push(i);
    }
  }

  private initializeForm() {
    this.filterForm = this.fb.group({
      title: ['']
    })
  }

  getLectures(courseId: number) {
    console.log(courseId);
  }

  filter() {
    
  }


}
