import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  searchTags(searchString: string) {
    if(searchString.length > 0) {
      return this.http.get(this.baseUrl + 'tags/SearchTags?searchText=' + searchString);
    }
    return null;
  }
}
