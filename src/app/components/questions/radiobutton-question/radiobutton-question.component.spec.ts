import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiobuttonQuestionComponent } from './Radiobutton-question.component';

describe('RadiobuttonQuestionComponent', () => {
  let component: RadiobuttonQuestionComponent;
  let fixture: ComponentFixture<RadiobuttonQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiobuttonQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
