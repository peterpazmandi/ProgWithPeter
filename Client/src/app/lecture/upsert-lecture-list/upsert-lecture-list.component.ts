import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TreeviewItem } from 'ngx-treeview';
import { FindLecturesDto } from 'src/app/_models/findLecturesDto.model';
import { Lecture } from 'src/app/_models/lectureDto.model';
import { UpsertLectureListDto } from 'src/app/_models/upsertLectureListDto.model';
import { CourseService } from 'src/app/_services/course.service';
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
  courseTitles: string[] = [];

  postType: typeof PostType;

  constructor(
    private fb: FormBuilder,
    private lectureService: LectureService,
    private courseService: CourseService) { 
    this.postType = PostType;
  }

  ngOnInit(): void {
    this.initializeForm();

    this.lectureService.getLecturesOrderedByModificationDate(this.pageNumber, this.pageSize).subscribe(response => {
      this.lectures.push(...response.result);
    })

    this.courseService.getCourseTitles().subscribe(response => {
      this.courseTitles.push(...response);
    })
  }

  private initializeForm() {
    this.filterForm = this.fb.group({
      title: [''],
      course: [''],
      status: [''],
      category: [''],
    })
  }

  getLectures(courseId: number) {
    console.log(courseId);
  }

  filter() {
    console.log(this.filterForm);
    this.lectureService.findLectures(this.createFindLectureDto()).subscribe(response => {
      this.lectures = this.lectures.filter(l => l.id === -1);
      this.lectures.push(...response.result);
    })
  }

  createFindLectureDto(): FindLecturesDto {
    let categoryName = (
      ((this.filterForm.value['category'] as TreeviewItem) !== null && (this.filterForm.value['category'] as TreeviewItem).text !== undefined) 
        ? (this.filterForm.value['category'] as TreeviewItem).text 
        : "")
    return {
      title: (this.filterForm.value['title'] as string),
      courseTitle:  (this.filterForm.value['course'] as string),
      status:  (this.filterForm.value['status'] as string),
      categoryName:  categoryName,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    } as FindLecturesDto;
  }
}
