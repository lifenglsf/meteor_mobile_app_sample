import { Component, OnInit, Injectable } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import * as _ from 'lodash';
import { AlertController } from 'ionic-angular';
import { Router } from '@angular/router';
import { CustomerCommon } from '../customer.common';
import { CustomerService } from 'client/imports/service/customerService';
import { BaseComponnet } from '../../base.component';
import { PopUp } from '../../popup/popup';
@Component({
  selector: 'ngbd-datepicker',
  templateUrl: './customers-add.component.html',
  styleUrls: ['./customers-add.component.scss'],
  providers:[CustomerCommon,CustomerService,PopUp]
})
@Injectable()
export class CustomersAddComponent extends BaseComponnet implements OnInit {
  customer ={};
  protected componentModule="customers";
  protected componentAction="add";
  constructor(public alertController:AlertController,protected router:Router,public customerService:CustomerService,public customerCommon:CustomerCommon,public popup:PopUp) {
    super();
  }
   callWithPromise = (method, myParameters) => {
    return new Promise((resolve, reject) => {
      Meteor.call(method, myParameters, (err, res) => {
        if (err) resolve(err)
        resolve(res);
      });
    });
  }
 
  ngOnInit() {
    this.checkPerm()
  }
  
  async addCustomer(){
  try {
      _.set(this.customer,'manager',Meteor.userId());
      const res = await this.customerService.addCustomer(this.customer)
        let title = '添加客户';
        var subTitle = '添加客户成功';
        let isError=false;
        let url="";
        if(_.has(res,'error')){
            subTitle = '添加客户记录失败,失败原因:'+_.get(res,'message');
            isError=true;
        }else{
           url='/customers'
        }
        this.popup.addPopUp(this.alertController,isError,1,title,subTitle,url,this.router);
    } catch (error) {
    }
  
  }

}
