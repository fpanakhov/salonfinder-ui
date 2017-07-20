import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import { Salon } from "app/models/salon";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [LoginService]
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  isAuthenticated(){
    return this.loginService.isAuthenticated();
  }

  getCurrentUser(){
    const salon = this.loginService.getCurrentUser();
    console.log(salon.username);
    return salon.username;
  }

  logout(){
    this.loginService.logout();
    this.router.navigateByUrl('/');
  }

  myRouter(){
    let salon = this.loginService.getCurrentUser();
    this.router.navigateByUrl('/salons/'+ salon._id + '/edit');
  }
}
