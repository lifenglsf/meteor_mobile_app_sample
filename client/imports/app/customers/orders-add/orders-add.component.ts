import { Component, OnInit, OnDestroy } from "@angular/core";
import { MeteorObservable } from 'meteor-rxjs';
import { customers } from 'imports/collections/customer';
import * as _ from 'lodash';
import { CustomerService } from 'client/imports/service/customerService';
import { PopUp } from '../../popup/popup';
import { AlertController } from 'ionic-angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
    templateUrl:"./orders-add.component.html",
    selector:"ng-orders-add",
    providers:[CustomerService,PopUp]
})
export class OrdersAdd implements OnInit,OnDestroy{
    companyList:any;
    orders={};
    private meteorSubscription:Subscription ;
    ngOnInit(){
        this.meteorSubscription = MeteorObservable.subscribe<any>('abc').subscribe(() => {
            this.companyList = customers.find({},{fields:{'_id':1,company:1}}).fetch();
        });
    }
    constructor(public customerService:CustomerService,public popup:PopUp,public alertControl:AlertController,public router:Router){

    }

    async addOrder(){
        try {
            _.set(this.orders,'manager',Meteor.userId());
            const res = await this.customerService.addOrder(this.orders);
            console.log(res);
            let title = '添加缴费记录';
            var subTitle = '添加缴费记录成功';
            var ok = {},cancel={};
            if(_.has(res,'error')){
                subTitle = '添加支付记录失败,失败原因:'+_.get(res,'message');
                ok = undefined;
                cancel=undefined;
            }else{
                _.set(ok,'text','继续添加');
                _.set(ok,'callback',function(){location.reload()});
                _.set(cancel,'text','去列表');
                _.set(cancel,'callback',function(){console.log(this);this.router.navigateByUrl('/orders')});
            }
            this.popup.addPopUp(this.alertControl,ok,cancel,title,subTitle,this.router);
          } catch (error) {
          }
    }
    ngOnDestroy(){
        this.meteorSubscription.unsubscribe()
    }
}