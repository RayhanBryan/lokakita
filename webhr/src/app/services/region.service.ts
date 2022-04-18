import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL: string = environment.url;
const httpOptions = {
  headers: new HttpHeaders({
    'Accept' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private LocationUrl=URL+'regions/';
  constructor(private http: HttpClient) { }
  getRegion(): Observable<any> {
    console.log(this.LocationUrl)
    return this.http.get<any>(this.LocationUrl+`findAll`,httpOptions);
  }
  
}
