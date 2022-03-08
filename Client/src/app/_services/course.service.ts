import { Injectable } from '@angular/core';
import { Course } from '../_models/courseDto.model';
import { UpsertCourseDto } from '../_models/upsertCourseDto.model';
import { BaseService } from './base.service';
import { getPaginatedResult, getPaginationHeaders } from './pagination.helper';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {

  getCourseByTitle(title: string) {
    return this.http.get<Course>(this.baseUrl + 'Course/GetCourseByTitle?title=' + title);
  }
  
  getCoursesOrderedByModificationDate(pageNumber: number, pageSize: number, appUserId: number = -1) {
    let params = getPaginationHeaders(pageNumber, pageSize, appUserId);
    return getPaginatedResult<Course[]>(
      this.baseUrl + 'Course/GetCoursesOrderedByModificationDate', params, this.http);
  }
  
  getPublishedCoursesOrderedByPublishDate(pageNumber: number, pageSize: number, appUserId: number = -1) {
    let params = getPaginationHeaders(pageNumber, pageSize, appUserId);
    return getPaginatedResult<Course[]>(
      this.baseUrl + 'Course/GetPublishedCoursesOrderedByPublishDate', params, this.http);
  }

  upsertCourse(course: UpsertCourseDto) {
    return this.http.post(this.baseUrl + 'Course', course);
  }
}
