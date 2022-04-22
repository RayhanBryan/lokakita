import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.url || environment.localUrl;

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  getJob(): Observable<any> {
    return this.http.get<any>(API_URL + 'jobs/findAll', httpOptions);
  }

  postJob(req: any): Observable<any> {
    return this.http.post<any>(API_URL + 'jobs/post', req, httpOptions);
  }

  putJob(req: any): Observable<any> {
    return this.http.put<any>(API_URL + 'jobs/put', req, httpOptions);
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete<any>(API_URL + 'jobs/' + id, httpOptions);
  }

  getJobByTitle(search: string): Observable<any> {
    return this.http
      .get<any>(API_URL + 'jobs/findJobByTitle?jobTitle=' + search, {
        responseType: 'json',
      })
      .pipe(map((data: any) => data.data || data));
  }
}
