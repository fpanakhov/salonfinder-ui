import { Component, OnInit } from '@angular/core';
import {SalonService} from '../services/salon.service'

@Component({
  selector: 'app-book-salon',
  templateUrl: './book-salon.component.html',
  styleUrls: ['./book-salon.component.css'],
  providers: [SalonService]
})


export class BookSalonComponent implements OnInit {

  salon: any;

  constructor(private salonsService: SalonService) { }
  
  getSalon(){
	this.salonsService.getSalon("5943b69e825d4809f37e8d61")
      .subscribe(
        s => {
			this.salon = s;
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
  }

  ngOnInit() {
	this.getSalon();
  }

}
