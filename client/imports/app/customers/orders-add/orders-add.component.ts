import { Component, OnInit, OnDestroy } from "@angular/core";
import { MeteorObservable } from 'meteor-rxjs';
import { customers } from 'imports/collections/customer';
import * as _ from 'lodash';
import { CustomerService } from 'client/imports/service/customerService';
import { PopUp } from '../../popup/popup';
import { AlertController } from 'ionic-angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseComponnet } from '../../base.component';
import { TimeFormat } from '../../date.provider/timeformat';
@Component({
    templateUrl:"./orders-add.component.html",
    selector:"ng-orders-add",
    providers:[CustomerService,PopUp,TimeFormat]
})

export class OrdersAdd extends BaseComponnet implements OnInit,OnDestroy{
    companyList:any;
    orders={};
    componentModule="orders";
    componentAction="add";
    private meteorSubscription:Subscription ;
    ngOnInit(){
        this.meteorSubscription = MeteorObservable.subscribe<any>('abc').subscribe(() => {
            this.companyList = customers.find({},{fields:{'_id':1,company:1}}).fetch();
        });
       let invoiceConfirm =document.getElementById('fee_invoice_confirm');
       _.set(invoiceConfirm,'disabled',true);
       this.checkPerm();
    }
    constructor(public timeFormt:TimeFormat,public customerService:CustomerService,public popup:PopUp,public alertControl:AlertController,public router:Router){
        super();
    }
format(event,type,obj){
    console.log(obj)
    return this.timeFormt.format(event,type)
}
    changeInvoice(event){
        const invoiceConfirm = document.getElementById('fee_invoice_confirm');
        if(event.target.checked){
            _.set(invoiceConfirm,'disabled',false);
        }else{
            _.set(invoiceConfirm,'disabled',true);
        }
    }
    async addOrder(){
        try {
            _.set(this.orders,'manager',Meteor.userId());
            const res = await this.customerService.addOrder(this.orders);
            let title = '添加缴费记录';
            var subTitle = '添加缴费记录成功';
            let isError=false;
            let url="";
            if(_.has(res,'error')){
                subTitle = '添加支付记录失败,失败原因:'+_.get(res,'message');
                isError=true;
            }else{
                url='/orders';
            }
            this.popup.addPopUp(this.alertControl,isError,1,title,subTitle,url,this.router);
          } catch (error) {
          }
    }
    ngOnDestroy(){
        this.meteorSubscription.unsubscribe()
    }
}