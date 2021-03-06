import { NgModule ,ErrorHandler} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MonthDatePickerModule } from './month-date-picker/month-date-picker.module';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(AppComponent),
    MonthDatePickerModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    IonicApp
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
