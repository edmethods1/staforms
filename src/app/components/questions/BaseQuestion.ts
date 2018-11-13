import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Question, QuestionType, Form } from '../../models/question';
import { QuestionsService } from '../../services/questions.service';

export abstract class BaseQuestion implements OnInit {
  @Input() form: Form;
  @Input() question: Question;
  @Input() disabled: boolean;
  @Input() updateQuestion: any;
  localStorage = window.localStorage;

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.submit();
    }
  }


  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    this.replaceVariables();
    this.verifyDisabled();
  }

  public abstract verifyDisabled();

  public submit() {
    if (this.question.actionOnSubmit) {
      this.actionOnSubmit();
    } else {
      this.updateCurrentQuestion();
    }
  }

  private updateCurrentQuestion() {
    const previousQuestionId = this.question.id;
    if (this.form.currentQuestions && this.form.currentQuestions.length) {
      this.form.currentQuestionId = this.form.currentQuestions.pop();
    }
    this.question = this.form.questions.find(e => e.id === this.form.currentQuestionId);
    this.question.previousQuestionId = previousQuestionId;

    this.localStorage.setItem('form: ' + this.form.id, JSON.stringify(this.form));
    this.updateQuestion(this.form.questions.find(e => e.id === this.form.currentQuestionId));

  }

  private actionOnSubmit() {
    if (this.question.actionOnSubmit.request) {
      const url = this.replaceBrackets(this.question.actionOnSubmit.request.url);
      this.questionsService.getData(url).subscribe((res) => {
        this.form.variables[this.question.actionOnSubmit.request.variable] = JSON.parse(res._body);
        this.updateCurrentQuestion();
      });
    } // TODO: add other actions
  }

  public back() {
    this.form.currentQuestionId = this.question.previousQuestionId;
    this.question = this.form.questions.find(e => e.id === this.form.currentQuestionId);
    this.localStorage.setItem('form: ' + this.form.id, JSON.stringify(this.form));
    this.updateQuestion(this.form.questions.find(e => e.id === this.form.currentQuestionId));
  }


  public getVariable(variableName: string): any {
    const arr = variableName.split('.');
    let variable = this.form.variables;
    for (let index = 0; index < arr.length; index++) {
      if (variable[arr[index]]) {
        variable = variable[arr[index]];
      } else {
        return '';
      }
    }
    return variable;
  }

  public replaceBrackets(text: string): string {
    const arr = text.split('[');
    for (let index = 1; index < arr.length; index++) {
      const variable = arr[index].split(']')[0];
      text = text.replace('[' + variable + ']', this.getVariable(variable));
    }
    return text;
  }

  public replaceVariables() {
    this.question.questionTextReplaced =
      this.replaceBrackets(this.question.questionText);
  }
}
