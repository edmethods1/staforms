import { Component, OnInit } from '@angular/core';
import { BaseQuestion } from '../BaseQuestion';
import { AutocompleteQuestion, QuestionType } from '../../../models/question';
import { QuestionsService } from '../../../services/questions.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-question',
  templateUrl: './autocomplete-question.component.html',
  styleUrls: ['./autocomplete-question.component.css']
})
export class AutocompleteQuestionComponent extends BaseQuestion implements OnInit {

  private autocompleteQuestion: AutocompleteQuestion;
  filteredOptions: Observable<any[]>;
  myControl = new FormControl();
  constructor(private service: QuestionsService) {
    super(service);
  }

  public verifyDisabled() {
    if (!this.autocompleteQuestion.answer
      || !this.autocompleteQuestion.options.filter(e => e.value.toString() === this.autocompleteQuestion.answer.toString()).length) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  ngOnInit() {
    this.autocompleteQuestion = this.question as AutocompleteQuestion;
    if (this.autocompleteQuestion.optionsGetter) {
      if (this.autocompleteQuestion.optionsGetter.variable) {
        this.autocompleteQuestion.options = this.getVariable(this.autocompleteQuestion.optionsGetter.variable);
      } else {
        const url = this.replaceBrackets(this.autocompleteQuestion.optionsGetter.url);
        this.service.getData(url).subscribe(res => {
          this.autocompleteQuestion.options = JSON.parse(res._body).map(o => {
            return { key: o[Object.keys(o)[0]], value: o[Object.keys(o)[0]] };
          });  // TODO move the mapping to the backend
        });
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(option => option ? this._filter(option) : this.autocompleteQuestion.options.slice())
          );
      }
    }
    super.ngOnInit();
  }

  private _filter(value: string) {
    const filterValue = value.toString().toLowerCase();

    return this.autocompleteQuestion.options.filter(state => state.value.toString().toLowerCase().indexOf(filterValue) === 0);
  }

  public submit() {
    if (this.disabled) {
      return;
    }
    if (this.autocompleteQuestion.variable) {
      this.form.variables[this.autocompleteQuestion.variable] = this.autocompleteQuestion.answer;
    }
    this.form.currentQuestionId = this.autocompleteQuestion.nextQuestionId;
    super.submit();
  }
}
