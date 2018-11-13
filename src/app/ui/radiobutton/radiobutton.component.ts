import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output, Input } from '@angular/core';
import { DataService } from "../../data.service";
import { ViewChild, ElementRef } from "@angular/core";
import config from '../../config.js';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.css']
})
export class RadiobuttonComponent implements OnInit {
  
  options: string[] = [];


  @Input() value;
  @Input() config;
  @Input() namespace;
  validation;

  constructor(private DATA:DataService) { }

  ngOnInit() {
    
    this.value = this.DATA.getValue(this.namespace + '.' + this.config.id) || '';
    
    this.validation = this.config.validation;
    this.options = this.config.options;
  }
  onSelect(event){
    this.value = event.value;
    this.DATA.setValue(this.namespace + '.' + this.config.id, this.value);
    console.log(this.DATA.data);
  }
}