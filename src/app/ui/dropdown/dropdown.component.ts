import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output, Input } from '@angular/core';
import { DataService } from "../../data.service";
import { ViewChild, ElementRef } from "@angular/core";
import config from '../../config.js';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
/*
{
    'Content-Type': 'application/json',
    'x-apikey': '5bae9c02bd79880aab0a781f'
  }
*/
options: string[] = ['One', 'Two', 'Three'];

  @ViewChild("input") input: ElementRef;

  @Input() value;
  @Input() config;
  @Input() namespace;
  validation;

  constructor(private DATA:DataService) { }

  ngOnInit() {
    console.log("config", this.config, this.namespace)
    this.value = this.DATA.getValue(this.namespace + '.' + this.config.id) || '';
    this.input.nativeElement.value = this.value;
    this.validation = this.config.validation;

    var url = this.DATA.replaceText(this.config.source.url);
    console.log(this.config.source.url);
    console.log(this.DATA.data)
    console.log(url)
    this.DATA.getData(url, this.config.source.headers || {}).subscribe(data=>{
      data = JSON.parse(data["_body"]);
      this.options = this.config.parse ? this.config.parse(data) : data;
      console.log(data);
    })
  }
  onSelect(event){
    console.log("optionSelected", event)
    this.value = event.option.value;
    this.DATA.setValue(this.namespace + '.' + this.config.id, this.value);
  }
  validate(){
    console.log("dropdown", this.validate)
    this.value = this.input.nativeElement.value;
    this.DATA.setValue(this.namespace + '.' + this.config.id, this.value);
  }
}