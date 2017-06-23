import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-salon',
  templateUrl: './register-salon.component.html',
  styleUrls: ['./register-salon.component.css']
})
export class RegisterSalonComponent implements OnInit {
  salonName: string;
  address: string;
  owner: string;
  personnel: number;
  services: SalonService[];
  schedule: any[];
  constructor() {
    this.services = [];
    this.schedule = [];
    this.schedule['mon'] = new TimeSlot();
    this.schedule['tue'] = new TimeSlot();
    this.schedule['wed'] = new TimeSlot();
    this.schedule['thu'] = new TimeSlot();
    this.schedule['fri'] = new TimeSlot();
    this.schedule['sat'] = new TimeSlot();
    this.schedule['sun'] = new TimeSlot();
  }

  ngOnInit() {
    this.addService();
  }

  addService() {
    this.services.push(new SalonService());
  }
  deleteService(service) {
    if (this.services.length > 1) {
      this.services.splice(this.services.indexOf(service), 1)
    }
  }
  registerSalon() {
    console.log(this.services);
  }
}

class SalonService {
  name: string;
  price: number;
}
class TimeSlot {
  from: number;
  to: number;
}


