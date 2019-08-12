import { Component, OnInit, OnDestroy } from "@angular/core";
import { MeteorObservable } from 'meteor-rxjs';
import { orders } from 'imports/collections/orders';
import { customers } from 'imports/collections/customer';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
    templateUrl:"./orders-list.component.html"
})
export class OrdersListComponent implements OnInit,OnDestroy{
    private ordersList;
    private companyList;
    private page = 1;
    private pageSize=1;
    collectionSize: any;
    private subscription:Subscription
    private osubscription:Subscription
    constructor(public router:Router){

    }
    ngOnInit(): void {
        this.subscription =MeteorObservable.subscribe('abc').subscribe(()=>{
           //this.companyList = customers.find().fetch();
        })
        this.osubscription = MeteorObservable.subscribe('orders.list').subscribe(()=>{
           this.getOrdersList();
         })
       
    }
    loadPage(page) {
        this.page = page
        this.getOrdersList();
    }
    getOrdersList(){
        const skip = (this.page - 1) * this.pageSize
        var tmpobj = orders.find({}, {
            skip: skip, limit: this.pageSize, transform: function(obj) {
                if (_.has(obj, 'fee_date')) {
                   obj.convertFeeDate = obj.fee_date.year+'-'+obj.fee_date.month+'-'+obj.fee_date.day;
                }
                switch(obj.option){
                    case "1":
                        obj.convertOption = '微信';
                        break;
                    case "2":
                        obj.convertOption = '支付宝';
                        break;
                    case "3":
                        obj.convertOption = '现金';
                        break;
                    default:
                        obj.convertOption = "未知的支付方式"
                }
                obj.companyName = _.get(customers.findOne({_id:obj.company}),'company')
                return obj;
            }
        })
        this.ordersList = tmpobj.fetch();
        var cusor = orders.find();
        this.collectionSize = cusor.count();
    }
    toAddOrders() {
        this.router.navigateByUrl('/orders/add');
    }
    ngOnDestroy(): void {
     this.subscription.unsubscribe();
     this.osubscription.unsubscribe();
    }
    
}