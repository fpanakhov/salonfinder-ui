import { Component, OnInit } from '@angular/core';
import { SalonsService } from './salons.service';

@Component({
  selector: 'app-salons',
  templateUrl: './salons.component.html',
  styleUrls: ['./salons.component.css'],
  providers: [SalonsService]
})

export class SalonsComponent implements OnInit {

  location: String = 'Munich';
  distance: string = '10000'; // = { name: '10km', value: '10000', disabled: false };

  public input1Moment: any;
  public input2Moment: any;

  private salons;

  constructor(private salonsService: SalonsService) { }


  filterByLocation(arr){
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
          for (var i=0; i<arr.length; i++){
            if (arr[i].distance <= this.distance) arr1.push(arr[i]);
          }
          this.salons = arr1;
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

  getSalons(){
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
