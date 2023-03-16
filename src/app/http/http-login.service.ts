import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpLoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(loginBody: any): Observable<any> {
    return this.http.post(`/login`,loginBody);
  }
}
