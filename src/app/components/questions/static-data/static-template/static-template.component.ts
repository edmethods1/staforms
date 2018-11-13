import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-static-template',
  templateUrl: './../../../../../assets/static-template/static-template.component.html',
  styleUrls: ['./../../../../../assets/static-template/static-template.component.css']
})
export class StaticTemplateComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
