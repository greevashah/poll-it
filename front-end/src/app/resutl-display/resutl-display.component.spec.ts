import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResutlDisplayComponent } from './resutl-display.component';

describe('ResutlDisplayComponent', () => {
  let component: ResutlDisplayComponent;
  let fixture: ComponentFixture<ResutlDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResutlDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResutlDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
