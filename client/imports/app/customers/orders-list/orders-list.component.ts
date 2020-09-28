import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {customers} from 'imports/collections/customer';
import {orders} from 'imports/collections/orders';
import * as _ from 'lodash';
import {MeteorObservable} from 'meteor-rxjs';
import {Subscription} from 'rxjs';

import {BaseComponnet} from '../../base.component';

@Component({templateUrl: './orders-list.component.html'})
export class OrdersListComponent extends BaseComponnet implements OnInit,
                                                                  OnDestroy {
  private ordersList;
  private companyList;
  private page = 1;
  private pageSize = 1;
  collectionSize: any;
  private subscription: Subscription;
  private osubscription: Subscription
  componentModule = 'orders';
  componentAction = 'list';
  constructor(public router: Router, public activitedRouter: ActivatedRoute) {
    super();
  }
  ngOnInit(): void {
    this.subscription = MeteorObservable.subscribe('abc').subscribe(
        () => {
            // this.companyList = customers.find().fetch();
        });
    this.osubscription =
        MeteorObservable.subscribe('orders.list').subscribe(() => {
          this.getOrdersList();
        })
  }
  loadPage(page) {
    this.page = page;
    this.getOrdersList();
  }
  getOrdersList() {
    var params = this.activitedRouter.snapshot.params
    var companyId = _.get(params, 'id');
    var query = {};
    if (companyId) {
      _.set(query, 'company', companyId);
    }
    console.log(params)
    const skip = (this.page - 1) * this.pageSize
    var tmpobj = orders.find(query, {
      skip: skip,
      limit: this.pageSize,
      transform: function(obj) {
        console.log(obj);
        if (_.has(obj, 'fee_date')) {
          if (obj.fee_date.month < 10) {
            obj.fee_date.month = '0' + obj.fee_date.month;
          }
          if (obj.fee_date.day < 10) {
            obj.fee_date.day = '0' + obj.fee_date.day;
          }
          obj.convertFeeDate = obj.fee_date.year + '-' + obj.fee_date.month +
              '-' + obj.fee_date.day;
        }
        let tmpPeriodStart = ''
        let tmpPeriodEnd = ''
        if (_.has(obj, 'start_date')) {
          if (obj.start_date.month < 10) {
            obj.start_date.month = '0' + obj.start_date.month;
          }

          tmpPeriodStart = obj.start_date.year + '-' + obj.start_date.month;
        }
        obj.convertPeriodDate = '-'
        if (_.has(obj, 'end_date')) {
          let endDate = _.get(obj, 'end_date');
          if (_.has(endDate, 'year')) {
            let year = _.get(endDate, 'year');
            let month = _.get(endDate, 'month') + 1;
            let mon = month < 10 ? '0' + month : month;
            tmpPeriodEnd = year + '-' + month;
          } else {
            tmpPeriodEnd = endDate
          }
        }
        if (tmpPeriodStart != '' && tmpPeriodEnd != '') {
          obj.convertPeriodDate = tmpPeriodStart + '至' + tmpPeriodEnd
        }
        switch (obj.option) {
          case '1':
            obj.convertOption = '现金-w';
            break;
          case '2':
            obj.convertOption = '现金-z';
            break;
          case '3':
            obj.convertOption = '银行';
            break;
          default:
            obj.convertOption = '未知的支付方式'
        }
        const invoice = _.get(obj, 'fee_invoice', false);
        const invoiceAc = _.get(obj, 'fee_invoice_confirm', false);
        let invoiceStr = '';
        if (invoice) {
          invoiceStr += '是   ';
        } else {
          invoiceStr += '否   '
        }
        if (invoiceAc) {
          invoiceStr += '是';
        } else {
          invoiceStr += '否';
        }
        obj.convertInvoice = invoiceStr;
        obj.companyName =
            _.get(customers.findOne({_id: obj.company}), 'company')
        return obj;
      }
    });
    this.ordersList = tmpobj.fetch();
    var cusor = orders.find(query);
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