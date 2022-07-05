import { Injectable } from '@angular/core';
import { Course } from '../_models/courseDto.model';
import { UpsertCourseDto } from '../_models/upsertCourseDto.model';
import { UserCourseEnrollmentDto } from '../_models/UserCourseEnrollmentDto.model';
import { BaseService } from './base.service';
import { getPaginatedResult, getPaginationHeaders } from './pagination.helper';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {

  getCourseByTitle(title: string, appUserId: number) {
    let requestUrl = this.baseUrl + 'Course/GetCourseByTitle?title=' + title;
    if(appUserId) {
      requestUrl += '&appUserId=' + appUserId;
    }
    return this.http.get<Course>(requestUrl);
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

  getCourseTitles() {
    return this.http.get<string[]>(this.baseUrl+ 'Course/GetCourseTitles');
  }

  getEnrolledCoursesByUserId() {
    return this.http.get<UserCourseEnrollmentDto[]>(this.baseUrl+ 'Course/GetEnrolledCoursesByUserId');
  }

  upsertCourse(course: UpsertCourseDto) {
    return this.http.post(this.baseUrl + 'Course', course);
  }
}
