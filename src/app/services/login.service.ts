import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class LoginService {
  constructor(private http: Http) { }

  login(email, password) {
    return this.http.post('/api/salons/login', {
      email: email,
      password: password
    })
  .map(response => response.json());
    //   .subscribe(data => salon = data, err => console.log(err), () => console.log('salon registered successfully'));
  }
  logout() {
    localStorage.removeItem('jwtToken')
  }

  getCurrentUser() {
    const token = localStorage['jwtToken'];
    if (!token){ return {};}

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64)).salon;
  }

  isAuthenticated() {
    return !!localStorage['jwtToken'];
  }

}
