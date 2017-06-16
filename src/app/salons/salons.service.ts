import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Inject, Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

let salons = [
 { 
    name: 'Dirty GrandPa', address: 'Goodstrasse 32, Munich',
    services: [
        { name: 'haircut', price: 8.50 },
        { name: 'beard coloring', price: 5 },
        { name: 'pedicure', price: 4 },
    ]
 },
 { 
    name: 'Mustaches&Beards', address: 'Yetanotherstrasse 63, Munich',
    services: [
        { name: 'haircut', price: 9 },
        { name: 'beard coloring', price: 6 },
        { name: 'irokez', price: 6 }
    ]
 }
];


@Injectable()
export class SalonsService {

  constructor(private http: Http) {  }
  
  getSalonsLocal(){
    return new Promise(resolve => resolve(salons));
   }
  
  getSalons(){  
    return this.http.get('http://localhost:3000/api/salons')
        .map(response => response.json());
  }

}
