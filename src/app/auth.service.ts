import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject,BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API:string = '';
  //private http: HttpClient
  constructor() { 
    this.API = ''//environment.API_SERVER;
    if (localStorage['admin-token']) {
      if (localStorage['admin-token'] == 21){

      } else {
        localStorage.removeItem('admin-token');
      }
    }
  }

  login(email, password){
    

    var request:any = {};
    request.subscribe = function(success, failure){
      request.success = success;
      request.failure = failure;
    }
    setTimeout(function(){
      if (email == 'juan@gmail.com' && password == '1234'){
        request.success && request.success({
          token: 21
        })
      } else {
        request.failure && request.failure()
      }
      
    }, 500);
    return request;
    /*return this.http.post(this.API + '/admin/login', {
      "email": email,
      "password": password
    });*/
  }

  logout(){
    console.log("logout");
    localStorage.removeItem('admin-token');
  }

  isTokenValid(){
    if (!localStorage['admin-token']){
      return false;
    }
    return localStorage['admin-token'] == 21;
    /*
    var sJWT = localStorage['admin-token'];
    var headerObj = window['KJUR'].jws.JWS.readSafeJSONString(window['b64utoutf8'](sJWT.split(".")[0]));
    var payloadObj = window['KJUR'].jws.JWS.readSafeJSONString(window['b64utoutf8'](sJWT.split(".")[1]));

    var time = new Date(payloadObj.exp * 1000);
    return (time.getTime() > (new Date().getTime() + 10000));*/
  }
  saveToken(token: string) {
    localStorage.setItem('admin-token', token);
  }

  getToken() {
    return localStorage.getItem('admin-token');
  }


}
