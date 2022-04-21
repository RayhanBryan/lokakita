import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {  Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL=environment.url;

const httpOptions={
  headers: new HttpHeaders({
    'Accept':'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }


getCountry(): Observable<any>{
  return this.http.get<any>(API_URL+'country/findAll',httpOptions);
}

postCountry(req:any): Observable<any>{
  return this.http.post<any>(API_URL+'country/post',req, httpOptions)
}

putCountry(req:any): Observable<any>{
  return this.http.put<any>(API_URL+'country/put',req, httpOptions)
}

deleteCountry(id:string):Observable<any>{
  return this.http.delete<any>(API_URL+'country/'+id, httpOptions)
  
}

getCountryByName(search:string): Observable<any>{
  return this.http.get<any>(API_URL+'country/findCountryByName?countryName='+search,{responseType: 'json'}).pipe(map((data:any)=>(data.data||data)));

}

getCountryByRegion(search:string): Observable<any>{
  return this.http.get<any>(API_URL+'country/findRegionByName?regionName='+search,{responseType: 'json'}).pipe(map((data:any)=>(data.data||data)));

}




}
