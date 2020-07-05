import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {IonicModule} from 'ionic-angular';
import { UserListComponent } from './lists/user-list.component';
import { RoleUserModuleComponent } from './role/role-user.component';
import { UserEditComponnet } from './edit/user_edit.component';
const routes: Routes = [

  {
    path:'',
    component:UserListComponent
  },
  {
    path:':id/role',
    component:RoleUserModuleComponent
  },
  {
    path:':id/edit',
    component:UserEditComponnet
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
  declarations: [RoleUserModuleComponent,UserListComponent,UserEditComponnet],

})
export class UserPageModule {}
