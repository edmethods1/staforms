import { Component, OnInit } from '@angular/core';
import { BaseQuestion } from '../BaseQuestion';
import { CheckboxQuestion, QuestionType } from '../../../models/question';
import { QuestionsService } from '../../../services/questions.service';

@Component({
  selector: 'app-checkbox-question',
  templateUrl: './checkbox-question.component.html',
  styleUrls: ['./checkbox-question.component.css']
})
export class CheckboxQuestionComponent extends BaseQuestion implements OnInit {

  constructor(private service: QuestionsService) {
    super(service);
  }

  private checkboxQuestion: CheckboxQuestion;

  public checkBoxChanged(checked, choice) {
    if (checked) {
      if (this.checkboxQuestion.answers) {
        this.checkboxQuestion.answers.push(choice);
        this.checkboxQuestion.nextQuestions.push(choice.nextQuestionId);
      } else {
        this.checkboxQuestion.answers = [choice];
        this.checkboxQuestion.nextQuestions = [choice.nextQuestionId];
      }
    } else {
      this.checkboxQuestion.answers.splice(this.checkboxQuestion.answers.indexOf(choice), 1);
      this.checkboxQuestion.nextQuestions.splice(this.checkboxQuestion.nextQuestions.indexOf(choice.nextQuestionId), 1);
    }
    this.verifyDisabled();
  }

  public verifyDisabled() {
    if (this.checkboxQuestion.answers && this.checkboxQuestion.answers.length > 0) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  ngOnInit() {
    this.checkboxQuestion = this.question as CheckboxQuestion;
    super.ngOnInit();
  }


  public submit() {
    if (this.disabled) {
      return;
    }
    if (this.checkboxQuestion.variable) {
      this.form.variables[this.checkboxQuestion.variable] = this.checkboxQuestion.answer;
    }

    if (this.checkboxQuestion.nextQuestionId) {
      this.form.currentQuestionId = this.checkboxQuestion.nextQuestionId;
    } else {
      this.form.currentQuestions = [...this.checkboxQuestion.nextQuestions];
    }
    super.submit();
  }
}
