import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IonicModule} from 'ionic-angular';

import {MonthDatePickerInputComponent} from './month-date-picker-input.component';

export {MonthDateAdapter} from './month-date-adapter-input';
export {MonthDatePickerInputComponent,} from './month-date-picker-input.component';
export {MonthDateStruct} from './month-date-struct-input';

@NgModule({
  imports:
      [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, IonicModule],
  declarations: [MonthDatePickerInputComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [MonthDatePickerInputComponent],

})
export class MonthDatePickerInputModule {
}
