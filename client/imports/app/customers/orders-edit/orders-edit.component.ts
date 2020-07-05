import { Component, OnInit, OnDestroy } from "@angular/core";
import { MeteorObservable } from 'meteor-rxjs';
import { customers } from 'imports/collections/customer';
import * as _ from 'lodash';
import { CustomerService } from 'client/imports/service/customerService';
import { PopUp } from '../../popup/popup';
import { AlertController } from 'ionic-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { orders } from 'imports/collections/orders';
import { BaseComponnet } from '../../base.component';
@Component({
    templateUrl:"../orders-add/orders-add.component.html",
    selector:"ng-orders-add",
    providers:[CustomerService,PopUp]
})
export class OrdersEdit  extends BaseComponnet implements OnInit,OnDestroy{
    companyList:any;
    orders={};
    componentAction="edit";
    componentModule="orders";
    private meteorSubscription:Subscription ;
    private ordersSubscription:Subscription;
    ngOnInit(){
        this.meteorSubscription = MeteorObservable.subscribe<any>('abc').subscribe(() => {
            this.companyList = customers.find({},{fields:{'_id':1,company:1}}).fetch();
           
        });
        this.ordersSubscription = MeteorObservable.subscribe<any>('orders.list').subscribe(()=>{
            const data = this.activedRoute.snapshot.params
            this.orders  = this.findOrder(_.get(data, 'id'));
            let invoice = _.get(this.orders,'fee_invoice');
            let invoiceConfirm =document.getElementById('fee_invoice_confirm');
            _.set(invoiceConfirm,'disabled',true);
            if(invoice){
                _.set(invoiceConfirm,'disabled',false);
            }
           
            console.log(this.orders);
        });
        this.checkPerm();
    }
    findOrder(id){
        return orders.findOne({_id:id});
    }
    constructor(public customerService:CustomerService,public popup:PopUp,public alertControl:AlertController,public router:Router,public activedRoute:ActivatedRoute){
        super();
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
            console.log(this.orders,'orders form data');
            _.set(this.orders,'manager',Meteor.userId());
            const id = _.get(this.orders,'_id');
            _.unset(this.orders,'_id');
            const res = await this.customerService.updateOrder(id,this.orders);
            console.log(res);
            let title = '修改缴费记录';
            var subTitle = '修改缴费记录成功';
            let url="";
            let isError=false;
            if(_.has(res,'error')){
                subTitle = '修改支付记录失败,失败原因:'+_.get(res,'message');
                isError=true;
            }else{
                url ='/orders';
            }
            this.popup.addPopUp(this.alertControl,isError,2,title,subTitle,url,this.router);
          } catch (error) {
          }
    }
    ngOnDestroy(){
        this.meteorSubscription.unsubscribe()
        this.ordersSubscription.unsubscribe()
    }
}