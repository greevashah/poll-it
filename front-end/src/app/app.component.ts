import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'second-app';
  constructor(private auth: AuthServiceService){}
  logout(){
    console.log("logout getting called");
    this.auth.logout().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }
}
