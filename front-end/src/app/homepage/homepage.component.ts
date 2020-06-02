import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }
  error_message = ``;
  public showForm = true;

  ngOnInit(): void {
  }

  setErrorMessage = (error_message) => {
    this.error_message = error_message;
    this.showForm = false;
  }
}
