import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { customers } from '../../../../../imports/collections/customer';
import { MeteorObservable } from 'meteor-rxjs';
import * as _ from 'lodash'
import { BaseComponnet } from '../../base.component';
@Component({
    selector: 'app-customers-list',
    templateUrl: 'customers-list.component.html',
    styleUrls: ['customers-list.component.scss', '../../../../public/scss/bootstrap.scss'],
})



export class CustomersListComponent extends BaseComponnet implements OnInit {
    customerList: any;
    demo: any;
    page = 1;
    pageSize = 1;
    collectionSize: any;
    user:any
    protected componentModule="customers";
    protected componentAction="list";
    constructor(protected router: Router) {
        super();
    }

    ngOnInit() {
        MeteorObservable.subscribe("userList").subscribe(()=>{
            this.user = Meteor.user();
        })
        MeteorObservable.subscribe('abc').subscribe(() => {
            this.getCustomerList();
        });
       
        this.checkPerm();

    }
    toAddCustomer() {
        this.router.navigateByUrl('/customers/add');
    }

    loadPage(page) {
        this.page = page
        this.getCustomerList();
    }
    getCustomerList() {
        let isMaster = _.get(this.user,'is_master');
        let query = {};
        if(isMaster==-1){
            query = {'manager':_.get(this.user,'_id')}
        }
        const skip = (this.page - 1) * this.pageSize
        var tmpobj = customers.find(query, {
            skip: skip, limit: this.pageSize
        })
        this.customerList = tmpobj.fetch();
        console.log(this.customerList)
        var cusor = customers.find();
        this.collectionSize = cusor.count();

    }
    hidePhone(num:string ){
        return num.substr(0,3)+"****"+num.substr(7)
    }
}
