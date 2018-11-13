import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextualQuestionComponent } from './textual-question.component';

describe('TextualQuestionComponent', () => {
  let component: TextualQuestionComponent;
  let fixture: ComponentFixture<TextualQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextualQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextualQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
