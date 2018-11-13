import { Component, OnInit } from '@angular/core';
import { BaseQuestion } from '../BaseQuestion';
import { RadiobuttonQuestion, QuestionType } from '../../../models/question';
import { QuestionsService } from '../../../services/questions.service';

@Component({
  selector: 'app-radiobutton-question',
  templateUrl: './radiobutton-question.component.html',
  styleUrls: ['./radiobutton-question.component.css']
})
export class RadiobuttonQuestionComponent extends BaseQuestion implements OnInit {

  constructor(private service: QuestionsService) {
    super(service);
  }

  private radiobuttonQuestion: RadiobuttonQuestion;

  public verifyDisabled() {
    if (this.radiobuttonQuestion.answer && this.radiobuttonQuestion.answer !== 'Other') {
      this.disabled = false;
    } else if (this.radiobuttonQuestion.answer === 'Other' && this.radiobuttonQuestion.otherAnswer) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  ngOnInit() {
    this.radiobuttonQuestion = this.question as RadiobuttonQuestion;
    super.ngOnInit();
  }


  public submit() {
    if (this.disabled) {
      return;
    }
    if (this.radiobuttonQuestion.variable) {
      this.form.variables[this.radiobuttonQuestion.variable] = this.radiobuttonQuestion.answer;
    }

    if (this.radiobuttonQuestion.nextQuestionId) {
      this.form.currentQuestionId = this.radiobuttonQuestion.nextQuestionId;
    } else {
      this.form.currentQuestionId =
        this.radiobuttonQuestion.nextQuestions[this.radiobuttonQuestion.options.indexOf(
          this.radiobuttonQuestion.options.find(e => e.key === this.radiobuttonQuestion.answer))];
    }
    super.submit();
  }
}
