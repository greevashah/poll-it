import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = `http://localhost:8080`;
  // Node url
  constructor(private http: HttpClient) { }

  login(value) {
    return this.http.post<any>(`${this.url}/auth/login`, value);
  }

  signup(value) {
    return this.http.post<any>(`${this.url}/auth/signup`, value);
  }

  logout() {
    return this.http.get<any>(`${this.url}/auth/logout`);
  }
  created(value){
    return this.http.post<any>(`${this.url}/auth/created`, { 'code' : value})
  }
  voted(value){
    console.log("Value is ",value);
    return this.http.post<any>(`${this.url}/auth/voted`, { 'code' : value});
  }

  checkVoted(value){
    return this.http.post<any>(`${this.url}/auth/checkvoted`, { 'code' : value});
  }
}
