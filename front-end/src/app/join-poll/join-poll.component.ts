import { AuthServiceService } from './../auth-service.service';
import { Router } from '@angular/router';
import { VotePollService } from './../vote-poll.service';
import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-join-poll',
  templateUrl: './join-poll.component.html',
  styleUrls: ['./join-poll.component.css']
})

export class JoinPollComponent implements OnInit {
  public code:string;
  constructor(private votePoll: VotePollService, private auth:AuthServiceService , private Router :Router) { }

  ngOnInit(): void {
  }

  @Output() sendErrorMessage = new EventEmitter<string>();

  submitFunc(value){
    this.code = value.code;
    console.log(value.code);
    this.votePoll.viewPoll(value.code).subscribe(res => {
      console.log('In join, res:', res);
      // res is an array [poll doc obj, timepicker doc object]
      this.auth.checkVoted(value.code).subscribe( response =>{
        if(response == "VOTED"){
          console.log("Already voted");
          this.votePoll.initialise(res);
          this.Router.navigate(['result']);
        }
        else if(response == "NOT VOTED"){
          console.log("Not voted");
          this.votePoll.initialise(res);
          this.Router.navigate(['viewpoll']);
        }
        else{
          console.log("in else, response: ", response);
        }
      },err =>{
        console.log('error in checking if user has voted or not');
      });
    }, err => {
        console.log('error:', err);
    });
  }
}
