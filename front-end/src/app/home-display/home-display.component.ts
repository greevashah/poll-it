import { element } from 'protractor';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-display',
  templateUrl: './home-display.component.html',
  styleUrls: ['./home-display.component.css']
})
export class HomeDisplayComponent implements OnInit {
  public userPolls;
  public createdPolls;
  public votedPolls;

  constructor(private auth: AuthServiceService) {
    this.userPolls = this.auth.getPolls();
    console.log(this.userPolls);
    this.createdPolls  = this.userPolls.created.map( element => { return {"name" : element.name , "code" : element.code }; }  );
    this.votedPolls = this.userPolls.voted.map( element => { return {"name" : element.name , "code" : element.code }; }  );
   }

  ngOnInit(): void {
  }

}
