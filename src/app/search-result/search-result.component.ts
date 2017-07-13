import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../models/menuitem'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input()
  name: string;
  @Input()
  address: string;
  @Input()
  distance: number;
  price: number;
  @Input()
  schedule: any[];
  @Input()
  menu: MenuItem[];  
  @Input()
  timeslots: any[];
  
  selectedTimeSlot:string;

  constructor() {
    console.log(this.menu);
  }

  calculateEstimatedPrice(menu){
    let estPrice = 0;
    for(let i = 0 ; i < menu.length;i++) {
      estPrice += menu[i].price;
    }
    return estPrice
  }

  ngOnInit() {
    console.log(this.menu);
    this.price = this.calculateEstimatedPrice(this.menu);
  }

}
