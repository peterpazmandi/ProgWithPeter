import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'src/app/_models/courseDto.model';
import { CourseService } from 'src/app/_services/course.service';
import { PostType } from 'src/app/_utils/post-type.enum';
import { Status } from 'src/app/_utils/status.enum';

@Component({
  selector: 'app-upsert-course-list',
  templateUrl: './upsert-course-list.component.html',
  styleUrls: ['./upsert-course-list.component.css']
})
export class UpsertCourseListComponent implements OnInit { 
  filterForm: FormGroup;
  pageNumber = 1;
  pageSize = 20;
  courses: Course[] = [];
  public statuses = Status;

  postType: typeof PostType;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService) { 
    this.postType = PostType;
  }

  ngOnInit(): void {
    this.initializeForm();

    this.courseService.getCoursesOrderedByModificationDate(this.pageNumber, this.pageSize).subscribe(response => {
      this.courses.push(...response.result);
    })
  }

  private initializeForm() {
    this.filterForm = this.fb.group({
      title: ['']
    })
  }

  filter() {
    
  }

}
