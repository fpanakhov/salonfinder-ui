import {MenuItem} from './menuitem';
import {TimeSlot} from '../models/timeslot';

export class Salon {
  email: string;
  password: string;
  name: string;
  address: string;
  owner: string;
  personnel: number;
  menu: MenuItem[];
  schedule: TimeSlot[];
  constructor() {
    this.menu = [];
    this.schedule = [];
    this.schedule['mon'] = new TimeSlot();
    this.schedule['tue'] = new TimeSlot();
    this.schedule['wed'] = new TimeSlot();
    this.schedule['thu'] = new TimeSlot();
    this.schedule['fri'] = new TimeSlot();
    this.schedule['sat'] = new TimeSlot();
    this.schedule['sun'] = new TimeSlot();
  }
}
