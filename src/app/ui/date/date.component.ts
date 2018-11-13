import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output, Input } from '@angular/core';
import { DataService } from "../../data.service";
import { ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

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
  }

  validate(){
    this.value = this.input.nativeElement.value;
    this.DATA.setValue(this.namespace + '.' + this.config.id, this.value);
  }
}