import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotePollService {
  private url = `http://localhost:8080/poll`;
  constructor(private http: HttpClient) { }

  viewPoll(value){
    return this.http.post<any>(`${this.url}/getpoll`, value);
  }

  createPoll(value){
    return this.http.post<any>(`${this.url}/createPoll`, value);
  }

  votePoll(value){
    return this.http.post<any>(`${this.url}/getpoll`, value);
  }

}

