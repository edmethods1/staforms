import { Component, OnInit } from '@angular/core';
import { BaseQuestion } from '../BaseQuestion';
import { ButtonsQuestion, QuestionType } from '../../../models/question';
import { QuestionsService } from '../../../services/questions.service';

@Component({
  selector: 'app-buttons-question',
  templateUrl: './buttons-question.component.html',
  styleUrls: ['./buttons-question.component.css']
})
export class ButtonsQuestionComponent extends BaseQuestion implements OnInit {

  constructor(private service: QuestionsService) {
    super(service);
  }

  private buttonsQuestion: ButtonsQuestion;

  public verifyDisabled() {
    if (this.buttonsQuestion.answer) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  ngOnInit() {
    this.buttonsQuestion = this.question as ButtonsQuestion;
    super.ngOnInit();
  }


  public submit(choice?) {
    if (choice) {
      this.buttonsQuestion.answer = choice.key;
    } else if (this.disabled) {
      return;
    }
    if (this.buttonsQuestion.variable) {
      this.form.variables[this.buttonsQuestion.variable] = this.buttonsQuestion.answer;
    }

    if (this.buttonsQuestion.nextQuestionId) {
      this.form.currentQuestionId = this.buttonsQuestion.nextQuestionId;
    } else if (this.buttonsQuestion.nextQuestions && this.buttonsQuestion.nextQuestions.length) {
      this.form.currentQuestionId =
        this.buttonsQuestion.nextQuestions[this.buttonsQuestion.options.indexOf(
          this.buttonsQuestion.options.find(e => e.key === this.buttonsQuestion.answer))];
    }
    if (!this.buttonsQuestion.nextQuestionId && !this.buttonsQuestion.nextQuestions) {
      if (this.buttonsQuestion.answer === 'Yes') {
        this.service.submitForm(this.form);
      }
      delete this.question;
      this.updateQuestion();
    } else {
      super.submit();
    }
  }
}
