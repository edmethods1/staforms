import { Component, OnInit } from '@angular/core';
import { BaseQuestion } from '../BaseQuestion';
import { TextualQuestion, QuestionType } from '../../../models/question';
import { QuestionsService } from '../../../services/questions.service';

@Component({
  selector: 'app-textual-question',
  templateUrl: './textual-question.component.html',
  styleUrls: ['./textual-question.component.css']
})
export class TextualQuestionComponent extends BaseQuestion implements OnInit {

  constructor(private service: QuestionsService) {
    super(service);
  }

  private textualQuestion: TextualQuestion;

  public verifyDisabled() {
    if (!this.textualQuestion.answer) {
      this.disabled = true;
    } else if (this.textualQuestion.validation &&
      !new RegExp(this.textualQuestion.validation).test(this.textualQuestion.answer)) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  ngOnInit() {
    this.textualQuestion = this.question as TextualQuestion;
    super.ngOnInit();
  }


  public submit() {
    if (this.disabled) {
      return;
    }
    if (this.textualQuestion.variable) {
      this.form.variables[this.textualQuestion.variable] = this.textualQuestion.answer;
    }
    this.form.currentQuestionId = this.textualQuestion.nextQuestionId;
    super.submit();
  }
}
