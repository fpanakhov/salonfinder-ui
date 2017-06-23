import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-salon',
  templateUrl: './register-salon.component.html',
  styleUrls: ['./register-salon.component.css']
})
export class RegisterSalonComponent implements OnInit {
  services: SalonService[];
  // newServiceName: string;
  // newServicePrice: number;
  constructor() {
    this.services = [];
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


