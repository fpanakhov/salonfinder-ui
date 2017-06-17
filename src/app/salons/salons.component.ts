import { Component, OnInit } from '@angular/core';
import { SalonsService } from './salons.service';

@Component({
    selector: 'app-salons',
    templateUrl: './salons.component.html',
    styleUrls: ['./salons.component.css'],
    providers: [SalonsService]
})

export class SalonsComponent implements OnInit {

    location: String = 'Munich';
    distance: Number = 1;
    
    private salons;

    constructor(private salonsService: SalonsService) { }
  
    locationMatches(salon){
        let l = this.location;
        if(typeof l =='undefined' || !l){
            return true;
        }
        // TODO: check distance with googlemaps
        return salon.address == l;
    }
    
    dateMatches(salon){
        return true; // TODO
    }
    
    fromtoMatches(salon){
        return true; //TODO
    }
  
    getSalons(){
        //return this.salonsService.getSalonsLocal().then(salons => {
        //  this.salons = salons;
        //});
    
    this.salonsService.getSalons()
        .subscribe(
            salons => {
                var arr: any[] = [];
                salons
                    .filter(s => this.locationMatches(s))
                    .filter(s => this.dateMatches(s))
                    .filter(s => this.fromtoMatches(s))
                    .map(s => arr.push(s));
                this.salons = arr;
            },
            error => console.error('Error: ' + error),
            () => console.log('Completed!')
        );
    }
    
    search(){
        this.getSalons();
    }
    
    ngOnInit() {
        this.getSalons();
    }
}
