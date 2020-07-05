import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {IonicModule} from 'ionic-angular';
import { RolesAddComponent } from './add/roles-add.component';
import {RolesListComponent} from './lists/roles-list.component'
import { RolesEditComponnet } from './edit/roles_edit.component';
import { RoleModuleComponent } from './module/role-module.component';
const routes: Routes = [
  {
    path: 'add',
    component: RolesAddComponent
  },
  {
    path: 'edit/:id',
    component: RolesEditComponnet
  },
  {
    path:'',
    component:RolesListComponent
  },
  {
    path:':id/module',
    component:RoleModuleComponent
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
  declarations: [RolesAddComponent,RolesListComponent,RolesEditComponnet,RoleModuleComponent],

})
export class RolePageModule {}
