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
    return this.http.get<any>(this.LocationUrl+`findAll`,httpOptions);
  }

  deleteRegion(regionId:string){
    return this.http.get<any>(this.LocationUrl+regionId,httpOptions);
  }

  postRegion(res:any):Observable<any>{
    return this.http.post<any>(this.LocationUrl+'post',res,httpOptions);
  }

  putRegion(res:any):Observable<any>{
    return this.http.put<any>(this.LocationUrl+'put',res,httpOptions);
  }
  
  searchRegion(keyword:string):Observable<any>{
    return this.http.get<any>(this.LocationUrl+`findByRegionName?regionName=${keyword}&page=0&size=10000`,httpOptions);
  }
}
