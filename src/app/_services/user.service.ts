import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL , { responseType: 'json' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL , { responseType: 'json' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  
  findOne(id): Observable<any> {
    return this.http.get(API_URL + id, { responseType: 'json' });
  }

  getRoles(): Observable<any> {
    return this.http.get(API_URL + 'roles', { responseType: 'json' });
  }

  createUser(credentials): Observable<any> {
    return this.http.post(API_URL, {
      username: credentials.username,
      email:credentials.email,
      password: credentials.password,
      role:credentials.role
    }, httpOptions);
  }

  updateUser(id,credentials): Observable<any> {
    return this.http.put(API_URL + id, {
      username: credentials.username,
      email:credentials.email,
      password: credentials.password,
      role:credentials.role
    }, httpOptions);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(API_URL + id, httpOptions);
  }

}
