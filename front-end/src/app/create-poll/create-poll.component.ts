import { AuthServiceService } from './../auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl,FormArray, FormBuilder, Validators } from '@angular/forms';
import { VotePollService } from '../vote-poll.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  public question: string;
  // public option=[];
  public count: number = 0;
  public createForm: FormGroup;

  @Output() sendErrorMessage = new EventEmitter<string>();

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
      options: this.fb.array([])
      // options: new FormControl('')
    });
  }
  submitFunc(form: FormGroup){
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

}
// <input ngModel type="text" name="options" *ngIf="">
