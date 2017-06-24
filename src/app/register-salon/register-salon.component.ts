import {Component, Inject, OnInit} from '@angular/core';
import {SalonService} from '../services/salon.service';
import {MenuItem} from '../models/menuitem';
import {Salon} from '../models/salon'


@Component({
  selector: 'app-register-salon',
  templateUrl: './register-salon.component.html',
  styleUrls: ['./register-salon.component.css'],
  providers: [SalonService]
})
export class RegisterSalonComponent implements OnInit {
  salon: Salon;
  constructor(private salonService: SalonService) {
    this.salon = new Salon();
  }

  ngOnInit() {
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
  registerSalon() {
    this.salonService.register(this.salon);
  }
}


