import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PaginatedResult } from "../_models/pagination";

export function getPaginatedResult<T>(url: any, params: any, http: HttpClient) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return http.get<T>(url, {observe: 'response', params}).pipe(
        map((response: any) => {
            paginatedResult.result = response.body as T;

            // if(response.header.get('Pagination') !== null) {
            //     paginatedResult.pagination = JSON.parse(response.header.get('Pagination') as string);
            // }

            return paginatedResult;
        })
    )
}

export function getPaginationHeaders(pageNumber: number, pageSize: number, appUserId: number = -1) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString() as string);
    params = params.append('pageSize', pageSize.toString() as string);
    if(appUserId !== -1) {
        params = params.append('appUserId', appUserId.toString() as string);
    }

    return params;
}