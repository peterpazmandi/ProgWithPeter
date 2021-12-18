import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories(id: any): Observable<Category> {
    return this.http.get(this.baseUrl + 'Categories/GetCategories' + ((id === null) ? '' : `?parentCategoryId=${id}`)) as Observable<Category>;
  }
}
