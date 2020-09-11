import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CustomerService} from 'client/imports/service/customerService';
import {customers} from 'imports/collections/customer';
import {AlertController} from 'ionic-angular';
import * as _ from 'lodash';
import {MeteorObservable} from 'meteor-rxjs';
import {Subscription} from 'rxjs';

import {BaseComponnet} from '../../base.component';
import {PopUp} from '../../popup/popup';

@Component({
  templateUrl: './orders-add.component.html',
  selector: 'ng-orders-add',
  providers: [CustomerService, PopUp]
})

export class OrdersAdd extends BaseComponnet implements OnInit, OnDestroy {
  companyList: any;
  orders = {};
  componentModule = 'orders';
  componentAction = 'add';
  private meteorSubscription: Subscription;
  ngOnInit() {
    this.meteorSubscription =
        MeteorObservable.subscribe<any>('abc').subscribe(() => {
          this.companyList =
              customers.find({}, {fields: {'_id': 1, company: 1}}).fetch();
        });
    let invoiceConfirm = document.getElementById('fee_invoice_confirm');
    _.set(invoiceConfirm, 'disabled', true);
    // this.checkPerm();
  }
  constructor(
      public customerService: CustomerService, public popup: PopUp,
      public alertControl: AlertController, public router: Router) {
    super();
  }
  check_valid($event) {
    console.log($event)
  }
  changeInvoice(event) {
    const invoiceConfirm = document.getElementById('fee_invoice_confirm');
    if (event.target.checked) {
      _.set(invoiceConfirm, 'disabled', false);
    } else {
      _.set(invoiceConfirm, 'disabled', true);
    }
  }
  test($event) {
    console.log('changed')
  }
  valueChange(data) {
    console.log('aaaaaaa')
  }
  async addOrder() {
    try {
      _.set(this.orders, 'manager', Meteor.userId());
      console.log(this.orders)
      const res = await this.customerService.addOrder(this.orders);
      let title = '添加缴费记录';
      var subTitle = '添加缴费记录成功';
      let isError = false;
      let url = '';
      if (_.has(res, 'error')) {
        subTitle = '添加支付记录失败,失败原因:' + _.get(res, 'message');
        isError = true;
      } else {
        url = '/orders';
      }
      this.popup.addPopUp(
          this.alertControl, isError, 1, title, subTitle, url, this.router);
    } catch (error) {
    }
  }
  ngOnDestroy() {
    this.meteorSubscription.unsubscribe()
  }
}