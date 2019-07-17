import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DialogErrorComponent} from './dialog/dialog.error.component';
import {DialogSuccessComponent} from './dialog/dialog.success.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    DialogErrorComponent,
    DialogSuccessComponent
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents:[
    DialogErrorComponent,
    DialogSuccessComponent
  ]
})
export class AppModule { }
