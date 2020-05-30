import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotePollService {
  public pollname:string;
  public creator:string;
  public question:string;
  public options=[];
  public code:string;


  private url = `http://localhost:8080/poll`;
  constructor(private http: HttpClient) { }

  initialise(value){
    this.pollname=value.name;
    this.creator=value.creator;
    this.question=value.question;
    this.options=value.option;
    this.code=value.code;
    // console.log("value-options ", value.option)
  }

  viewPoll(value){
    var url=`${this.url}/result/${value}`;
    console.log(url);
    return this.http.get<any>(`${this.url}/result/${value}`);
  }

  createPoll(value){
    return this.http.post<any>(`${this.url}/createPoll`, value);
  }

  votePoll(code, value){
    return this.http.post<any>(`${this.url}/vote/${code}/${value}`, value);
  }

}

