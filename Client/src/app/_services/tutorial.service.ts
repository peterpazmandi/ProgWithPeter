import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UpsertTutorialDto } from 'src/app/_models/upsertTutorialDto.model';
import { Tutorial } from '../_models/tutorialDto.model';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListOfTutorials(pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    console.log(params);
    // return this.http.get<Tutorial[]>(this.baseUrl + 'Tutorial/GetPublishedTutorialsOrderedByPublishDate');
    return getPaginatedResult<Tutorial[]>(this.baseUrl + 'Tutorial/GetPublishedTutorialsOrderedByPublishDate', params, this.http);
  }

  getTutorial(id: number) {

  }

  upsertTutorial(upsertTutorialDto: UpsertTutorialDto) {
    return this.http.post(this.baseUrl + 'Tutorial', upsertTutorialDto);
  }

  
}
