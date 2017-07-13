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
  
  filterByLocation(salons){
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
              if (this.salonsService
                        .generateSalonTimeslots(
                            salons[i], this.dateOfBooking, this.from, this.to)){ 
                arr1.push(salons[i]);
              }
            }
          }
                   
          this.salons = arr1;
        },
        error => { this.location = error; },
        () => {} );
  }
  

  
  getSalons() {
    this.salonsService.getSalons()
      .subscribe(
        salons => {
          let arr: any[] = [];
          salons.map(s => arr.push(s));
          this.filterByLocation(arr);
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
  }

  search(){
    this.getSalons();
  }
                                                                                                                                                                                           
  ngOnInit() {
    this.search();
  }

}

