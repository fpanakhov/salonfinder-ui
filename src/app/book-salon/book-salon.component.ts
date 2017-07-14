import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {SalonService} from '../services/salon.service'

@Component({
  selector: 'app-book-salon',
  templateUrl: './book-salon.component.html',
  styleUrls: ['./book-salon.component.css'],
  providers: [SalonService]
})


export class BookSalonComponent implements OnInit {

  salon: any = {name:"", timeslots: [], address:"", menu: []};
  date: string = "";
  bookings: any[] = [];
  selectedTimeSlot: string = '14:00:00';
  email: string = "";
  selectedServices = ['haircut', 'irokez'];

  constructor(
		private activatedRoute: ActivatedRoute
		, private salonsService: SalonService) {
  }
  
  book(){
	// TODO
  }
  
  getSalon(salon_id, date){
	this.salonsService.getSalon(salon_id)
      .subscribe(
        s => {
			this.salonsService.generateSalonTimeslots(s, new Date(date), '00:00:00', '23:59:00');
			this.salonsService.checkServicesOffered(s, this.selectedServices);
			this.salon = s;
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
  }
  
  getSalonBookings(salon_id, date){
	this.salonsService.getSalonBookings(salon_id, date, true)
      .subscribe(
        b => {
			this.bookings = b;
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
  }

  ngOnInit() {
	this.activatedRoute.params.subscribe((params: Params) => {
        let salon_id = params['salon_id'];
        this.activatedRoute.queryParams.subscribe((params: Params) => {
			this.date = params['date'];
			this.getSalonBookings(salon_id, this.date);
			this.getSalon(salon_id, this.date);
		});
     });
  }
  
  recalc_price() {
    let total = 0.0;
    for (let m of this.salon.menu){
		total += ( m.selected ? m.price : 0 );
    }
    this.salon.totalPriceForSelectedServices = total;
  }

}
