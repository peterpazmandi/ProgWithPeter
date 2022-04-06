import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Lecture } from 'src/app/_models/lectureDto.model';
import { UpsertLectureListDto } from 'src/app/_models/upsertLectureListDto.model';
import { LectureService } from 'src/app/_services/lecture.service';
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
  pageSize = 10;
  lectures: UpsertLectureListDto[] = [];
  public statuses = Status;
  numbers: number[] = [];

  postType: typeof PostType;

  constructor(
    private fb: FormBuilder,
    private lectureService: LectureService) { 
    this.postType = PostType;
  }

  ngOnInit(): void {
    this.initializeForm();

    this.lectureService.getLecturesOrderedByModificationDate(this.pageNumber, this.pageSize).subscribe(response => {
      this.lectures.push(...response.result);
    })
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
