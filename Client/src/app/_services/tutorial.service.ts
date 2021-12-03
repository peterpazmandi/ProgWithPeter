import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UpsertTutorialDto } from '../_models/UpsertTutorialDto.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListOfTutorials() {

  }

  getTutorial(id: number) {

  }

  upsertTutorial(upsertTutorialDto: UpsertTutorialDto) {
    return this.http.post(this.baseUrl + 'Tutorial', upsertTutorialDto);
  }

  
}
