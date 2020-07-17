import { AuthServiceService } from './../auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output,ViewChild } from '@angular/core';
import { FormGroup, FormControl,FormArray, FormBuilder, Validators } from '@angular/forms';
import { VotePollService } from '../vote-poll.service';
import { ThemePalette } from '@angular/material/core';


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
  public isChecked = false;
  // public isCheckedDeadline = false;
  title = 'demo';
  public exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

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
  constructor(private fb: FormBuilder, private votePoll: VotePollService, private Router:Router, private auth: AuthServiceService) {
   }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      question: ['', Validators.required],
      options: this.fb.array([]),
      // options: new FormControl('')
      timepicker: [false],
      multiplechoice: [false],
      isdeadline: [false],
      eventDuration: [''] ,
      deadline: new FormControl(new Date(2021,9,4,5,6,7)),
      startTime:[''],
      endTime:['']
    });
  }

  submitFunc(form: FormGroup){
    console.log("Form value is : ");
    console.log(form.value);
    this.votePoll.createPoll(form.value).subscribe(res => {
      console.log('res:', res);
      this.auth.created(res.code).subscribe(result => {
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

  onChange(value){
    if (value.checked === true) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }
  // onChangeDeadline(value){
  //   if(value.checked === true){
  //     this.isCheckedDeadline = true;
  //   } else {
  //     this.isCheckedDeadline = false;
  //   }
  // }
}
// <input ngModel type="text" name="options" *ngIf="">
