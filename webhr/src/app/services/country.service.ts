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

deleteCountry(id:string):Observable<any>{
  return this.http.delete<any>(API_URL+'country/'+id, httpOptions)
  
}

getCountryByName(search:string): Observable<any>{
  return this.http.get<any>(API_URL+'country/findByCountryName?countryName='+search+'&page=0&size=100',{responseType: 'json'}).pipe(map((data:any)=>(data.data||data)));

}


}
