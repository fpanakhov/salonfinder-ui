import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SalonsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule, MdInputModule, MdToolbarModule, MdMenuModule, MdSelectModule, MdIconModule, MdGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
