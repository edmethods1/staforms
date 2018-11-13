import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { DemoComponent } from './demo/demo.component';
import { LoginComponent } from './login/login.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { AuthGuardService } from "./auth-guard.service";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: 'wizard', component: WizardComponent,
  canActivate: [AuthGuardService] },
  { path: 'form/:id', component: FormComponent,
  canActivate: [AuthGuardService] },
  { path: 'demo', component: DemoComponent,
  canActivate: [AuthGuardService] },
  { path: "**", redirectTo: "wizard" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
