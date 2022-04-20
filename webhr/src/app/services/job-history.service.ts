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
export class JobHistoryService {

  constructor(private http: HttpClient) { }

  getJobHistoryByEmployeeId(search:string): Observable<any>{
    return this.http.get<any>(API_URL+'jobhistory/getById?id='+search,{responseType: 'json'}).pipe(map((data:any)=>(data.data||data)));
  
  }
}
