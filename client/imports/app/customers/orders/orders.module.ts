import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbDatepickerI18n, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IonicModule} from 'ionic-angular';

import {DatePickZHCN, I18n} from '../../datepick_language/zh';
import {MonthDatePickerModule} from '../../month-date-picker/month-date-picker.module';
import {OrdersAdd} from '../orders-add/orders-add.component';
import {OrdersEdit} from '../orders-edit/orders-edit.component';
import {OrdersListComponent} from '../orders-list/orders-list.component';

const routes: Routes = [
  {path: '', component: OrdersListComponent},
  {path: 'add', component: OrdersAdd},
  {path: ':id', component: OrdersListComponent},
  {path: 'edit/:id', component: OrdersEdit}


];

@NgModule({
  imports: [
    CommonModule, FormsModule, NgbModule, RouterModule.forChild(routes),
    IonicModule, MonthDatePickerModule
  ],
  declarations: [OrdersAdd, OrdersListComponent, OrdersEdit],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: DatePickZHCN}]

})
export class OrderssPageModule {
}
