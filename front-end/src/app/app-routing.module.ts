import { ViewpollComponent } from './viewpoll/viewpoll.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { JoinPollComponent } from './join-poll/join-poll.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomepageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component: SignUpComponent},
  {path:'viewpoll', component: ViewpollComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
