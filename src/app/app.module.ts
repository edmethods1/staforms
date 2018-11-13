import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DeviceDetectorModule } from 'ngx-device-detector';

import {
  MatButtonModule,
  MatDividerModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatDatepicker,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatCheckboxModule,
  MatSlideToggleModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatAutocompleteModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { AppRoutingModule } from './app.routing.module';
import { WizardComponent } from './components/wizard/wizard.component';
import { TextualQuestionComponent } from './components/questions/textual-question/textual-question.component';
import { StaticDataComponent } from './components/questions/static-data/static-data.component';
import { AutocompleteQuestionComponent } from './components/questions/autocomplete-question/autocomplete-question.component';
import { StaticTemplateComponent } from './components/questions/static-data/static-template/static-template.component';
import { RadiobuttonQuestionComponent } from './components/questions/radiobutton-question/radiobutton-question.component';
import { CheckboxQuestionComponent } from './components/questions/checkbox-question/checkbox-question.component';
import { ButtonsQuestionComponent } from './components/questions/buttons-question/buttons-question.component';
import { FormQuestionComponent } from './components/questions/form-question/form-question.component';
import { DemoComponent } from './demo/demo.component';
import { CheckboxComponent } from './ui/checkbox/checkbox.component';
import { FormManagerComponent } from './form-manager/form-manager.component';
import { TextfieldComponent } from './ui/textfield/textfield.component';
import { DropdownComponent } from './ui/dropdown/dropdown.component';
import { RadiobuttonComponent } from './ui/radiobutton/radiobutton.component';
import { DateComponent } from './ui/date/date.component';
import { SignatureComponent } from './ui/signature/signature.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TextualQuestionComponent,
    WizardComponent,
    StaticDataComponent,
    AutocompleteQuestionComponent,
    StaticTemplateComponent,
    CheckboxQuestionComponent,
    RadiobuttonQuestionComponent,
    ButtonsQuestionComponent,
    FormQuestionComponent,
    DemoComponent,
    CheckboxComponent,
    FormManagerComponent,
    TextfieldComponent,
    DropdownComponent,
    RadiobuttonComponent,
    DateComponent,
    SignatureComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    DeviceDetectorModule.forRoot()
  ],
  exports: [
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
