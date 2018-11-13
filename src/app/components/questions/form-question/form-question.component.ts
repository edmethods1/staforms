import { Component, OnInit } from '@angular/core';
import { BaseQuestion } from '../BaseQuestion';
import { FormQuestion, QuestionType } from '../../../models/question';
import { QuestionsService } from '../../../services/questions.service';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent extends BaseQuestion implements OnInit {

  constructor(private service: QuestionsService) {
    super(service);
  }

  private formQuestion: FormQuestion;
  signaturePad: SignaturePad;

  public initalizeSignaturePad(field) {
    if (this.signaturePad) {
      return;
    }
    const pad = document.querySelector('canvas');
    this.signaturePad = new SignaturePad(pad, {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      penColor: 'rgb(0, 0, 0)',
      onEnd: () => this.updateFormSignature(field)
    });
    if (field.answer) {
      this.signaturePad.fromData(field.answer);
    }
    const clearButton = document.getElementById('clear');

    clearButton.addEventListener('click', (event) => {
      this.signaturePad.clear();
      delete field.answer;
      this.disabled = true;
    });
  }

  updateFormSignature(field) {
    field.answer = this.signaturePad.toData();
    this.verifyDisabled();
  }

  public verifyDisabled() {
    // tslint:disable-next-line:forin
    // tslint:disable-next-line:prefer-const
    for (let propertyName in this.formQuestion.fields) {
      if (!this.formQuestion.fields[propertyName].answer) {
        this.disabled = true;
        return;
      }
    }
    this.disabled = false;
  }

  ngOnInit() {
    this.formQuestion = this.question as FormQuestion;
    super.ngOnInit();
  }

  public addNewQuestion() {
    if (this.disabled) {
      return;
    }

    const fields = this.formQuestion.fields.map(element => {
      return { ...element };
    });
    const newQuestion = { ...this.formQuestion };

    newQuestion.fields = fields;
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:forin
    for (const propertyName in newQuestion.fields) {
      delete newQuestion.fields[propertyName].answer;
    }
    const id = Math.random() * 1000;
    this.formQuestion.nextQuestionId = id;
    newQuestion.id = id;
    newQuestion.options = { ...newQuestion.options, removable: true };

    this.form.questions.push(newQuestion);
    this.submit();
  }

  public removeQuestion() {
    if (!this.formQuestion.options || !this.formQuestion.options.removable) {
      return;
    }

    const index = this.form.questions.indexOf(this.formQuestion);
    this.form.currentQuestionId = this.formQuestion.previousQuestionId;
    const newQuestion = this.form.questions.find(e => e.id === this.form.currentQuestionId) as FormQuestion;

    newQuestion.nextQuestionId = (this.form.questions[index] as FormQuestion).nextQuestionId;
    this.form.questions.splice(index, 1);

    this.replaceVariables();
    this.verifyDisabled();
    this.updateQuestion(newQuestion);
  }

  public submit() {
    if (this.disabled) {
      return;
    }
    if (this.formQuestion.variable) {
      this.form.variables[this.formQuestion.variable] = this.formQuestion.answer;
    }
    this.form.currentQuestionId = this.formQuestion.nextQuestionId;
    super.submit();
  }
}
