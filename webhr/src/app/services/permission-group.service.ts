import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url: string = environment.url || environment.localUrl;

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class PermissionGroupService {

  constructor(private http : HttpClient) { }

  
}
