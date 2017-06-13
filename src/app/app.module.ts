import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';

import {MdButtonModule,
        MdCheckboxModule,
        MdInputModule,
        MdToolbarModule,
        MdMenuModule,
        MdSelectModule,
        MdIconModule,
        MdGridListModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SalonsComponent } from './salons/salons.component';


const appRoutes: Routes = [
  { path: 'salons', component: SalonsComponent },
];




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SalonsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule, MdInputModule, MdToolbarModule, MdMenuModule, MdSelectModule, MdIconModule, MdGridListModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
