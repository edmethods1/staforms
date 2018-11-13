import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { FormsService } from "../forms.service";


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(private DATA: DataService, private formService: FormsService) { }

  
  forms = {};
  mainForm = null;
  currentForm:any = {};
  step:any = {};
  state:any = {};
  currentPath:any = {};
  
  currentStep:any = {}

  stateString = '';
  ngOnInit() {/*
    this.DATA.subscribe(this, 'dessert.type', function(event){
      console.log("update event", event)
    })

    this.DATA.setValue('dessert.type', 'ice cream', {});
    this.DATA.setValue('dessert.type', 'cookie', this);
    this.DATA.setValue('dessert.cookie.type', 'oreo');
    this.DATA.setValue('movie.genres', ['comedy']);
    this.DATA.setValue('science', true);

    console.log(this.DATA.replaceText('I like to have a {{dessert.cookie.type}} {{dessert.type}}'));
    console.log(this.DATA.getValue("movie.genres"));
    console.log(this.DATA.data);*/

    this.state.path = {};
    this.formService.getForm(2).subscribe(data=>{
      
      this.step = data.steps[0];
      this.state.path = {formId: 2, steps:[this.step.id]}
      


      this.forms[2] = data;

      this.stateString = JSON.stringify(this.state);

      this.mainForm = data;
      this.currentForm = data;
      this.currentStep = {formId: 2, stepId: this.step.id};
      this.currentPath = this.state.path;
      console.log(this.currentForm);
    });
    
  }
  getTitle(){
    return this.DATA.replaceText(this.step.title|| '');
  }
  previous(){
    if (this.currentPath.steps[0] == this.currentStep.stepId){
      if (this.currentForm != this.mainForm){
        this.getPreviousBranchForm(this.currentForm.formId);
      }
    } else {
      var steps = this.currentPath.steps;
      if (steps[steps.length - 2].constructor == Array){
        var branches = steps[steps.length - 2];
        var branch = branches[branches.length - 1];
        console.log(branch)
        this.formService.getForm(branch.formId).subscribe(data=>{
          
          
          this.forms[data.formId] = data;

          this.currentForm = data;
          this.step = this.getStep(branch.steps[branch.steps.length - 1]);
          this.currentStep = {formId: data.formId, stepId: this.step.id};
          this.currentPath = branch;
          console.log(this.currentForm);

          this.stateString = JSON.stringify(this.state);
        });
      } else {
        this.currentPath.steps.pop();
        var steps = this.currentPath.steps;
        this.currentStep.stepId = steps[steps.length - 1];
        this.step = this.getStep(this.currentStep.stepId);
      }
      
    }
    this.stateString = JSON.stringify(this.state);
  }
  next(){
    console.log(this.step);
    if (this.step.next){
      var step_index = (this.step.next.constructor == Function ? this.step.next(this.DATA.data) : this.step.next);

      if (step_index == null){
        this.getNextBranchForm(this.currentForm.formId);
      } else if (this.step.branch){
        
        var branches = this.step.branch(this.DATA.data);
        
        if (branches.constructor != Array){
          branches = [branches];
        }
        if (branches.length > 0){
          for (var iBranch = 0; iBranch < branches.length; iBranch++){
            branches[iBranch] = {formId: branches[iBranch]};
          }
          console.log("branch", branches);
          this.currentPath.steps.push(branches);
          this.currentPath.steps.push(step_index);
  
          this.formService.getForm(branches[0].formId).subscribe(data=>{
        
            this.step = data.steps[0];
            branches[0].steps = [this.step.id];
            
            this.forms[branches[0].formId] = data;
      
            
            this.currentForm = data;
            this.currentStep = {formId: branches[0].formId, stepId: this.step.id};
            this.currentPath = branches[0];
            console.log(this.currentForm);
  
            this.stateString = JSON.stringify(this.state);
          });
        } else {
          this.step = this.getStep(step_index);
          this.currentPath.steps.push(step_index);
          this.currentStep = {formId: this.currentForm.formId, stepId: step_index};  
        }
        
      } else {
        this.step = this.getStep(step_index);
        this.currentPath.steps.push(step_index);
        this.currentStep = {formId: this.currentForm.formId, stepId: step_index};
      }
      this.stateString = JSON.stringify(this.state);
    } else {
      
      if (this.currentForm != this.mainForm){
        console.log("tt")
        this.getNextBranchForm(this.currentForm.formId);
      }
    }
    console.log("currentForm->", this.currentForm);
  }
  getPreviousBranchForm(formId, obj = null){
    obj = obj ? obj : this.state.path;
    var steps = obj.steps;
    console.log("patgh", this.state.path)
    for (var iStep = 0; iStep < steps.length; iStep++){
      console.log(formId, steps[iStep])
      if (steps[iStep].constructor == Array){
        var branches = steps[iStep];
        for (var iBranch = 0; iBranch < branches.length; iBranch++){
          if (branches[iBranch].formId == formId){

            if (iBranch > 0){
              var branch = branches[iBranch - 1];
              this.formService.getForm(branch.formId).subscribe(data=>{
                
                
                this.forms[data.formId] = data;

                this.currentForm = data;
                this.step = this.getStep(branch.steps[branch.steps.length - 1]);
                this.currentStep = {formId: data.formId, stepId: this.step.id};
                this.currentPath = branch;
                console.log(this.currentForm);
      
                this.stateString = JSON.stringify(this.state);
              });
              return true;
            } else {
              this.currentForm = this.forms[obj.formId];
              this.currentStep = {formId: obj.formId, stepId: steps[iStep - 1]};
              this.currentPath = obj;
              this.step = this.getStep(steps[iStep - 1]);
              steps.splice(iStep, steps.length - iStep)
              return true;
            }
          } else {
            if (this.getPreviousBranchForm(formId, branches[iBranch])){
              return true;
            }
            // drill recursion
          }
        }
      }
    }
    return null;
  }
  getNextBranchForm(formId, obj = null){
    obj = obj ? obj : this.state.path;
    var steps = obj.steps;
    
    for (var iStep = 0; iStep < steps.length; iStep++){
      if (steps[iStep].constructor == Array){
        var branches = steps[iStep];
        for (var iBranch = 0; iBranch < branches.length; iBranch++){
          if (branches[iBranch].formId == formId){

            if (iBranch + 1 < branches.length){
              this.formService.getForm(branches[iBranch + 1].formId).subscribe(data=>{
      
                this.step = data.steps[0];
                branches[iBranch + 1].steps = [this.step.id];
                
                this.forms[branches[iBranch + 1].formId] = data;
          
                
                this.currentForm = data;
                this.currentStep = {formId: branches[iBranch + 1].formId, stepId: this.step.id};
                this.currentPath = branches[iBranch + 1];
      
                this.stateString = JSON.stringify(this.state);
                console.log("this", this);
              });
              return true;
            } else {
              this.currentForm = this.forms[obj.formId];
              this.currentStep = {formId: obj.formId, stepId: steps[iStep + 1]};
              this.currentPath = obj;
              this.step = this.getStep(steps[iStep + 1]);
              return true;
            }
          } else {
            // drill recursion
            if (this.getNextBranchForm(formId, branches[iBranch])){
              return true;
            }
          }
        }
      }
    }
    return null;
  }
  getStep(id){
    for (var iStep = 0; iStep < this.currentForm.steps.length; iStep++){
      console.log(this.currentForm.steps);
      if (this.currentForm.steps[iStep].id == id){
        return this.currentForm.steps[iStep];
      }
    }
    return {};
  }
  ngOnDestroy(){
    this.DATA.unsubscribe(this);
  }

}
