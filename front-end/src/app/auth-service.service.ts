import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url = `http://localhost:8080`;
  private loggedIn: BehaviorSubject<boolean>;
  private userPolls;
  // Node url
  constructor(private http: HttpClient) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  getValue(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setValue(newValue): void {
    this.loggedIn.next(newValue);
  }

  getPolls(){
    return this.userPolls
  }

  setPolls(newValue): void {
    this.userPolls = newValue;
  }

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
    return this.http.post<any>(`${this.url}/auth/voted`, { 'code' : value});
  }

  checkVoted(value){
    return this.http.post<any>(`${this.url}/auth/checkvoted`, { 'code' : value});
  }
}
