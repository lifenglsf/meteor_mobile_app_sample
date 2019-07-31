import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { MatDialog } from '@angular/material';  
import * as _ from 'lodash';
import { AlertController, NavController, App } from 'ionic-angular';
import { Router } from '@angular/router';
import { CustomerCommon } from '../customer.common';
import { CustomerService } from 'client/imports/service/customerService';
@Component({
  selector: 'ngbd-datepicker',
  templateUrl: './customers-add.component.html',
  styleUrls: ['./customers-add.component.scss'],
  providers:[CustomerCommon,CustomerService]
})
@Injectable()
export class CustomersAddComponent implements OnInit {
  customer ={};
  constructor(public dialog:MatDialog,public alertController:AlertController,private route:Router,public customerService:CustomerService,public customerCommon:CustomerCommon) {
   }
   callWithPromise = (method, myParameters) => {
    return new Promise((resolve, reject) => {
      Meteor.call(method, myParameters, (err, res) => {
        if (err) resolve(err)
        resolve(res);
      });
    });
  }
  ngOnInit() {}
  
  async addCustomer(){
  try {
      _.set(this.customer,'manager',Meteor.userId());
      const res = await this.customerService.addCustomer(this.customer)
      this.customerCommon.addCustomerPopup(res,this.alertController,this.route)

    } catch (error) {
    }
  
  }

}
