import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from 'client/imports/service/customerService';
import {customers} from 'imports/collections/customer';
import {orders} from 'imports/collections/orders';
import {AlertController} from 'ionic-angular';
import * as _ from 'lodash';
import {MeteorObservable} from 'meteor-rxjs';
import * as moment from 'moment';
import {Subscription} from 'rxjs';

import {BaseComponnet} from '../../base.component';
import {PopUp} from '../../popup/popup';

@Component({
  templateUrl: '../orders-add/orders-add.component.html',
  selector: 'ng-orders-add',
  providers: [CustomerService, PopUp]
})
export class OrdersEdit extends BaseComponnet implements OnInit, OnDestroy {
  companyList: any;
  orders = {};
  period: any;
  componentAction = 'edit';
  componentModule = 'orders';
  private meteorSubscription: Subscription;
  private ordersSubscription: Subscription;
  ngOnInit() {
    this.meteorSubscription =
        MeteorObservable.subscribe<any>('abc').subscribe(() => {
          this.companyList =
              customers.find({}, {fields: {'_id': 1, company: 1, frequency: 1}})
                  .fetch();
        });
    this.ordersSubscription =
        MeteorObservable.subscribe<any>('orders.list').subscribe(() => {
          const data = this.activedRoute.snapshot.params;
          this.orders = this.findOrder(_.get(data, 'id'));
          let invoice = _.get(this.orders, 'fee_invoice');
          let invoiceConfirm = document.getElementById('fee_invoice_confirm');
          _.set(invoiceConfirm, 'disabled', true);
          if (invoice) {
            _.set(invoiceConfirm, 'disabled', false);
          }
          let company = customers.findOne({_id: _.get(this.orders, 'company')});
          this.period = 0;
          if (company) {
            this.period = _.get(company, 'frequency');
          }

          console.log(this.orders);
        });
    this.checkPerm();
  }
  findOrder(id) {
    return orders.findOne({_id: id}, {
      transform: (obj) => {
        if (!_.has(obj, 'end_date')) {
          _.set(obj, 'end_date', '');
        }
        return obj;
      }
    });
  }
  constructor(
      public customerService: CustomerService, public popup: PopUp,
      public alertControl: AlertController, public router: Router,
      public activedRoute: ActivatedRoute) {
    super();
  }
  changeInvoice(event) {
    const invoiceConfirm = document.getElementById('fee_invoice_confirm');
    if (event.target.checked) {
      _.set(invoiceConfirm, 'disabled', false);
    } else {
      _.set(invoiceConfirm, 'disabled', true);
    }
  }
  async addOrder() {
    try {
      this.getPeriod()
      console.log(this.orders, 'orders form data');
      _.set(this.orders, 'manager', Meteor.userId());
      const id = _.get(this.orders, '_id');
      _.unset(this.orders, '_id');
      const res = await this.customerService.updateOrder(id, this.orders);
      console.log(res);
      let title = '修改缴费记录';
      var subTitle = '修改缴费记录成功';
      let url = '';
      let isError = false;
      if (_.has(res, 'error')) {
        subTitle = '修改支付记录失败,失败原因:' + _.get(res, 'message');
        isError = true;
      } else {
        url = '/orders';
      }
      this.popup.addPopUp(
          this.alertControl, isError, 2, title, subTitle, url, this.router);
    } catch (error) {
    }
  }
  fillPeriodEnd($event) {
    let period = $event.target.selectedOptions[0].dataset.period;
    this.period = period;
  }
  getPeriod() {
    let syear = _.get(_.get(this.orders, 'start_date'), 'year')
    let smonth = _.get(_.get(this.orders, 'start_date'), 'month')
    let smon = smonth < 10 ? '0' + smonth : smonth;
    let preDate = syear + '-' + smon + '-01';
    let end = moment(preDate).add(this.period - 1, 'months');
    let year = end.year();
    let month = end.month();
    month = month + 1;
    let m = month < 10 ? '0' + month : '' + month;
    let endDate = year + '-' + m;
    console.log(month)
    _.set(this.orders, 'end_date', endDate);
  }

  ngOnDestroy() {
    this.meteorSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe()
  }
}