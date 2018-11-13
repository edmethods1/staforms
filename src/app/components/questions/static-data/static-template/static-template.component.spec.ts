import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticTemplateComponent } from './static-template.component';

describe('StaticTemplateComponent', () => {
  let component: StaticTemplateComponent;
  let fixture: ComponentFixture<StaticTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
