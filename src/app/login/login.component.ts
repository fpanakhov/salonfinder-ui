import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  redirectFromRegister: boolean;
  redirectFromRegisterMsg: string;

  constructor(private route: ActivatedRoute) {
    this.redirectFromRegisterMsg = 'Salon created successfully!!';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.redirectFromRegister = params.redirectFromRegister;
    });
  }

  login(){
    console.log('loggin in ');
  }
  logout(){
    console.log('loggin out');
  }
}
