import { NgModule ,ErrorHandler} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DialogErrorComponent} from './dialog/dialog.error.component';
import {DialogSuccessComponent} from './dialog/dialog.success.component';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(AppComponent),
  ],
  declarations: [
    AppComponent,
    DialogErrorComponent,
    DialogSuccessComponent
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents:[
    DialogErrorComponent,
    DialogSuccessComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
