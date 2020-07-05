import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';
import { customers } from 'imports/collections/customer';
import * as _ from 'lodash'
import { CustomerService } from 'client/imports/service/customerService';
import { CustomerCommon } from '../customer.common';
import { AlertController } from 'ionic-angular';
import { PopUp } from '../../popup/popup';
import { BaseComponnet } from '../../base.component';
@Component({
    templateUrl: '../customers-add/customers-add.component.html',
    providers:[CustomerService,CustomerCommon,PopUp]
})
export class CustomersEditComponnet extends BaseComponnet  implements OnInit {
    public customer = {}
    componentModule="customers";
    componentAction="edit";
    constructor(public route: ActivatedRoute, public customerService: CustomerService, public customerCommon: CustomerCommon, public alertController: AlertController, public router: Router,public popup:PopUp) {
        super()
    }
    ngOnInit() {
        MeteorObservable.subscribe("userList").subscribe(()=>{
            let user = Meteor.user();
            if(_.get(user,'is_master') == -1){
                this.router.navigateByUrl('403');
            }
        })
        MeteorObservable.subscribe('abc').subscribe(() => {
            const data = this.route.snapshot.params
            this.customer = this.findCustomer(_.get(data, 'id'));
        });
        this.checkPerm()
    }
    findCustomer(id) {
        return customers.findOne({ _id: id });
    }
    addCustomer() {
        try {
            const res = this.customerService.addCustomer(this.customer)
            let title = '编辑客户';
            var subTitle = '编辑客户成功';
            let isError=false;
            let url="";
            if(_.has(res,'error')){
                subTitle = '编辑客户失败,失败原因:'+_.get(res,'message');
                isError=true;
            }else{
                url='/customers';
            }
            this.popup.addPopUp(this.alertController,isError,2,title,subTitle,url,this.router)
        } catch (error) {
        }

    }
}