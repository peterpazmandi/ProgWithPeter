import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tag } from '../_models/tag.model';
import { BaseService } from './base.service';
import { getPaginatedResult, getPaginationHeaders } from './pagination.helper';

@Injectable({
  providedIn: 'root'
})
export class TagsService extends BaseService {

  getAllTags(pageNumber: number, pageSize: number) {
    let params  =getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Tag[]>(
      this.baseUrl + 'Tags/GetAllTags', params, this.http
    );
  }

  searchTags(searchString: string) {
    if(searchString.length > 0) {
      return this.http.get(this.baseUrl + 'tags/SearchTags?searchText=' + searchString);
    }
    return null;
  }

  upsertTag(tag: Tag) {
    return this.http.post(this.baseUrl + 'Tags/UpsertTag', tag);
  }
}
