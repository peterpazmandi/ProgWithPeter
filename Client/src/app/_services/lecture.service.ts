import { Injectable } from '@angular/core';
import { isEmpty } from 'rxjs/operators';
import { FindLecturesDto } from '../_models/findLecturesDto.model';
import { Lecture } from '../_models/lectureDto.model';
import { SetLectureCompletion } from '../_models/setLectureCompletion.model';
import { UpsertLectureDto } from '../_models/upsertLectureDto.model';
import { UpsertLectureListDto } from '../_models/upsertLectureListDto.model';
import { BaseService } from './base.service';
import { getPaginatedResult, getPaginationHeaders } from './pagination.helper';

@Injectable({
  providedIn: 'root'
})
export class LectureService extends BaseService {

  upsertLecture(upsertLectureDto: UpsertLectureDto) {
    return this.http.post(this.baseUrl + 'Lecture', upsertLectureDto);
  }

  setLectureCompletion(lectureId: number, isCompleted: boolean) {
    let lectureCompletion = {
      lectureId: lectureId,
      isCompleted: isCompleted
    } as SetLectureCompletion;
    return this.http.post(this.baseUrl + 'Lecture/SetLectureCompletion', lectureCompletion);
  }

  getLecturesOrderedByModificationDate(pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<UpsertLectureListDto[]>(this.baseUrl + 'Lecture/GetLecturesOrderedByModificationDate', params, this.http);
  }

  getLectureByTitleAndCourseTitle(lectureTitle: string, courseTitle: string) {
    return this.http.get<Lecture>(this.baseUrl + `Lecture/GetLectureByTitleAndCourseTitle?lectureTitle=${lectureTitle}&courseTitle=${courseTitle}`);
  }

  findLectures(findLectures: FindLecturesDto) {
    let params = getPaginationHeaders(findLectures.pageNumber, findLectures.pageSize);
    return getPaginatedResult<UpsertLectureListDto[]>(
        this.baseUrl + `Lecture/FindLectures?` +
        `${(findLectures.title === "") ? "" : "Title=" + findLectures.title + "&"}` + 
        `${(findLectures.courseTitle === "") ? "" : "CourseTitle=" + findLectures.courseTitle + "&"}` +
        `${(findLectures.status === "") ? "" : "Status=" + findLectures.status + "&"}` +
        `${(findLectures.categoryName === "" || findLectures.categoryName === undefined || findLectures.categoryName === null) ? "" : "CategoryName=" + findLectures.categoryName + "&"}`, 
        params, 
        this.http);
  }
}
