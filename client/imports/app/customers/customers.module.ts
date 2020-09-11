import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {CustomersAddComponent} from './customers-add/customers-add.component';
import {CustomersListComponent} from './customers-list/customers-list.component';
import {  NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {IonicModule} from 'ionic-angular';
import { CustomersEditComponnet } from './customers-edit/customers-edit.component';
const routes: Routes = [
  {
    path: '',
    component: CustomersListComponent
  },
  {
    path: 'add',
    component: CustomersAddComponent
  },
  {
    path:'edit/:id',
    component:CustomersEditComponnet
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
  declarations: [CustomersAddComponent,CustomersListComponent,CustomersEditComponnet],

})
export class CustomersPageModule {}
