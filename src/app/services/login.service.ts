import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

@Injectable()
export class LoginService {
  constructor(private http: Http) { }

  login(email, password){
    // this.http.post('http://localhost:3000/api/salons', salon)
    //   .map(response => response.json())
    //   .subscribe(data => salon = data, err => console.log(err), () => console.log('salon registered successfully'));
  }
  logout(){

  }
}
