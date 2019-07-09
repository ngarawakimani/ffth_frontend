import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  uri = 'http://localhost:8000/api/v1/children';

  constructor(private http: HttpClient) {
  }

  getChildren(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.uri}`, httpOptions);
  }
}
