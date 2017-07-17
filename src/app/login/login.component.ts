import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  redirectFromRegister: boolean;
  redirectFromRegisterMsg: string;
  email: string;
  password: string;

  constructor(private route: ActivatedRoute, private loginService: LoginService, private router: Router) {
    this.redirectFromRegisterMsg = 'Salon created successfully!!';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.redirectFromRegister = params.redirectFromRegister;
    });
  }

  login() {
    console.log('loggin in ');
    this.loginService.login(this.email, this.password)
      .subscribe(data => localStorage['jwtToken']=data.token, err => console.log(err), () => {console.log('login success'); this.router.navigateByUrl('/salons')});
  }
  logout() {
    console.log('loggin out');
  }
}
