import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryDto } from '../_models/categoryDto.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories(id: any): Observable<CategoryDto> {
    return this.http.get(this.baseUrl + 'Categories/GetCategories' + ((id === null) ? '' : `?parentCategoryId=${id}`)) as Observable<CategoryDto>;
  }
}
