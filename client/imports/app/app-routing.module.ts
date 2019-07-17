import {Routes,RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';


const routes:Routes = [
  { path: 'todoAdd',loadChildren: () => import('./todo-add/todo-add.module').then(m => m.TodoAddModule)},
  { path: 'todoList',loadChildren: () => import('./todo-list/todo-list.module').then(m => m.TodoListModule)},
  { path: 'customers',loadChildren: () => import('./customers/customers.module').then(m => m.CustomersPageModule)},
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations:[PageNotFoundComponent]

})
export class AppRoutingModule { }