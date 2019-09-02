import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {  NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {IonicModule} from 'ionic-angular';
import { OrdersAdd } from '../orders-add/orders-add.component';
import { OrdersListComponent } from '../orders-list/orders-list.component';
import { OrdersEdit } from '../orders-edit/orders-edit.component';
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

})
export class OrderssPageModule {}
