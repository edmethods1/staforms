import { Component, OnInit } from "@angular/core";
import { ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @ViewChild("emailConnect")
  email: ElementRef;
  @ViewChild("passwordConnect")
  password: ElementRef;

  showConnectExhale = false;
  connecting = false;
  error = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    var self = this;
    if (this.authService.isTokenValid()) {
      this.router.navigate(["wizard"]);
    } else {
      this.authService.logout();
    }
    this.password.nativeElement.onkeydown = function(event) {
      if (event.keyCode == 13) {
        self.connect();
      }
    };
  }

  connect() {
    /*
    admin@exhalespa.com
Toptal3%
    */
    console.log("login");
    if (this.connecting) {
      return false;
    }
    this.error = '';
    this.connecting = true;

    this.authService
      .login(this.email.nativeElement.value, this.password.nativeElement.value)
      .subscribe(
        data => {
          this.connecting = false;
          this.authService.saveToken(data.token)
          this.router.navigate(["wizard"]);
        },
        e => {
          this.connecting = false;
          this.error = "The email or password are incorrect";
        }
      );
  }
  forgotPassword() {}
}
