import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthServiceService, private Router: Router ) { }
  public errorMessage = ``;

  ngOnInit(): void {
  }

  getFormData(value){
    console.log(`In login `, value);
    this.auth.login(value).subscribe(res => {
      console.log(res);
      this.Router.navigate(['home']);
    },
    err => {
      this.errorMessage = `Login Failed`;
    });
  }

}
