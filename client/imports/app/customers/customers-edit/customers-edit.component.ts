import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';
import { customers } from 'imports/collections/customer';
import * as _ from 'lodash'
import { CustomerService } from 'client/imports/service/customerService';
import { CustomerCommon } from '../customer.common';
import { AlertController } from 'ionic-angular';
@Component({
    templateUrl: '../customers-add/customers-add.component.html',
    providers:[CustomerService,CustomerCommon]
})
export class CustomersEditComponnet implements OnInit {
    public customer = {}
    constructor(public router: ActivatedRoute, public customerService: CustomerService, public customerCommon: CustomerCommon, public alertController: AlertController, public route: Router) {
    }
    ngOnInit() {
        MeteorObservable.subscribe('abc').subscribe(() => {
            const data = this.router.snapshot.params
            this.customer = this.findCustomer(_.get(data, 'id'));
            console.log(this.customer);
        });
    }
    findCustomer(id) {
        return customers.findOne({ _id: id });
    }
    addCustomer() {
        try {
            const res = this.customerService.addCustomer(this.customer)
            this.customerCommon.addCustomerPopup(res, this.alertController, this.route)

        } catch (error) {
            console.log(error);
        }

    }
}