import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {SalonService} from '../services/salon.service'

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css'],
  providers: [SalonService]

})
export class CancelBookingComponent implements OnInit {

  error_msg: string = '';
  success_msg: string = '';
  
  constructor(
		private activatedRoute: ActivatedRoute
		, private salonsService: SalonService) {
  }

cancel(booking_id, cancelCode){
  	this.salonsService.getBooking(booking_id)
		.subscribe( 
			book => {
				book.cancelled = true;
				book.cancelCode = cancelCode;
				this.salonsService.putBooking(booking_id, book)
					.subscribe(
						data => {},
						err => {
							console.log(err);
							this.error_msg = 'Failed to cancel the booking!';
						},
						() => { this.success_msg ='The booking was cancelled successfully. Hope to see you soon!'; }
					);
			}, 
			err => {
				console.log(err);
				this.error_msg = 'Failed to cancel the booking!';
			},
			() => {}
		);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
		  let booking_id = params['booking_id'];
      this.activatedRoute.queryParams.subscribe((params: Params) => {
			  let cancelCode = params['code'];
			  this.cancel(booking_id, cancelCode);
		  });
     });
  }

}
