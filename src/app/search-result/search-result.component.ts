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
  @Input()
  schedule: any[];
  @Input()
  menu: MenuItem[];  
  @Input()
  timeslots: any[];
  @Input()
  totalPriceForSelectedServices: number;
  
  selectedTimeSlot:string;

  constructor() {
    console.log(this.menu);
  }
  
  public get topThreeTimeslots() {
	return this.timeslots.filter((item, index) => index < 3 );
  }

  ngOnInit() {
    console.log(this.menu);
  }

}
