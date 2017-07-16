import {Component, OnInit} from '@angular/core';
import {SalonService} from '../services/salon.service';
import {MenuItem} from '../models/menuitem';
import {Salon} from '../models/salon'
import {Router} from '@angular/router';


@Component({
  selector: 'app-register-salon',
  templateUrl: './register-salon.component.html',
  styleUrls: ['./register-salon.component.css'],
  providers: [SalonService]
})
export class RegisterSalonComponent implements OnInit {
  salon: Salon;
  salonServices: any[];
  selectedServiceName: string;
  selectedServicePrice: number;
  newServiceError: boolean;
  days: string[];
  error: boolean;
  errorMsg; string;
  constructor(private salonService: SalonService, private router: Router) {
    this.salon = new Salon();
    this.days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  }

  ngOnInit() {
    this.getSalonServices();
  }

  addMenuItem() {
    if(this.selectedServiceName && this.selectedServicePrice) {
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

  getSalonServices() {
    this.salonService.getSalonServices()
      .subscribe(
        services => {
          const arr: any[] = [];
          services.map(s => arr.push(s.name));
          this.salonServices = arr;
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
  }

  deleteMenuItem(menuItem) {
    this.salon.menu.splice(this.salon.menu.indexOf(menuItem), 1);
    this.salonServices.push(menuItem.name);
    console.log(this.salon.menu);
  }
  registerSalon() {
    for(const day of this.days){
      this.salon.schedule[day].from = this.convertTimeToNumber(this.salon.schedule[day].from);
      this.salon.schedule[day].to = this.convertTimeToNumber(this.salon.schedule[day].to);
    }
    this.salonService.register(this.salon)
      .subscribe(data => console.log(data),
        (err) => {
          this.error = true;
          if (err.status === 409) {
            this.errorMsg = 'A salon with same email id is already registered';
          }
          else {
            this.errorMsg = err.message;
          }
        },
        () => {console.log('salon registered successfully'); this.router.navigate(['/login'], {queryParams: {redirectFromRegister: true}})});
  }

  convertTimeToNumber(time) {
    if (time) {
      time = time.split(':');
      time = time[0] + '.' + time[1];
      time = parseFloat(time);
      console.log(time);
      return time;
    }
    return null;
  }
}


