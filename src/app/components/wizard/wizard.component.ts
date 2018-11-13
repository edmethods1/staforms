import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  public forms: any;
  constructor(private questionsService: QuestionsService, private router: Router) { }

  ngOnInit() {
    this.forms = this.questionsService.getFormsList();
  }

  public formSelect(form) {
    this.router.navigate(['./form/' + form.id]);
  }

}
