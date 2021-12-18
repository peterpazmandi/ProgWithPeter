import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UpsertTutorialDto } from 'src/app/_models/upsertTutorialDto.model';
import { Tutorial } from '../_models/tutorialDto.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListOfTutorials() {
    return this.http.get<Tutorial[]>(this.baseUrl + 'Tutorial/GetPublishedTutorialsOrderedByPublishDate');
  }

  getTutorial(id: number) {

  }

  upsertTutorial(upsertTutorialDto: UpsertTutorialDto) {
    return this.http.post(this.baseUrl + 'Tutorial', upsertTutorialDto);
  }

  
}
