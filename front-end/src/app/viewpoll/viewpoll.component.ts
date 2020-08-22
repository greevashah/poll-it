import { AuthServiceService } from './../auth-service.service';
import { Router } from '@angular/router';
import { VotePollService } from './../vote-poll.service';
import { Component, OnInit } from '@angular/core';
import { TimePickerService } from './../time-picker.service';

@Component({
  selector: 'app-viewpoll',
  templateUrl: './viewpoll.component.html',
  styleUrls: ['./viewpoll.component.css']
})
export class ViewpollComponent implements OnInit {
  public name:string;
  public creator:string;
  public question: string;
  public options;
  public code:string;
  public timepicker: boolean;
  public multipleChoice: boolean;
  public deadline: Date;
  public startTime: Date;
  public endTime: Date;
  public eventDuration: number;
  public countArray = [];

  constructor(private votePoll:VotePollService,
              private timePicker:TimePickerService, private Router:Router, private auth: AuthServiceService) {
    this.name = votePoll.pollname;
    this.creator = votePoll.creator;
    this.question = votePoll.question;
    this.options = votePoll.options;
    this.code = votePoll.code;
    this.timepicker = votePoll.timepicker;
    this.multipleChoice = votePoll.multipleChoice;
    this.deadline = votePoll.deadline;
    console.log("Am I getting called twice ?");

    if (this.timepicker) {
      this.timePicker.viewTimePicker(this.code).subscribe(Response => {
        this.timePicker.initialise(Response);
        this.startTime = timePicker.startTime;
        this.endTime = timePicker.endTime;
        this.eventDuration = timePicker.eventDuration;
        this.countArray = timePicker.countArray;
        console.log("VotePoll::", Response);
      });
    }
    
   }

  ngOnInit(): void {
  }

  submitFunc(value){
    // console.log(value);
    this.votePoll.votePoll(this.code, value.option).subscribe(res => {
      console.log('res:', res);
      this.auth.voted(this.code).subscribe(result => {
        console.log('vote and code added');
        this.votePoll.initialise(res);
        this.Router.navigate(['result']);
      }, er => {
        console.log("error in adding code to user")
      });
    }, err => {
        console.log('error in adding vote:', err);
    });
  }
}
