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
            skip: skip, limit: this.pageSize, transform: function(obj) {
                if (_.has(obj, 'fee_date')) {
                    if (obj.frequency == 1) {
                        obj.frequencyConvert = '每月';
                    } else if (obj.frequency == 3) {
                        obj.frequencyConvert = '每季';
                    } else if (obj.frequency == 6) {
                        obj.frequencyConvert = '每半年';
                    } else if (obj.frequency == 12) {
                        obj.frequencyConvert = '每年';
                    }

                    obj.buildNextPayTime = (feeDate, rate) => {
                        var now = new Date();
                        var nowYear = now.getFullYear();
                        var nowMonth = now.getMonth() + 1;
                        var nowDay = now.getDate();
                        var registerMonth = feeDate.month;
                        var registerYear = feeDate.year;
                        var nextMonth;
                        if (nowMonth >= registerMonth) {
                            var interval = nowMonth - registerMonth;

                        } else {
                            var nowMonth = nowMonth + 12;
                        }
                        var mod = interval % rate;
                        if (mod == 0) {
                            mod = parseInt(rate);
                        }
                        nextMonth = nowMonth + mod;
                        if (nextMonth > 12) {
                            nextMonth = nextMonth % 12;

                            nowYear += 1;
                        }

                        if (nextMonth < 10) {
                            nextMonth = '0' + nextMonth;
                        }
                        var next = nowYear + '-' + nextMonth;
                        return next;
                    }

                    obj.nextPay = obj.buildNextPayTime(obj.fee_date, obj.frequency);
                }


                return obj;
            }
        })
        this.customerList = tmpobj.fetch();
        var cusor = customers.find();
        this.collectionSize = cusor.count();

    }


}
