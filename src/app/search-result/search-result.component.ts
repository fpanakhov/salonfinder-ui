import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input()
  name: string = '';
  @Input()
  address: string = '';
  @Input()
  distance: number = 0;
  price: number = 0;
  @Input()
  timeslots: any;
  @Input()
  services: any;
  selectedTimeSlot:string;

  constructor() {
    console.log(this.services);
  }

  calculateEstimatedPrice(services){
    let estPrice = 0;
    for(let i = 0 ; i < services.length;i++){
      estPrice += services[i].price;
    }
    return estPrice
  }

  ngOnInit() {
    console.log(this.services);
    this.price = this.calculateEstimatedPrice(this.services);
  }

}
