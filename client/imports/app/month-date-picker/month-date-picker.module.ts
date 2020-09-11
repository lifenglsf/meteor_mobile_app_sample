import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {IonicModule} from 'ionic-angular';
import { MonthDatePickerComponent,  } from './month-date-picker.component';
export { MonthDatePickerComponent, } from './month-date-picker.component';
export {MonthDateStruct} from './month-date-struct'
export {MonthDateAdapter} from './month-date-adapter'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    IonicModule
  ],
  declarations: [MonthDatePickerComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
exports:[MonthDatePickerComponent],
  
})
export class MonthDatePickerModule {}
