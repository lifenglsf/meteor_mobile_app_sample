import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {  NgbModule, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import {IonicModule} from 'ionic-angular';
import { OrdersAdd } from '../orders-add/orders-add.component';
import { OrdersListComponent } from '../orders-list/orders-list.component';
import { OrdersEdit } from '../orders-edit/orders-edit.component';
import { NgbDateYYYYMMParserFormatter } from '../../date.provider/datetickym.provider';
import { I18n, DatePickZHCN } from '../../datepick_language/zh';
const routes: Routes = [
    {
        path: '',
        component: OrdersListComponent
      },
  {
    path: 'add',
    component: OrdersAdd
  },
  {
    path:":id",
    component:OrdersListComponent
  },
  {
    path:"edit/:id",
    component:OrdersEdit
  }
  

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes),
    IonicModule
  ],
  declarations: [OrdersAdd,OrdersListComponent,OrdersEdit],
  providers:[I18n, {provide: NgbDatepickerI18n, useClass: DatePickZHCN}]

})
export class OrderssPageModule {}
