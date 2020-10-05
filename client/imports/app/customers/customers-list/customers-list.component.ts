import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {orders} from 'imports/collections/orders';
import * as _ from 'lodash'
import {MeteorObservable} from 'meteor-rxjs';
import * as moment from 'moment';

import {customers} from '../../../../../imports/collections/customer';
import {BaseComponnet} from '../../base.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: 'customers-list.component.html',
  styleUrls: [
    'customers-list.component.scss', '../../../../public/scss/bootstrap.scss'
  ],
})



export class CustomersListComponent extends BaseComponnet implements OnInit {
  customerList: any;
  demo: any;
  page = 1;
  pageSize = 1;
  collectionSize: any;
  user: any;
  protected componentModule = 'customers';
  protected componentAction = 'list';
  constructor(protected router: Router) {
    super();
  }

  ngOnInit() {
    MeteorObservable.subscribe('userList').subscribe(() => {
      this.user = Meteor.user();
    })
    MeteorObservable.subscribe('orders.list').subscribe(() => {
      this.getOrdersList();
    });
    MeteorObservable.subscribe('abc').subscribe(() => {
      this.getCustomerList();
    });

    this.checkPerm();
  }
  getOrdersList() {
    var query = {};
    return orders.find(query).fetch();
  }
  toAddCustomer() {
    this.router.navigateByUrl('/customers/add');
  }

  loadPage(page) {
    this.page = page;
    this.getCustomerList();
  }
  getCustomerList() {
    let isMaster = _.get(this.user, 'is_master');
    let query = {};
    if (isMaster == -1) {
      query = { 'manager': _.get(this.user, '_id') }
    }
    const skip = (this.page - 1) * this.pageSize
    var tmpobj = customers.find(query, {
      skip: skip,
      limit: this.pageSize,
      transform: (obj) => {
        let con = orders.findOne(
            {company: obj._id},
            {sort: {end_date: -1}, fields: {start_date: 1, end_date: 1}});
        let startDate = _.get(con, 'start_date');
        console.log(startDate);
        if (startDate) {
          let year = '' + _.get(startDate, 'year');
          let month = _.get(startDate, 'month');
          let m = month < 10 ? '0' + month : month;
          let date = moment(year + '-' + m);
          console.log(date);
          let next = date.add(obj.frequency, 'months')
          let now = moment();
          let nowUnix = now.unix();
          let nextUnix = next.unix();
          console.log(nowUnix, nextUnix);
          obj.isFee = false;
          if (nowUnix > nextUnix) {
            obj.isFee = true;
            obj.nextFee = date.year() + '-' + (date.month() + 1);
          }
        }
        return obj;
      }
    });
    this.customerList = tmpobj.fetch();
    console.log(this.customerList)
    var cusor = customers.find();
    this.collectionSize = cusor.count();
  }
  hidePhone(num: string) {
    if(num){
      return num.substr(0, 3) + '****' + num.substr(7)
    }
    return '-';
  }
}
