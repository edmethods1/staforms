import { Component, OnInit, Input } from '@angular/core';
import { Form, StaticQuestion } from '../../../models/question';
import { BaseQuestion } from '../BaseQuestion';
import { QuestionsService } from '../../../services/questions.service';

@Component({
  selector: 'app-static-data',
  templateUrl: './static-data.component.html',
  styleUrls: ['./static-data.component.css']
})
export class StaticDataComponent extends BaseQuestion implements OnInit {
  @Input() form: Form;
  @Input() variable: any;
  data: any;
  localStorage = window.localStorage;

  private staticQuestion: StaticQuestion;

  constructor(private service: QuestionsService) {
    super(service);
  }

  ngOnInit() {
    this.staticQuestion = this.question as StaticQuestion;
    super.ngOnInit();
    this.data = super.getVariable(this.staticQuestion.variable);;
  }

  public verifyDisabled() {
    this.disabled = false;
  }

  public submit() {
    this.form.currentQuestionId = this.staticQuestion.nextQuestionId;
    super.submit();
  }

}
