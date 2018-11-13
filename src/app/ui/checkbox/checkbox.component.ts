import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output, Input } from '@angular/core';
import { DataService } from "../../data.service";
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() value;
  @Input() config;
  @Input() namespace;

  constructor(private DATA:DataService) { }

  ngOnInit() {
    console.log("config", this.config, this.namespace)
    this.value = this.DATA.getValue(this.namespace + '.' + this.config.id) || false;
  }
  toggle(){
    this.value = !this.value;
    this.DATA.setValue(this.namespace + '.' + this.config.id, this.value);
    console.log(this.DATA.data)
  }

  onUpdate(value){
    this.value = value;
    this.DATA.setValue(this.namespace + '.' + this.config.id, this.value);
  }
}
