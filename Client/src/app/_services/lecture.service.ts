import { Injectable } from '@angular/core';
import { SetLectureCompletion } from '../_models/setLectureCompletion.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LectureService extends BaseService {

  setLectureCompletion(lectureId: number, isCompleted: boolean) {
    let body = JSON.stringify({ lectureId: lectureId, isCompleted: isCompleted });
    let lectureCompletion = {
      lectureId: lectureId,
      isCompleted: isCompleted
    } as SetLectureCompletion;
    return this.http.post(this.baseUrl + 'Lecture/SetLectureCompletion', lectureCompletion);
  }

}
