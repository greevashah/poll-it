import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'second-app';
  public loggedIn = false;
  constructor(public auth: AuthServiceService, private Router: Router ){
    this.auth.getValue().subscribe((value) => {
      this.loggedIn = value;
    });
  }
  logout() {
    this.auth.setValue(false);
    this.Router.navigate(['login']);
    this.auth.logout().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }
}
