import {Routes,RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { Register } from './login/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PermDeniedComponent } from './perm/perm.component';

const routes:Routes = [
  { path: 'todoAdd',loadChildren: () => import('./todo-add/todo-add.module').then(m => m.TodoAddModule)},
  { path: 'todoList',loadChildren: () => import('./todo-list/todo-list.module').then(m => m.TodoListModule)},
  { path: 'customers',loadChildren: () => import('./customers/customers.module').then(m => m.CustomersPageModule),canActivate: [AuthGuard]},
  { path: 'orders',loadChildren: () => import('./customers/orders/orders.module').then(m => m.OrderssPageModule),canActivate: [AuthGuard]},
  { path: 'admin/module',loadChildren: () => import('./admin/module/module.module').then(m => m.ModulePageModule),canActivate: [AuthGuard]},
  { path: 'admin/role',loadChildren: () => import('./admin/role/role.module').then(m => m.RolePageModule),canActivate: [AuthGuard]},
  { path: 'admin/user',loadChildren: () => import('./admin/user/user.module').then(m => m.UserPageModule),canActivate: [AuthGuard]},

  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  },
  {
    path:'register',
    component:Register
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'403',
    component:PermDeniedComponent

  },
  { path: '**', component: PageNotFoundComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes),IonicModule],
  exports: [RouterModule],
  declarations:[PageNotFoundComponent,Register,LoginComponent,PermDeniedComponent]

})
export class AppRoutingModule { }