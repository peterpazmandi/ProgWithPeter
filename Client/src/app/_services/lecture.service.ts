import { Injectable } from '@angular/core';
import { SetLectureCompletion } from '../_models/setLectureCompletion.model';
import { UpsertLectureListDto } from '../_models/upsertLectureListDto.model';
import { BaseService } from './base.service';
import { getPaginatedResult, getPaginationHeaders } from './pagination.helper';

@Injectable({
  providedIn: 'root'
})
export class LectureService extends BaseService {

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

}
