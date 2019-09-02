import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { customers } from '../../../../../imports/collections/customer';
import { MeteorObservable } from 'meteor-rxjs';
import * as _ from 'lodash'
import { Meteor } from 'meteor/meteor';
@Component({
    selector: 'app-customers-list',
    templateUrl: 'customers-list.component.html',
    styleUrls: ['customers-list.component.scss', '../../../../public/scss/bootstrap.scss'],
})



export class CustomersListComponent implements OnInit {
    customerList: any;
    demo: any;
    page = 1;
    pageSize = 1;
    collectionSize: any;
    constructor(private router: Router) {
    }

    ngOnInit() {
        MeteorObservable.subscribe('abc').subscribe(() => {
            this.getCustomerList();
        });

    }
    toAddCustomer() {
        this.router.navigateByUrl('/customers/add');
    }

    loadPage(page) {
        this.page = page
        this.getCustomerList();
    }
    getCustomerList() {
        const skip = (this.page - 1) * this.pageSize

        var tmpobj = customers.find({}, {
            skip: skip, limit: this.pageSize
        })
        this.customerList = tmpobj.fetch();
        var cusor = customers.find();
        this.collectionSize = cusor.count();

    }


}
