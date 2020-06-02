import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPollComponent } from './join-poll.component';

describe('JoinPollComponent', () => {
  let component: JoinPollComponent;
  let fixture: ComponentFixture<JoinPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinPollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
