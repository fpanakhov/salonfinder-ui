import { Component, Inject, OnInit } from '@angular/core';
import { SalonService } from '../services/salon.service';
import { MenuItem } from '../models/menuitem';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Salon } from "app/models/salon";


@Component({
  selector: 'app-edit-salon',
  templateUrl: './edit-salon.component.html',
  styleUrls: ['./edit-salon.component.css'],
  providers: [SalonService]
})
export class EditSalonComponent implements OnInit {
  salon: Salon;
  salonServices: any[];
  selectedServiceName: string;
  selectedServicePrice: number;
  newServiceError: boolean;
  days: string[];
  id;

  constructor(private salonService: SalonService, private route: ActivatedRoute, private location: Location, private router: Router) {
    this.days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.salonService.getSalon(this.id)
        .subscribe(salon => {
          this.salon = salon;
          console.log('Set new salon');
          for (const day of this.days) {
            this.salon.schedule[day].from = this.convertNumberToTime(this.salon.schedule[day].from);
            this.salon.schedule[day].to = this.convertNumberToTime(this.salon.schedule[day].to);
          }
          console.log('Converted times to strings');
        });
    })
  }

  addMenuItem() {
    if (this.selectedServiceName && this.selectedServicePrice) {
      this.salon.menu.push(new MenuItem(this.selectedServiceName, this.selectedServicePrice));
      this.salonServices.splice(this.salonServices.indexOf(this.selectedServiceName), 1);
      this.selectedServiceName = null;
      this.selectedServicePrice = null;
      this.newServiceError = false;
    }
    else {
      this.newServiceError = true;
    }
  }

  deleteMenuItem(menuItem) {
    this.salon.menu.splice(this.salon.menu.indexOf(menuItem), 1);
    this.salonServices.push(menuItem.name);
  }

  saveSalon() {
    var dbSalon = JSON.parse(JSON.stringify(this.salon))
    for (const day of this.days) {
      dbSalon.schedule[day].from = this.convertTimeToNumber(dbSalon.schedule[day].from);
      dbSalon.schedule[day].to = this.convertTimeToNumber(dbSalon.schedule[day].to);
    }

    this.salonService.update(dbSalon, this.id);
  }

  deleteSalon() {
    this.salonService.delete(this.id);
    this.router.navigateByUrl('/');
  }

  convertTimeToNumber(time) {
    if (time) {
      time = time.split(':');
      time = time[0] + '.' + time[1];
      time = parseFloat(time);
      return time;
    }
    return null;
  }

  convertNumberToTime(number) {
    if (number) {
      var parts = (''+number).split('.');
      var hours = parseInt(parts[0])
      var time = ("00" + parts[0]).slice(-2)
      var minutes = parseInt(parts[1])
      if (minutes) {
        time = time + ':' + ("00" + parts[1]).slice(-2)
      }
      else {
        time = time + ':' + '00'
      }
      if (hours == 24) {
        time = '23:59'
      }
      return time;
    }
    return null;
  }
}


