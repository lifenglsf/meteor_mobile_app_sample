import {Routes,RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { Register } from './login/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes:Routes = [
  { path: 'todoAdd',loadChildren: () => import('./todo-add/todo-add.module').then(m => m.TodoAddModule)},
  { path: 'todoList',loadChildren: () => import('./todo-list/todo-list.module').then(m => m.TodoListModule)},
  { path: 'customers',loadChildren: () => import('./customers/customers.module').then(m => m.CustomersPageModule),canActivate: [AuthGuard]},
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
  { path: '**', component: PageNotFoundComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes),IonicModule],
  exports: [RouterModule],
  declarations:[PageNotFoundComponent,Register,LoginComponent]

})
export class AppRoutingModule { }