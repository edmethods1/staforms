import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import config from './config.js';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) {
    function EventStream(){
      this.listeners = [];
    }
    EventStream.prototype.dispatch = function(type, data, source){
      for (var iListener = 0; iListener < this.listeners.length; iListener++){
        if (this.listeners[iListener].instance == source){
          continue;
        }
        if (this.listeners[iListener].events[type]){
          this.listeners[iListener].events[type]({type, data})
        }
      }
    }
    EventStream.prototype.unsubscribe = function(instance){
      for (var iListener = 0; iListener < this.listeners.length; iListener++){
        if (this.listeners[iListener].instance == instance){
          this.listeners.splice(iListener, 1);
        }
      }
    }
    EventStream.prototype.subscribe = function(instance, type, callback){
      for (var iListener = 0; iListener < this.listeners.length; iListener++){
        if (this.listeners[iListener].instance == instance){
          this.listeners[iListener].events[type] = callback;
          return true;
        }
      }
      let events = {};
      events[type] = callback;
      this.listeners.push({instance: instance, events:events});
    }
    this.eventStream = new EventStream();
  }
  getData(url: string, headers:any = {}){
    
    const options = new RequestOptions({ headers: new Headers(headers) });

    return this.http.get(url, options);
  }

  data = {};
  eventStream = null;

  dispatch(type, data, source){
    this.eventStream.dispatch(type, data, source)
  }
  unsubscribe(instance){
    this.eventStream.unsubscribe(instance)
  }
  subscribe(instance, type, callback){
    this.eventStream.subscribe(instance, type, callback)
  }
  
  setValue(name, value, instance = null){
    var properties = name.split('.');
    var obj = this.data;
    while (properties.length > 1){
      var property = properties.shift();
      if (!obj[property]){
        obj[property] = {};
      }
      obj = obj[property];
    }
    obj[properties[0]] = value;
    if (instance){
      this.dispatch(name, value, instance)
    }
    window["DATA"] = this.data;
  }

  getValue(name){
    var properties = name.split('.');
    var obj = this.data;
    while (properties.length > 1){
      var property = properties.shift();
      if (!obj[property]){
        return '';
      }
      obj = obj[property];
    }
    return (obj.hasOwnProperty(properties[0]) ? obj[properties[0]] : null);
  }

  clearValue(name){
    var properties = name.split('.');
    var obj = this.data;
    while (properties.length > 1){
      var property = properties.shift();
      if (!obj[property]){
        return '';
      }
      obj = obj[property];
    }
    if(obj.hasOwnProperty(properties[0])){
      delete obj[properties[0]]
    }
  }

  replaceText(text){
    var sourceParams = text.match(/{{.*?}}/gim) || [];
    for (var iParam = 0; iParam < sourceParams.length; iParam++) {
      var param = sourceParams[iParam];
      var value = this.getValue(param.replace('{{', '').replace('}}', ''));
      text = text.replace(param, value);
    }
    return text;
  }


}
