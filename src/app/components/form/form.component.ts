import { Component, OnInit } from '@angular/core';
import 'hammerjs';
import { Question, QuestionType, Form } from '../../models/question';
import { QuestionsService } from '../../services/questions.service';
import { randexp } from 'RandExp';
import { ActivatedRoute, Router } from '@angular/router';
import SignaturePad from 'signature_pad';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: Form;
  currentQuestion: Question;
  QuestionType: any = QuestionType;
  disabled = true;
  localStorage = window.localStorage;
  otherAnswer: string;
  formId: number;
  formVersion: string;
  signaturePad: SignaturePad;
  data = [{}];

  constructor(private questionsService: QuestionsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.formId = Number(params.get('id'));
      if (this.formId) {
        this.loadQuestions();
      } else {
        this.router.navigate(['./']);
      }
    });

  }
  loadQuestions() {
    const jsonObject = this.localStorage.getItem('form: ' + this.formId);
    if (jsonObject) {
      this.form = JSON.parse(jsonObject);
    } else {
      this.form = this.questionsService.getFormById(this.formId);
      this.localStorage.setItem('form: ' + this.formId, JSON.stringify(this.form));
    }
    this.currentQuestion = this.form.questions.find(e => e.id === this.form.currentQuestionId);
  }


  public resetForm() {
    this.localStorage.removeItem('form: ' + this.formId);
    this.form = this.questionsService.getFormById(this.formId);
    if (!this.form) {
      this.router.navigate(['./']);
    }
    window.location.reload();
  }

  public updateQuestion = (question) => {
    this.data = [{}];
    this.currentQuestion = question;
  }




  // public initalizeSignaturePad(field) {
  //   if (this.signaturePad) {
  //     return;
  //   }
  //   const pad = document.querySelector('canvas');
  //   this.signaturePad = new SignaturePad(pad, {
  //     backgroundColor: 'rgba(255, 255, 255, 0)',
  //     penColor: 'rgb(0, 0, 0)',
  //     onEnd: () => this.updateFormSignature(field)
  //   });
  //   if (field.answer) {
  //     this.signaturePad.fromData(field.answer);
  //   }
  //   const clearButton = document.getElementById('clear');

  //   clearButton.addEventListener('click', (event) => {
  //     this.signaturePad.clear();
  //     delete field.answer;
  //     this.disabled = true;
  //   });
  // }

  // updateFormSignature(field) {
  //   field.answer = this.signaturePad.toData();
  //   this.verifyDisabled();
  // }

  // public verifyDisabled() {
  //   if (this.currentQuestion.type === QuestionType.Textual || this.currentQuestion.type === QuestionType.Dropdown) {
  //     if (!this.currentQuestion.answer) {
  //       this.disabled = true;
  //     } else if (this.currentQuestion.validation &&
  //       !new RegExp(this.currentQuestion.validation).test(this.currentQuestion.answer)) {
  //       this.disabled = true;
  //     } else {
  //       this.disabled = false;
  //     }
  //   } else if (this.currentQuestion.type === QuestionType.Radiobutton || this.currentQuestion.type === QuestionType.RadioButtonWithImages
  //     || this.currentQuestion.type === QuestionType.Buttons) {
  //     if (this.currentQuestion.answer && this.currentQuestion.answer !== 'Other') {
  //       this.disabled = false;
  //     } else if (this.currentQuestion.answer === 'Other' && this.currentQuestion.otherAnswer) {
  //       this.disabled = false;
  //     } else {
  //       this.disabled = true;
  //     }
  //   } else if (this.currentQuestion.type === QuestionType.Checkbox || this.currentQuestion.type === QuestionType.Checkbox) {
  //     if (this.currentQuestion.answers && this.currentQuestion.answers.length > 0) {
  //       this.disabled = false;
  //     } else {
  //       this.disabled = true;
  //     }
  //   } else if (this.currentQuestion.type === QuestionType.Form) {
  //     // tslint:disable-next-line:forin
  //     // tslint:disable-next-line:prefer-const
  //     for (let propertyName in this.currentQuestion.fields) {
  //       if (!this.currentQuestion.fields[propertyName].answer) {
  //         this.disabled = true;
  //         return;
  //       }
  //     }
  //     this.disabled = false;

  //   } else {
  //     this.disabled = true;
  //   }
  // }

  // public addNewQuestion() {
  //   if (this.disabled) {
  //     return;
  //   }

  //   const fields = this.currentQuestion.fields.map(element => {
  //     return { ...element };
  //   });
  //   const newQuestion = { ...this.currentQuestion };

  //   newQuestion.fields = fields;
  //   // tslint:disable-next-line:prefer-const
  //   // tslint:disable-next-line:forin
  //   for (const propertyName in newQuestion.fields) {
  //     delete newQuestion.fields[propertyName].answer;
  //   }
  //   const id = Math.random() * 1000;
  //   this.currentQuestion.nextQuestionId = id;
  //   newQuestion.id = id;
  //   newQuestion.options = { ...newQuestion.options, removable: true };

  //   this.form.questions.push(newQuestion);
  //   this.submit();
  // }

  // public RemoveQuestion() {
  //   if (!this.currentQuestion.options || !this.currentQuestion.options.removable) {
  //     return;
  //   }

  //   const index = this.form.questions.indexOf(this.currentQuestion);
  //   this.form.currentQuestionId = this.currentQuestion.previousQuestionId;
  //   this.currentQuestion = this.form.questions.find(e => e.id === this.form.currentQuestionId);

  //   this.currentQuestion.nextQuestionId = this.form.questions[index].nextQuestionId;
  //   this.form.questions.splice(index, 1);

  //   this.replaceVariables();
  //   this.filterVariables();
  //   this.verifyDisabled();

  //   this.localStorage.setItem('form: ' + this.formId, JSON.stringify(this.form));
  // }

  // public navigateTo(question) {
  //   this.form.currentQuestionId = this.form.firstQuestionId;
  //   this.currentQuestion = this.form.questions.find(e => e.id === this.form.currentQuestionId);

  //   while (this.currentQuestion.id !== question.id) {
  //     if (this.currentQuestion.type === QuestionType.Textual) {
  //       if (this.currentQuestion.validation) {
  //         this.currentQuestion.answer = randexp(this.currentQuestion.validation);
  //       } else {
  //         this.currentQuestion.answer = 'PlaceHolder';
  //       }
  //     } else if (this.currentQuestion.type === QuestionType.Checkbox
  //       || this.currentQuestion.type === QuestionType.Checkbox) {
  //       this.currentQuestion.nextQuestions = [];
  //       this.currentQuestion.fields.forEach(field => this.currentQuestion.nextQuestions.push(field.nextQuestionId));
  //     } else if (this.currentQuestion.type === QuestionType.Radiobutton
  //       || this.currentQuestion.type === QuestionType.RadioButtonWithImages) {
  //       if (!this.currentQuestion.nextQuestionId && this.currentQuestion.nextQuestions.indexOf(question.id) >= 0) {
  //         this.currentQuestion.answer = this.currentQuestion.fields[this.currentQuestion.nextQuestions.indexOf(question.id)];
  //       } else {
  //         this.currentQuestion.answer = this.currentQuestion.fields[0];
  //       }
  //     } else if (this.currentQuestion.type === QuestionType.Form) {
  //       this.currentQuestion.fields.forEach(field => {
  //         if (field.validation) {
  //           field.answer = randexp(field.validation);
  //         } else {
  //           field.answer = 'PlaceHolder';
  //         }
  //       });
  //     } else if (this.currentQuestion.type === QuestionType.Dropdown) {
  //       this.currentQuestion.answer = this.currentQuestion.options.list[0];
  //     }
  //     this.disabled = false;
  //     this.submit();
  //   }
  // }

  // public submit(choice?) {
  //   if (choice) {
  //     this.currentQuestion.answer = choice;
  //   } else if (this.disabled) {
  //     return;
  //   }

  //   if (this.currentQuestion.variable) {
  //     if (this.currentQuestion.type === QuestionType.Checkbox || this.currentQuestion.type === QuestionType.Checkbox) {
  //       this.currentQuestion.fields.forEach(element => {
  //         this.form.variables[this.currentQuestion.variable + '#' + element.nextQuestionId] = element.text;
  //       });
  //     } else {
  //       this.form.variables[this.currentQuestion.variable] = this.currentQuestion.answer;
  //     }
  //   }
  //   if (this.currentQuestion.nextQuestions && this.currentQuestion.type === QuestionType.Checkbox) {
  //     this.form.currentQuestions = [...this.currentQuestion.nextQuestions];
  //   }
  //   if (this.form.currentQuestions && this.form.currentQuestions.length) {
  //     this.form.currentQuestionId = this.form.currentQuestions.pop();
  //   } else if (this.currentQuestion.nextQuestionId) {
  //     this.form.currentQuestionId = this.currentQuestion.nextQuestionId;
  //   } else if (this.currentQuestion.nextQuestions) {
  //     if (this.currentQuestion.type === QuestionType.Radiobutton || this.currentQuestion.type === QuestionType.RadioButtonWithImages
  //       || this.currentQuestion.type === QuestionType.Buttons) {
  //    this.form.currentQuestionId = this.currentQuestion.nextQuestions[this.currentQuestion.fields.indexOf(this.currentQuestion.answer)];
  //     }
  //   } else {
  //     if (this.currentQuestion.answer === 'Yes') {
  //       this.questionsService.submitForm(this.form);
  //     }
  //     delete this.currentQuestion;
  //     return;
  //   }
  //   if (this.currentQuestion.type === QuestionType.Form) {
  //     delete this.signaturePad;
  //   }
  //   const previousQuestionId = this.currentQuestion.id;
  //   this.currentQuestion = this.form.questions.find(e => e.id === this.form.currentQuestionId);
  //   this.currentQuestion.previousQuestionId = previousQuestionId;
  //   this.replaceVariables();
  //   this.filterVariables();
  //   this.verifyDisabled();

  //   this.localStorage.setItem('form: ' + this.formId, JSON.stringify(this.form));
  // }
  // public filterVariables() {
  //   if (this.currentQuestion.type === QuestionType.Dropdown) {
  //     if (!this.currentQuestion.answer) {
  //       this.currentQuestion.answer = '';
  //     }
  //     if (this.currentQuestion.options.filter) {
  //       this.currentQuestion.options.list =
  //         this.currentQuestion.fields.filter(e => e.key === this.form.variables[this.currentQuestion.options.filter])
  //           .map(e => e.text);
  //     }
  //   }
  // }

  // public back() {
  //   this.form.currentQuestionId = this.currentQuestion.previousQuestionId;
  //   this.currentQuestion = this.form.questions.find(e => e.id === this.form.currentQuestionId);
  //   this.verifyDisabled();
  //   if (this.currentQuestion.type === QuestionType.Form) {
  //     delete this.signaturePad;
  //   }
  //   this.localStorage.setItem('form: ' + this.formId, JSON.stringify(this.form));
  // }

  // public checkBoxChanged(checked, choice) {
  //   if (checked) {
  //     if (this.currentQuestion.answers) {
  //       this.currentQuestion.answers.push(choice.text);
  //       this.currentQuestion.nextQuestions.push(choice.nextQuestionId);
  //     } else {
  //       this.currentQuestion.answers = [choice.text];
  //       this.currentQuestion.nextQuestions = [choice.nextQuestionId];
  //     }
  //   } else {
  //     this.currentQuestion.answers.splice(this.currentQuestion.answers.indexOf(choice.text), 1);
  //     this.currentQuestion.nextQuestions.splice(this.currentQuestion.nextQuestions.indexOf(choice.nextQuestionId), 1);
  //   }

  //   this.verifyDisabled();
  // }

  // private replaceVariables() {
  //   this.currentQuestion.questionTextReplaced = this.currentQuestion.questionText;
  //   const arr = this.currentQuestion.questionTextReplaced.split('[');
  //   for (let index = 1; index < arr.length; index++) {
  //     const variable = arr[index].split(']')[0];
  //     this.currentQuestion.questionTextReplaced =
  //       this.currentQuestion.questionTextReplaced.replace('[' + variable + ']', this.form.variables[variable]);
  //   }
  // }
}
