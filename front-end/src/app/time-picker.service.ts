import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimePickerService {

  private url = `http://localhost:8080/timePicker`;
  constructor(private http: HttpClient) { }

  viewTimePicker(value){
    return this.http.get<any>(`${this.url}/getTimePicker/${value}`);
  }

  createTimePicker(value){
    return this.http.post<any>(`${this.url}/createTimePicker`, value);
  }

  pickSlot(code, value){
    return this.http.post<any>(`${this.url}/pickSlot`, value);
  }
}
