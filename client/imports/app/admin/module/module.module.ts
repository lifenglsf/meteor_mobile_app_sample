import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IonicModule} from 'ionic-angular';

import {ModulesAddComponent} from './add/modules-add.component';
import {ModulesListComponent} from './lists/modules-list.component';

const routes: Routes = [
  {path: 'add', component: ModulesAddComponent},
  {path: '', component: ModulesListComponent}
];

@NgModule({
  imports: [
    CommonModule, FormsModule, NgbModule, RouterModule.forChild(routes),
    IonicModule
  ],
  declarations: [ModulesAddComponent, ModulesListComponent],

})
export class ModulePageModule {
}
