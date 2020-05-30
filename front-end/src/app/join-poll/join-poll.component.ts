import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-poll',
  templateUrl: './join-poll.component.html',
  styleUrls: ['./join-poll.component.css']
})
export class JoinPollComponent implements OnInit {
  public code:string;
  constructor() { }

  ngOnInit(): void {
  }
  submitFunc(value){
    this.code=value.code;
  }

}
