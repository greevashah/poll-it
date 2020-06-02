import { AuthServiceService } from './../auth-service.service';
import { Router } from '@angular/router';
import { VotePollService } from './../vote-poll.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private votePoll:VotePollService, private Router:Router, private auth: AuthServiceService) {
    this.name = votePoll.pollname;
    this.creator = votePoll.creator;
    this.question = votePoll.question;
    this.options = votePoll.options;
    this.code = votePoll.code;
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
