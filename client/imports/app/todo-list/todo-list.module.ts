//import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';

@NgModule({
  imports: [
    //IonicModule,
    CommonModule,
    //FormsModule,
    RouterModule.forChild([{ path: '', component: TodoListComponent }])
  ],
  declarations: [TodoListComponent]
})
export class TodoListModule {}