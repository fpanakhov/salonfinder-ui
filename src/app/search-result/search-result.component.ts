import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../models/menuitem';
import { Router } from '@angular/router';

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
  
  @Input()
  date: any;
  @Input()
  salon_id: string;
  
  selectedTimeSlot:string;

  constructor(private router: Router) {
    console.log(this.menu);
  }
  
  goToBooking(){
    let yearstr = this.date.getFullYear().toString();
    let monthstr = (this.date.getMonth()+1).toString();
    if (monthstr.length == 1) monthstr = '0' + monthstr;
    let datestr = this.date.getDate();
    if (datestr.length == 1) datestr = '0' + datestr;
    
    this.router.navigateByUrl(
			'/salons/' + this.salon_id
			+'/book?date='
			+ yearstr + '-' + monthstr + '-' + datestr);
	return false;
  }
  
  public get topThreeTimeslots() {
	return this.timeslots.filter((item, index) => index < 3 );
  }

  ngOnInit() {
    console.log(this.menu);
  }

}
