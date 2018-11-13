import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output, Input } from '@angular/core';
import { DataService } from "../../data.service";
import { ViewChild, ElementRef } from "@angular/core";
import SignaturePad from 'signature_pad'; 

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements OnInit {

  @ViewChild("canvas") canvas: ElementRef;
  @ViewChild("clearButton") clearButton: ElementRef;

  @Input() value;
  @Input() config;
  @Input() namespace;
  signaturePad: SignaturePad;


  constructor(private DATA:DataService) { }

  ngOnInit() {
    console.log("config", this.config, this.namespace)

    
    this.signaturePad = new SignaturePad(this.canvas.nativeElement, {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      penColor: 'rgb(0, 0, 0)',
      onEnd: () => this.update()
    });
    
    this.value = this.DATA.getValue(this.namespace + '.' + this.config.id) || null;
    if (this.value){
      this.signaturePad.fromData(this.value);
    }
    console.log("value", this.value, this.clearButton);


    this.clearButton['_elementRef'].nativeElement.addEventListener('click', (event) => {
      this.signaturePad.clear();
      this.DATA.clearValue(this.namespace + '.' + this.config.id) || null;
    });
    
  }
  update(){
    this.DATA.setValue(this.namespace + '.' + this.config.id, this.signaturePad.toData());
  }
}
