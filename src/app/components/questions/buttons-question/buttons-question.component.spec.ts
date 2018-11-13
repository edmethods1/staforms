import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsQuestionComponent } from './buttons-question.component';

describe('ButtonsQuestionComponent', () => {
  let component: ButtonsQuestionComponent;
  let fixture: ComponentFixture<ButtonsQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
