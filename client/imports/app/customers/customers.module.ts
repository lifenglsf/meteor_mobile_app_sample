import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CustomersPage } from './customers.page';
import {CustomersAddComponent} from './customers-add/customers-add.component';
import {CustomersListComponent} from './customers-list/customers-list.component';
import { NgbDate, NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {NgbDateMMDDParserFormatter} from '../date.provider/format.provider';
const routes: Routes = [
  {
    path: '',
    component: CustomersListComponent
  },
  {
    path: 'add',
    component: CustomersAddComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomersAddComponent,CustomersListComponent],
  providers:[{provide:NgbDateParserFormatter,useClass:NgbDateMMDDParserFormatter}]
})
export class CustomersPageModule {}
