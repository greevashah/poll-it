import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewpoll',
  templateUrl: './viewpoll.component.html',
  styleUrls: ['./viewpoll.component.css']
})
export class ViewpollComponent implements OnInit {
  public question: string = "Some question to be asked";
  public options=["option1","option2","option3","option4"];
  constructor() { }

  ngOnInit(): void {
  }
  submitFunc(value){
    console.log(value);
  }
}
