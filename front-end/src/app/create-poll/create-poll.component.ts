import { TimePickerService } from './../time-picker.service';
import { AuthServiceService } from './../auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl,FormArray, FormBuilder, Validators } from '@angular/forms';
import { VotePollService } from '../vote-poll.service';
import * as moment from 'moment';

// import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})

export class CreatePollComponent implements OnInit {
  // @ViewChild('picker') picker: any;

  public question: string;
  public count: number = 0;
  public createForm: FormGroup;
  // public isChecked = false;
  // public isCheckedDeadline = false;
  title = 'demo';
  public exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

  public inlineDateTime: { chosenLabel: string; startDate: moment.Moment; endDate: moment.Moment };
  public selected = {
    startDate: moment(),
    // endDate: moment('2015-11-26T05:30'),
  };
  // public myDateValue = this.selected.startDate.toDate();

  @Output() sendErrorMessage = new EventEmitter<string>();

  onChangeHour(event) {
    console.log('event', event);
  }

  get options(){
    return this.createForm.get('options') as FormArray
  }

  addOption(){
    return this.options.push(this.fb.control(''));
  }
  
  constructor(private fb: FormBuilder, private votePoll: VotePollService, private Router:Router, private auth: AuthServiceService, private timePicker: TimePickerService) {
   }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      question: ['', Validators.required],
      options: this.fb.array([]),
      // options: new FormControl('')
      timepicker: [false],
      multipleChoice: [false],
      isDeadline: [false],
      deadline: [''],
      eventDuration: [1] ,
      startTime: new FormControl(moment()),
      endTime: new FormControl(moment())
    });
  }

  submitFunc(form: FormGroup){
    console.log("Form value is : ");
    console.log(form.value);

    this.votePoll.createPoll(form.value).subscribe(res => {
      console.log('res:', res);
      if(res.timepicker){
        // is Time picker
        var timepicker = {
          "code": res.code,
          "startTime": form.value.startTime,
          "endTime": form.value.endTime,
          "eventDuration": form.value.eventDuration
        }
        this.timePicker.createTimePicker(timepicker).subscribe(response => {
          // Time picker route to be hit
          console.log("Timepicker route hit successfully");
          // this.auth.created(res.code).subscribe( result => {
          //   console.log(result);
          //   var message = 'New poll created with code ' + res.code;
          //   console.log("message:",message);
          //   this.sendErrorMessage.emit(message);
          //   this.Router.navigate(['home']);
          // });
        })
      }
      else{
        
      }
      this.auth.created(res.code).subscribe( result => {
        console.log(result);
        var message = 'New poll created with code ' + res.code;
        console.log("message:",message);
        this.sendErrorMessage.emit(message);
        this.Router.navigate(['home']);
      });
    }, err => {
        console.log('error:', err);
    });
  }

  addInput(){
    this.count=this.count+1;
    let row = document.createElement('div');
    // row.className = 'row';
    row.className= 'input'+this.count;
    row.innerHTML = `
    <input formControlName="option`+this.count+`" type="text" name="option`+this.count+`" >`;
    document.querySelector('.showInputField').appendChild(row);
  }

  chosenDateTime(chosenDate: { chosenLabel: string; startDate: moment.Moment; endDate: moment.Moment }): void {
    // console.log("Create form value is ", this.createForm.value)
    this.createForm.controls['startTime'].setValue(chosenDate.startDate) ;
    this.createForm.controls['endTime'].setValue(chosenDate.endDate) ;
    const diffDays= chosenDate.endDate.diff(chosenDate.startDate, 'days') + 1 ;
    this.createForm.controls['eventDuration'].setValue(diffDays) ;
    this.inlineDateTime = chosenDate;
  }
}
