import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotePollService {
  public pollname: string;
  public creator: string;
  public question: string;
  public options = [];
  public code: string;
  public timepicker: boolean;
  public multipleChoice: boolean;
  public deadline: Date;
  public startTime: Date;
  public endTime: Date;
  public eventDuration: number;
  public countArray = [];


  private url = `http://localhost:8080/poll`;
  constructor(private http: HttpClient) { }

  initialise(value){
    this.pollname = value.name;
    this.creator = value.creator;
    this.question = value.question;
    this.options = value.option;
    this.code = value.code;
    this.timepicker = value.timepicker;
    this.multipleChoice = value.multipleChoice;
    this.deadline = value.isDeadline ? value.deadline : null;
    console.log("VotePoll::", value);
    // console.log("value-options ", value.option)
  }

  viewPoll(value){
    return this.http.get<any>(`${this.url}/result/${value}`);
  }

  createPoll(value){
    return this.http.post<any>(`${this.url}/createPoll`, value);
  }

  votePoll(code, value){
    return this.http.post<any>(`${this.url}/vote/${code}/${value}`, value);
  }

}

