import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {SalonService} from '../services/salon.service'

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css'],
  providers: [SalonService]
})

export class ConfirmBookingComponent implements OnInit {

  error_msg: string = '';
  success_msg: string = '';

  constructor(
		private activatedRoute: ActivatedRoute
		, private salonsService: SalonService) {
  }
    
  confirm(booking_id, confirmCode){
  	this.salonsService.getBooking(booking_id)
		.subscribe( 
			book => {
				book.confirmed = true;
				book.confirmCode = confirmCode;
				this.salonsService.putBooking(booking_id, book)
					.subscribe(
						data => {},
						err => {
							console.log(err);
							this.error_msg = 'Failed to confirm the booking!';
						},
						() => { this.success_msg ='The booking was confirmed successfully!'; }
					);
			}, 
			err => {
				console.log(err);
				this.error_msg = 'Failed to confirm the booking!';
			},
			() => {}
		);
  }

  ngOnInit() {	
	this.activatedRoute.params.subscribe((params: Params) => {
		let booking_id = params['booking_id'];
        this.activatedRoute.queryParams.subscribe((params: Params) => {
			let confirmCode = params['code'];
			this.confirm(booking_id, confirmCode);
		});
     });
  }

}
