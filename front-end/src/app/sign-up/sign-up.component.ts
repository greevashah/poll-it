import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private auth: AuthServiceService, private Router: Router) { }
  public errorMessage = ``;

  ngOnInit(): void {
  }

  getFormData(value){
    console.log("In sign up ", value);
    this.auth.signup(value).subscribe(res => {
      console.log(res);
      this.Router.navigate(['login']);
    },
    err => {
      this.errorMessage = `Signup Failed`;
    });
  }
}
