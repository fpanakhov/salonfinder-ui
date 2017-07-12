import {Component, Inject, OnInit} from '@angular/core';
import {SalonService} from '../services/salon.service';
import {MenuItem} from '../models/menuitem';
import {Salon} from '../models/salon'
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-salon',
  templateUrl: './edit-salon.component.html',
  styleUrls: ['./edit-salon.component.css'],
  providers: [SalonService]
})
export class EditSalonComponent implements OnInit {
  salon: Salon;

  constructor(private salonService: SalonService, private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.salonService.getSalon(+params.get('id')))
      .subscribe(salon => this.salon = salon);
    this.addMenuItem();
  }

  addMenuItem() {
    this.salon.menu.push(new MenuItem());
  }
  deleteMenuItem(menuItem) {
    if (this.salon.menu.length > 1) {
      this.salon.menu.splice(this.salon.menu.indexOf(menuItem), 1)
    }
  }
  saveSalon() {
    this.salonService.update(this.salon);
  }

  goBack(): void {
    this.location.back();
  }
}


