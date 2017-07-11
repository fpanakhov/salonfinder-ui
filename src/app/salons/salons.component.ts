import {Component, Input, OnInit} from '@angular/core';
import {SalonService} from '../services/salon.service'

@Component({
  selector: 'app-salons',
  templateUrl: './salons.component.html',
  styleUrls: ['./salons.component.css'],
  providers: [SalonService]
})

export class SalonsComponent implements OnInit {

  location: string = 'Munich';
  distance: number = 10;
  dateOfBooking: Date = new Date();

  from: any = '10:00:00';
  to: any = '18:00:00';

  private salons;

  constructor(private salonsService: SalonService) { }
  
  filterByLocation(salons, bookings){
    var origins: string = '';
    salons.map((item, index) => { origins+=item.address; origins+='|'; });
    
    this.salonsService
      .getDistanceMatrix(origins.substring(0, origins.length-1), this.location)
      .subscribe(
        resp => {
          var addresses: string = resp.origin_addresses;
          for (var i = 0; i < addresses.length; i++) {
            const distance = resp.rows[i].elements[0].distance;
            if(distance){
              salons[i].distance = distance.value;
            }
          }

          var arr1: any[] = [];
          for (let i = 0; i<salons.length; i++){
            if (salons[i].distance <= this.distance * 1000){
              arr1.push(salons[i]);
            }
          }
          
          arr1.map(s => this.setBookings(s, bookings));          
          this.salons = arr1;
        },
        error => { this.location = error; },
        () => {} );
  }
  
  setBookings(salon, bookings){
      // TODO: salon.bookings = dictionary[timeslot, numberofbookings];
  }

  getSalons(bookings) {
    this.salonsService.getSalons()
      .subscribe(
        salons => {
          let arr: any[] = [];
          salons.map(s => arr.push(s));
          this.filterByLocation(arr, bookings);
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
  }

  search(){
    this.salonsService.getBookings(this.dateOfBooking)
        .subscribe(
            bookings => {
                this.getSalons(bookings);
            }
        );
  }
                                                                                                                                                                                            
  ngOnInit() {
    this.search();
  }
  
  
  
  hasSlotsAvailable(salon, bookings){
    let result: any[] = [];
    const slotSize = 1;
    let day: number = this.dateOfBooking.getDay();
    let ds: any = null;
    switch(day){
        case 1: { ds = salon.schedule.mon; break; }
        case 2: { ds = salon.schedule.tue; break; }
        case 3: { ds = salon.schedule.wed; break; }
        case 4: { ds = salon.schedule.thu; break; }
        case 5: { ds = salon.schedule.fri; break; }
        case 6: { ds = salon.schedule.sat; break; }
        case 0: { ds = salon.schedule.sun; break; }
    }
    
    let from = ds.from;
    let to = ds.to;
    let maxBookings = salon.personnel;
    
    while (from < to){
        // TODO: check if bookingCount for the slot < maxBookings
        // 
        result.push(from);
        from += slotSize;
    }
    
    return result;    
  }
}

