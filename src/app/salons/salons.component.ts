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
  distance: number = 10; // = { name: '10km', value: '10000', disabled: false };

  public input1Moment: any;
  public input2Moment: any;

  private salons;

  constructor(private salonsService: SalonService) { }
  filterByLocation(arr){
    console.log(this.distance);
    var origins: string = '';
    arr.map((item, index) => { origins+=item.address; origins+='|'; });
    // console.log(location);
    this.salonsService
      .getDistanceMatrix(origins.substring(0, origins.length-1), this.location)
      .subscribe(
        resp => {
          var addresses: string = resp.origin_addresses;
          console.log(addresses);
          for (var i = 0; i < addresses.length; i++) {
            const distance = resp.rows[i].elements[0].distance;
            if(distance){
              arr[i].distance = distance.value;
            }
          }

          var arr1: any[] = [];
          for (let i = 0; i<arr.length; i++){
            console.log(arr[i]);
            if (arr[i].distance <= this.distance * 1000){
              arr1.push(arr[i]);
            }
          }
          this.salons = arr1;
          console.log(this.salons);
        },
        error => { this.location = error; },
        () => {} );
  }


  dateMatches(salon){
    return true; // TODO
  }

  fromtoMatches(salon){
    return true; //TODO
  }

  getSalons() {
    //return this.salonsService.getSalonsLocal().then(salons => {
    //  this.salons = salons;
    //});

    this.salonsService.getSalons()
      .subscribe(
        salons => {
          var arr: any[] = [];
          salons
            .filter(s => this.dateMatches(s))
            .filter(s => this.fromtoMatches(s))
            .map(s => arr.push(s));

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
    this.getSalons();
  }
}
