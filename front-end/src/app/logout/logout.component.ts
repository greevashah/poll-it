import { Router } from '@angular/router';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthServiceService, private Router: Router) {
   }

  ngOnInit(): void {
    this.auth.logout().subscribe(res => {
      console.log("In  log out");
      this.Router.navigate['login'];
    }, err => {
      console.log("Error in Logging out: ", err);
    });
  }

}
