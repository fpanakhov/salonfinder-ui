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
  
  getSalon(salon_id){
    return this.http.get('/api/salons/' + salon_id)
      .map(response => response.json());
  }
  
  register(salon: Salon) {
    this.http.post('/api/salons', salon)
      .map(response => response.json())
      .subscribe(data => salon = data, err => console.log(err), () => console.log('salon registered successfully'));
  }
  
  createBooking(booking){
	return this.http.post('/api/bookings', booking).map(resp => resp.json());
  }

  getBooking(booking_id){
    return this.http.get('/api/bookings/' + booking_id)
      .map(response => response.json());
  }
  
  putBooking(booking_id, booking){
	return this.http.put('/api/bookings/' + booking_id, booking)
		.map(resp => resp.json());
  }

  getDistanceMatrix(origin, destination){
	let _url = '/api/maps/?origins=' + origin + '&destinations=' + destination;	
    return this.http.get(_url).map(resp => resp.json());
  }
  
  
  getBookings(date){
	return this.http.get('/api/bookings/?date=' + date)
				.map(resp => resp.json());
  }
  
  getSalonBookings(salon_id, date, count=false){
	let url = '/api/bookings/?salon_id=' + salon_id + '&date=' + date
			+ (count == true ? '&count=yes' : '');
	console.log(url);
	return this.http.get(url)
				.map(resp => resp.json());
  }
  
  
  // calculates and the total price for selected services for the salon
  // returns false if the salon does not offer one of the selected services
  checkServicesOffered(salon, services){
	let total: number = 0.0;
	let found = 0;
	
	salon.menu.map(item => { item.selected = false; } );
	for (let required of services){
		for (let offered of salon.menu){
			if (required == offered.name){
				total += offered.price;
				offered.selected = true;
				found += 1;
				break;
			}
		}
	}
	
	salon.totalPriceForSelectedServices = total;
	return (found == services.length);
  }
  
  // generates and sets timeslots for the salon
  // returns false if no slots available for the given date and timerange
  generateSalonTimeslots(salon, date, from, to){
    let slots: string[] = [];
    salon.timeslots = slots;
    
    if (from >= to) return false;
    
    const slotSize = 1;
    let day: any;
    switch(date.getDay()){
        case 1: { day = salon.schedule.mon; break; }
        case 2: { day = salon.schedule.tue; break; }
        case 3: { day = salon.schedule.wed; break; }
        case 4: { day = salon.schedule.thu; break; }
        case 5: { day = salon.schedule.fri; break; }
        case 6: { day = salon.schedule.sat; break; }
        case 0: { day = salon.schedule.sun; break; }
    }    
    
    if (day != 'undefined' && day != null){    
        for (let f = day.from; f < day.to; f += slotSize){
            let fstr = f.toString() + ':00:00';
            if (fstr.length == 7) fstr = '0' + fstr;
            if (fstr >= from && fstr < to){
                slots.push(fstr);
            }
        }
    }
    salon.timeslots = slots;
    return (salon.timeslots.length > 0);
  }

}
