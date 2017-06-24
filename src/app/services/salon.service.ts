import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Inject, Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Salon} from '../models/salon';


const salons = [
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
export class SalonService {

  constructor(private http: Http) {  }

  getSalonsLocal() {
    return new Promise(resolve => resolve(salons));
  }

  getSalons() {
    return this.http.get('/api/salons')
      .map(response => response.json());
  }
  
  register(salon: Salon) {
    this.http.post('/api/salons', salon)
      .map(response => response.json())
      .subscribe(data => salon = data, err => console.log(err), () => console.log('salon registered successfully'));
  }


  getDistanceMatrix(origin, destination){
	let _url = '/api/maps/?origins=' + origin + '&destinations=' + destination;	
    return this.http.get(_url).map(resp => resp.json());
  }

}
