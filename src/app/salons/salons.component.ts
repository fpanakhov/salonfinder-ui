import { Component, OnInit } from '@angular/core';
import { SalonsService } from './salons.service';

@Component({
  selector: 'app-salons',
  templateUrl: './salons.component.html',
  styleUrls: ['./salons.component.css'],
  providers: [SalonsService]
})

export class SalonsComponent implements OnInit {

  location:string = 'Munich';
  
  private salons;

  constructor(private salonsService: SalonsService) { }
  
  getSalons(){
    //return this.salonsService.getSalonsLocal().then(salons => {
    //  this.salons = salons;
    //});
    
    this.salonsService.getSalons()
      .subscribe(
        salons => this.salons = salons,
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );;
  }

  ngOnInit() {
    this.getSalons();
  }

}
