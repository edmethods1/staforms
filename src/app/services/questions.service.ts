import { Injectable } from '@angular/core';
import { Form, QuestionType, ResponseType } from '../models/question';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Guid } from 'guid-typescript';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import config from '../config.js';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: Http, private deviceService: DeviceDetectorService) { }

  private forms = [
    {
    id: 1,
    finalMessage: 'Thanks for taking the survey',
    firstQuestionId: 1,
    formTitle: 'Testing MVP #1',
    formVersion: '.01',
    backgroundUrl: '../assets/background.jpeg',
    currentQuestionId: 1,
    variables: {},
    questions:
      [
        {
          id: 1,
          questionText: 'Enter Your Name',
          validation: '^[a-zA-Z ]{1,10}$',
          type: QuestionType.Textual,
          variable: 'name',
          nextQuestionId: 2,
          notes: 'Please Provide your full legal name'
        }, {
          id: 2,
          questionText: 'Welcome [name], what state do you live in?',
          type: QuestionType.Radiobutton,
          fields: ['New York', 'California', 'Texas'],
          variable: 'state',
          nextQuestionId: 12
        }, {
          id: 12,
          questionText: 'What county do you live in?',
          type: QuestionType.Autocomplete,
          fields: [{ key: 'New York', text: 'Yonkers' }, { key: 'New York', text: 'Broome' }, { key: 'New York', text: 'Suffok' },
          { key: 'California', text: 'LA' }, { key: 'California', text: 'SD' }, { key: 'California', text: 'SF' },
          { key: 'Texas', text: 'Houston' }, { key: 'Texas', text: 'Dallas' }, { key: 'Texas', text: 'Austin' }
          ],
          nextQuestionId: 3,
          options: { filter: 'state', list: ['Texas', 'state4', 'state5'] }
        }, {
          id: 3,
          questionText: 'What do you like?',
          type: QuestionType.Radiobutton,
          fields: ['Cookies ', 'Ice cream'],
          nextQuestions: [4, 5],
          notes: 'We might give you something to eat, so choose carefully :D'
        }, {
          id: 4,
          questionText: 'Great: What is your favorite cookie?',
          type: QuestionType.Radiobutton,
          fields: ['Oreos', 'Chips Ahoy', 'Other'],
          nextQuestionId: 6
        }, {
          id: 5,
          questionText: 'Great, What is your favorite flavor?',
          type: QuestionType.Radiobutton,
          fields: ['Vanilla', 'Chocolate', 'Other'],
          nextQuestionId: 6
        }, {
          id: 6,
          questionText: 'What are you favorite movie Genres?',
          type: QuestionType.Checkbox,
          fields: [
            {
              text: 'Horror',
              url: '../../assets/horror.jpg',
              nextQuestionId: 7
            }, {
              text: 'Comedy',
              url: '../../assets/comedy.jpg',
              nextQuestionId: 8
            }, {
              text: 'Romantic',
              url: '../../assets/romance.jpg',
              nextQuestionId: 9
            }
          ],
          variable: 'genre'
        }, {
          id: 7,
          questionText: 'Is Boris Karlov your favorite actor? {[genre#7]}',
          type: QuestionType.Radiobutton,
          fields: ['Yes', 'No'],
          nextQuestionId: 10
        }, {
          id: 8,
          questionText: 'Is Adam Sander funnier than David Spade? {[genre#8]}',
          type: QuestionType.Radiobutton,
          fields: ['Yes', 'No'],
          nextQuestionId: 10
        }, {
          id: 9,
          questionText: 'Team Pitt or Team Clooney? {[genre#9]}',
          type: QuestionType.Radiobutton,
          fields: ['Team Pitt', 'Team Cooney', 'Other'],
          nextQuestionId: 10
        }, {
          id: 10,
          questionText: 'What is your favorite movie?',
          type: QuestionType.Form,
          fields: [
            {
              label: 'Movie Name'
            }, {
              label: 'Movie Genere'
            }, {
              label: 'Date Released',
              type: 'date'
            }
          ],
          nextQuestionId: 11
        }, {
          id: 11,
          questionText: 'Did you enjoy taking this survey?',
          type: QuestionType.Buttons,
          fields: ['Yes', 'No']
        }
      ]
  },
  {
    id: 2,
    finalMessage: 'Thanks for completing the demonstration',
    firstQuestionId: 1,
    formTitle: 'Demonstration of Features',
    formVersion: '.01',
    backgroundUrl: '../assets/background.jpeg',
    currentQuestionId: 1,
    variables: {},
    questions:
      [
        {
          id: 1,
          questionText: 'Enter Your Name',
          validation: '^[a-zA-Z ]{1,10}$',
          type: QuestionType.Textual,
          variable: 'name',
          nextQuestionId: 2,
          notes: 'This wizard will guide you through a demonstration of the features.  <br/> This text is the first feature, it is a section that is optional and can be used to provide more details about the question.  This also starts the feature called variable substitution.  The value you enter here can be used in any of the following questions.  This also shows the validation feature, where the input can be validated.'
        }, {
          id: 2,
          questionText: 'Welcome [name], what state do you live in?',
          type: QuestionType.Radiobutton,
          fields: ['New York', 'California', 'Texas'],
          variable: 'state',
          nextQuestionId: 12,
          notes: 'Notice the value you entered in the prior question is included in this question.  This step shows a Radio Button control with a single select option.'
        }, {
          id: 12,
          questionText: 'What county do you live in?',
          type: QuestionType.Autocomplete,
          fields: [{ key: 'New York', text: 'Yonkers' }, { key: 'New York', text: 'Broome' }, { key: 'New York', text: 'Suffok' },
          { key: 'California', text: 'LA' }, { key: 'California', text: 'SD' }, { key: 'California', text: 'SF' },
          { key: 'Texas', text: 'Houston' }, { key: 'Texas', text: 'Dallas' }, { key: 'Texas', text: 'Austin' }
          ],
          nextQuestionId: 3,
          options: { filter: 'state', list: ['Texas', 'state4', 'state5'] },
          notes: 'This is a filter feature.  Depending on the state you selected, this list is filtered to only list values pertinent to that state'
        }, {
          id: 3,
          questionText: 'Each of these choices will be followed by a different question.  AKA: Conditional Logic.  Select one, then use the back arrow to come back and select the other.',
          type: QuestionType.Radiobutton,
          fields: ['Cookies ', 'Ice cream'],
          nextQuestions: [4, 5],
          notes: 'You can always move back and foward in the form with the arrows below the question'
        }, {
          id: 4,
          questionText: 'Great: What is your favorite cookie?',
          type: QuestionType.Radiobutton,
          fields: ['Oreos', 'Chips Ahoy', 'Other'],
          nextQuestionId: 6
        }, {
          id: 5,
          questionText: 'Great, What is your favorite flavor?',
          type: QuestionType.Radiobutton,
          fields: ['Vanilla', 'Chocolate', 'Other'],
          nextQuestionId: 6
        }, {
          id: 6,
          questionText: 'What are you favorite movie Genres?',
          type: QuestionType.Checkbox,
          fields: [
            {
              text: 'Horror',
              url: '../../assets/horror.jpg',
              nextQuestionId: 7
            }, {
              text: 'Comedy',
              url: '../../assets/comedy.jpg',
              nextQuestionId: 8
            }, {
              text: 'Romantic',
              url: '../../assets/romance.jpg',
              nextQuestionId: 9
            }
          ],
          variable: 'genre',
          notes: 'This is a Multi-Select checkbox with images.  You can select one or more items, and each item shows different question(s) via conditional logic.'
        }, {
          id: 7,
          questionText: 'Is Boris Karlov your favorite actor? {Horror}',
          type: QuestionType.Radiobutton,
          fields: ['Yes', 'No'],
          nextQuestionId: 10
        }, {
          id: 8,
          questionText: 'Is Adam Sander funnier than David Spade? {Comedy}',
          type: QuestionType.Radiobutton,
          fields: ['Yes', 'No'],
          nextQuestionId: 10
        }, {
          id: 9,
          questionText: 'Team Pitt or Team Clooney? {Romantic}',
          type: QuestionType.Radiobutton,
          fields: ['Team Pitt', 'Team Cooney', 'Other'],
          nextQuestionId: 10
        }, {
          id: 10,
          questionText: 'What is your favorite movie?',
          type: QuestionType.Form,
          fields: [
            {
              label: 'Movie Name'
            }, {
              label: 'Movie Genere'
            }, {
              label: 'Date Released',
              type: 'date'
            }
          ],
          nextQuestionId: 13,
          notes: 'Multi-Add feature.  You can add multiple records per question.  Click on the + below to add a second answer to the question.  Use the - button to remove and answer.'
        }, {
          id: 13,
          questionText: 'Sign the form?',
          type: QuestionType.Form,
          fields: [
            {
              label: 'Name'
            }, {
              label: 'Date',
              type: 'date'
            }, {
              label: 'Signature',
              type: 'signature',
            }
          ],
          nextQuestionId: 11,
        },
        {
          id: 11,
          questionText: 'Did you enjoy taking this survey?',
          type: QuestionType.Radiobutton,
          fields: ['Yes', 'No'],
          notes: 'At the end of the wizard, the data is saved to the database.'
        }
      ]
  },
  {
    id: 3,
    finalMessage: 'Thanks for taking the survey',
    firstQuestionId: 1,
    formTitle: 'Safety Perception Survey',
    backgroundUrl: '../assets/background.jpeg',
    formVersion: '.01',
    currentQuestionId: 1,
    variables: {},
    questions:
      [
        {
          id: 1,
          questionText: 'Select a Language',
          type: QuestionType.Radiobutton,
          fields: ['English', 'Spanish'],
          nextQuestions: [2, 200],
          notes: 'The safety perception survey is a tool used to measure project safety status. Craft workers are given the opportunity to rate the safety program, which allows management the opportunity to improve on poorly rated areas. The survey consists of 26 questions. It is anonymous. La encuesta de percepcion de seguidad es una herramienta que se utiliza para medir el estado de seguridad del proyecto. Trabajadores de la construccion se les da la oportunidad de evaluar el programa de seguridad. Esto permite que la gestion se le de oportunidad de mejorar en areas valoradas. La encuestra incluye 26 preguntas'
        }, {
          id: 2,
          questionText: '1. What is your employee type?',
          type: QuestionType.Radiobutton,
          fields: ['Staff', 'Craft', 'Contractor', 'Joint Venture Self Perform', 'Joint Venture Contractor'],
          variable: 'employeeType',
          nextQuestionId: 3,
        }, {
          id: 3,
          questionText: '2. The site safety orientation / induction training provides adequate information for me to understand site safety rules. safely.',
          type: QuestionType.Radiobutton,
          fields: ['1 - Strongly Agree', '2', '3', '4', '5 - Strongly Disagree'],
          nextQuestionId: 4,
        },
        {
          id: 4,
          questionText: '20. Site HSE professionals are visible, knowledgeable and helpful with addressing safety issues.',
          type: QuestionType.Radiobutton,
          fields: ['1 - Strongly Agree', '2', '3', '4', '5 - Strongly Disagree'],
          nextQuestionId: 5,
        },
        {
          id: 5,
          questionText: '21.  Site supervision (foreman, general foreman, superintendents) follow and enforce site safety rules. ',
          type: QuestionType.Radiobutton,
          fields: ['1 - Strongly Agree', '2', '3', '4', '5 - Strongly Disagree'],
          nextQuestionId: 6,
        },
        {
          id: 6,
          questionText: '26. Workers are recognized for working safely. ',
          type: QuestionType.Radiobutton,
          fields: ['1 - Strongly Agree', '2', '3', '4', '5 - Strongly Disagree'],
          nextQuestionId: 7,
        },
        {
          id: 7,
          questionText: 'Any Comments? ',
          type: QuestionType.Textual,


        },
        {
          id: 200,
          questionText: 'Tipo de Empleado',
          type: QuestionType.Radiobutton,
          fields: ['Personal ', 'Obreros', 'Contratista', 'Personal Directo de Empresa Conjunta ', 'Contratista de Empresa Conjunta '],
          nextQuestionId: 201,
        },
        {
          id: 201,
          questionText: '1. La inducción de seguridad proporciona la información adecuada para que entienda las reglas de seguridad de terreno.  ',
          type: QuestionType.Radiobutton,
          fields: ['1 - Strongly Agree', '2', '3', '4', '5 - Strongly Disagree'],
          nextQuestionId: 202,
        },
        {
          id: 202,
          questionText: 'Commentarios?  ',
          type: QuestionType.Textual,


        },
      ]
  },
  {
    id: 4,
    finalMessage: 'Thanks for taking the survey',
    firstQuestionId: 1,
    formTitle: 'Testing New Structure',
    backgroundUrl: '../assets/background.jpeg',
    formVersion: '.01',
    currentQuestionId: 1,
    variables: {},
    questions:
      [
        {
          id: 1,
          questionText: 'What is your hard hat number',
          type: QuestionType.Autocomplete,
          variable: 'hardhatnumber',
          options: [],
          optionsGetter: {
            url: 'craftperson?h={"$fields": {"hardhatnumber": 1} }',
          },
          nextQuestionId: 2,
          notes: 'Please Provide your hard hat number',
          actionOnSubmit: {
            request: {
              url: 'craftperson?q={"hardhatnumber":"[hardhatnumber]"}',
              variable: 'craftperson'
            }
          }
        },
        {
          id: 2,
          questionText: 'Craft Person Details',
          type: QuestionType.Static,
          variable: 'craftperson',
          nextQuestionId: 3,
          notes: 'Notes'
        },
        {
          id: 3,
          questionText: 'You work for Company -  [craftperson.0.companyfk.0.Name]',
          type: QuestionType.Textual,
          variable: 'school',
          nextQuestionId: 4,
          isTextArea: true,
        }, {
          id: 4,
          questionText: 'What is your state',
          type: QuestionType.Autocomplete,
          variable: 'state',
          options: [],
          optionsGetter: {
            url: 'us-states?h={"$fields": {"state": 1} }',
          },
          nextQuestionId: 5,
        }, {
          id: 5,
          questionText: 'What is your county',
          type: QuestionType.Autocomplete,
          variable: 'county',
          options: [],
          optionsGetter: {
            url: 'us-state-counties?q={"state":"[state]"}&h={"$fields": {"county": 1} }',
          },
          nextQuestionId: 1,
        }
      ]
  },
  {
    id: 5,
    finalMessage: 'Thanks for completing the demonstration',
    firstQuestionId: 1,
    formTitle: 'Demonstration of Features #2',
    formVersion: '.01',
    backgroundUrl: '../assets/background.jpeg',
    currentQuestionId: 1,
    variables: {},
    questions:
      [
        {
          id: 1,
          questionText: 'What is your hard hat number',
          type: QuestionType.Autocomplete,
          variable: 'hardhatnumber',
          options: [],
          optionsGetter: {
            url: 'craftperson?h={"$fields": {"hardhatnumber": 1} }',
          },
          nextQuestionId: 2,
          notes: 'Please Provide your hard hat number',
          actionOnSubmit: {
            request: {
              url: 'craftperson?q={"hardhatnumber":"[hardhatnumber]"}',
              variable: 'craftperson'
            }
          }
        },
        {
          id: 2,
          questionText: 'Craft Person Details',
          type: QuestionType.Static,
          variable: 'craftperson',
          nextQuestionId: 14,
          notes: 'Notes'
        }, {
          id: 14,
          questionText: 'What is your state',
          type: QuestionType.Autocomplete,
          variable: 'state',
          options: [],
          optionsGetter: {
            url: 'us-states?h={"$fields": {"state": 1} }',
          },
          nextQuestionId: 15,
        }, {
          id: 15,
          questionText: 'What is your county',
          type: QuestionType.Autocomplete,
          variable: 'county',
          options: [],
          optionsGetter: {
            url: 'us-state-counties?q={"state":"[state]"}&h={"$fields": {"county": 1} }',
          },
          nextQuestionId: 3,
        }, {
          id: 3,
          questionText: 'Each of these choices will be followed by a different question.  AKA: Conditional Logic.  Select one, then use the back arrow to come back and select the other.',
          type: QuestionType.Radiobutton,
          options: [{ key: 'Cookies', value: 'Cookies' }, { key: 'Ice cream', value: 'Ice cream' }],
          nextQuestions: [4, 5],
          notes: 'You can always move back and foward in the form with the arrows below the question'
        }, {
          id: 4,
          questionText: 'Great: What is your favorite cookie?',
          type: QuestionType.Radiobutton,
          options: [{ key: 'Oreos', value: 'Oreos' }, { key: 'Chips Ahoy', value: 'Chips Ahoy' }, { key: 'Other', value: 'Other' }],
          nextQuestionId: 6
        }, {
          id: 5,
          questionText: 'Great, What is your favorite flavor?',
          type: QuestionType.Radiobutton,
          options: [{ key: 'Vanilla', value: 'Vanilla' }, { key: 'Chocolate', value: 'Chocolate' }, { key: 'Other', value: 'Other' }],
          nextQuestionId: 6
        }, {
          id: 6,
          questionText: 'What are you favorite movie Genres?',
          type: QuestionType.Checkbox,
          options: [
            {
              key: 'Horror',
              value: 'Horror',
              url: '../../assets/horror.jpg',
              nextQuestionId: 7
            }, {
              key: 'Comedy',
              value: 'Comedy',
              url: '../../assets/comedy.jpg',
              nextQuestionId: 8
            }, {
              key: 'Romantic',
              value: 'Romantic',
              url: '../../assets/romance.jpg',
              nextQuestionId: 9
            }
          ],
          variable: 'genre',
          notes: 'This is a Multi-Select checkbox with images.  You can select one or more items, and each item shows different question(s) via conditional logic.'
        }, {
          id: 7,
          questionText: 'Is Boris Karlov your favorite actor? {Horror}',
          type: QuestionType.Buttons,
          options: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
          nextQuestionId: 10
        }, {
          id: 8,
          questionText: 'Is Adam Sander funnier than David Spade? {Comedy}',
          type: QuestionType.Buttons,
          options: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
          nextQuestionId: 10
        }, {
          id: 9,
          questionText: 'Team Pitt or Team Clooney? {Romantic}',
          type: QuestionType.Radiobutton,
          options: [{ key: 'Team Pitt', value: 'Team Pitt' }, { key: 'Team Cooney', value: 'Team Cooney' }, { key: 'Other', value: 'Other' }],
          nextQuestionId: 10
        },
        {
          id: 10,
          questionText: 'What is your favorite movie?',
          type: QuestionType.Form,
          fields: [
            {
              label: 'Movie Name'
            }, {
              label: 'Movie Genere'
            }, {
              label: 'Date Released',
              type: 'date'
            }
          ],
          nextQuestionId: 13,
          notes: 'Multi-Add feature.  You can add multiple records per question.  Click on the + below to add a second answer to the question.  Use the - button to remove and answer.'
        }, {
          id: 13,
          questionText: 'Sign the form?',
          type: QuestionType.Form,
          fields: [
            {
              label: 'Name'
            }, {
              label: 'Date',
              type: 'date'
            }, {
              label: 'Signature',
              type: 'signature',
            }
          ],
          nextQuestionId: 11,
        },
        {
          id: 11,
          questionText: 'Did you enjoy taking this survey?',
          type: QuestionType.Buttons,
          options: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
          notes: 'At the end of the wizard, the data is saved to the database.'
        }
      ]
  }
  ];

  private headers = new Headers({
    'Content-Type': 'application/json',
    'x-apikey': '5bae9c02bd79880aab0a781f'
  });

  submitForm(form: Form) {
    const options = new RequestOptions({ headers: this.headers });
    const submissionForm = {
      'referenceId': Guid.create(),
      'form-submission-name': form.formTitle,
      'form-space-name': 'MVP',
      'form-name': form.formTitle,
      'form-version': form.formVersion,
      'submitted-on-device': this.deviceService.getDeviceInfo(),
      'received-on-server': new Date(),
      'submitter': 'demo1@gmail.com',
      'form-submission': form
    };

    this.http.post(config.baseURL + 'form-submissions', submissionForm, options).subscribe(res => console.log(res));
  }

  getFormById(formId: number): Form {
    return this.forms.find(form => form.id === formId);
  }

  getFormsList() {
    return this.forms.map(form => {
      return {
        id: form.id,
        formTitle: form.formTitle
      };
    });
  }

  public getData(url: string): Observable<any> {
    const options = new RequestOptions({ headers: this.headers });

    return this.http.get(config.baseURL + url, options);
  }

}
