import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { HttpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';

import {MaterialModule,
        MdButtonModule,
        MdCheckboxModule,
        MdInputModule,
        MdToolbarModule,
        MdMenuModule,
        MdSelectModule,
        MdIconModule,
        MdDatepickerModule,
        MdGridListModule,
        MdIconRegistry} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SalonsComponent } from './salons/salons.component';
import 'hammerjs';

import { DatepickerModule } from 'angular2-material-datepicker';
import { DateTimePickerModule } from 'ng-pick-datetime';

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
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule, FormsModule,
    MdButtonModule, MdCheckboxModule, MdInputModule, MdToolbarModule, MdMenuModule, MdSelectModule, MdIconModule, MdGridListModule, MdDatepickerModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    DatepickerModule,
    DateTimePickerModule
  ],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent]
})

export class AppModule { }
