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
import { ResutlDisplayComponent } from './resutl-display/resutl-display.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeDisplayComponent } from './home-display/home-display.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    CreatePollComponent,
    JoinPollComponent,
    GenericFormComponent,
    LoginComponent,
    SignUpComponent,
    HomepageComponent,
    ViewpollComponent,
    ResutlDisplayComponent,
    HomeDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    NgxMaterialTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxDaterangepickerMd.forRoot(),
    BsDatepickerModule.forRoot()
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
