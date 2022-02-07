import { Injectable } from '@angular/core';
import { Course } from '../_models/courseDto.model';
import { BaseService } from './base.service';
import { getPaginatedResult, getPaginationHeaders } from './pagination.helper';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {
  
  getPublishedCoursesOrderedByPublishDate(pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Course[]>(
      this.baseUrl + 'Course/GetCoursesOrderedByModificationDate', params, this.http);
  }

}
