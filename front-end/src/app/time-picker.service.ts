import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimePickerService {

  private url = `http://localhost:8080/timepicker`;
  public startTime:Date;
  public endTime:Date;
  public eventDuration: number;
  public countArray = [];
  constructor(private http: HttpClient) { }

  initialise(value) {
    this.startTime = value.startTime;
    this.endTime = value.endTime;
    this.eventDuration = value.eventDuration;
    this.countArray = value.countArray;
    console.log(value);
  }

  viewTimePicker(code){
    return this.http.get<any>(`${this.url}/getTimePicker`, {params: {code: code} } );
  }

  createTimePicker(value){
    return this.http.post<any>(`${this.url}/createTimePicker`, value);
  }

  pickSlot(code, value){
    return this.http.post<any>(`${this.url}/pickSlot`, value);
  }
}
