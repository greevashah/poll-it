import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { JoinPollComponent } from './join-poll/join-poll.component';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomepageComponent } from './homepage/homepage.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ViewpollComponent } from './viewpoll/viewpoll.component';
import { CustomInterceptor } from './interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CreatePollComponent,
    JoinPollComponent,
    GenericFormComponent,
    LoginComponent,
    SignUpComponent,
    HomepageComponent,
    ViewpollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor ,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
