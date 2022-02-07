import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UpsertTutorialDto } from 'src/app/_models/upsertTutorialDto.model';
import { Tutorial } from '../_models/tutorialDto.model';
import { getPaginatedResult, getPaginationHeaders } from './pagination.helper';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TutorialService extends BaseService {

  getPublishedTutorialsOrderedByPublishDate(pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Tutorial[]>(
      this.baseUrl + 'Tutorial/GetPublishedTutorialsOrderedByPublishDate', params, this.http);
  }

  getTutorialsOrderedByModificationDate(pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Tutorial[]>(this.baseUrl + 'Tutorial/GetTutorialsOrderedByModificationDate', params, this.http);
  }

  getTutorialByTitle(title: string) {
    return this.http.get<Tutorial>(this.baseUrl + 'Tutorial/GetTutorialByTitle?title=' + title);
  }

  upsertTutorial(upsertTutorialDto: UpsertTutorialDto) {
    return this.http.post(this.baseUrl + 'Tutorial', upsertTutorialDto);
  }

  
}
