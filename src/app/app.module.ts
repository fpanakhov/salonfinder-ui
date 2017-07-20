import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        MdNativeDateModule,
        MdGridListModule,
        MdIconRegistry,
        MdDialogModule} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SalonsComponent } from './salons/salons.component';
import 'hammerjs';

import { DatepickerModule } from 'angular2-material-datepicker';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { SearchResultComponent } from './search-result/search-result.component';
import { HomeComponent } from './home/home.component';
import { RegisterSalonComponent } from './register-salon/register-salon.component';
import { LoginComponent } from './login/login.component';
import { EditSalonComponent } from './edit-salon/edit-salon.component';
import { BookSalonComponent, FailureDialogComponent, SuccessDialogComponent } from './book-salon/book-salon.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { CancelBookingComponent } from './cancel-booking/cancel-booking.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'salons', component: SalonsComponent },
  {path: 'salons/:id/edit', component: EditSalonComponent},
  {path: 'register', component: RegisterSalonComponent },
  {path: 'login', component: LoginComponent },
  {path: 'salons/:salon_id/book', component: BookSalonComponent},
  {path: 'bookings/:booking_id/confirm', component: ConfirmBookingComponent },
  {path: 'bookings/:booking_id/cancel', component: CancelBookingComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SalonsComponent,
    SearchResultComponent,
    HomeComponent,
    RegisterSalonComponent,
    EditSalonComponent,
    LoginComponent,
    BookSalonComponent,
    ConfirmBookingComponent,
    CancelBookingComponent,
    FailureDialogComponent, SuccessDialogComponent
  ],
  entryComponents: [ FailureDialogComponent, SuccessDialogComponent ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule, FormsModule, ReactiveFormsModule, MdDialogModule,
    MdButtonModule, MdCheckboxModule, MdInputModule, MdToolbarModule, MdMenuModule, MdSelectModule, MdIconModule, MdGridListModule, MdDatepickerModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    DatepickerModule,
    DateTimePickerModule,
    MdNativeDateModule
  ],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent]
})

export class AppModule { }
