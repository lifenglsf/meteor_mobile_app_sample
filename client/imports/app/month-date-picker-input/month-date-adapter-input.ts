import { Injectable } from '@angular/core';
import { MonthDateStruct } from './month-date-struct-input';
import { isInteger } from './util';

export function MONTH_DATEPICKER_ADAPTER_FACTORY(){
    return new MonthDateStructAdapter()
  }
  /**
 * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding timepicker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
 *
 * @since 2.2.0
 */
  @Injectable({providedIn:'root',useFactory:MONTH_DATEPICKER_ADAPTER_FACTORY})
  
  export abstract class MonthDateAdapter<T>{
    abstract fromModel(value:T):MonthDateStruct;
    abstract toModel(value:T):T;
  }
  @Injectable()
  export class MonthDateStructAdapter extends MonthDateAdapter<MonthDateStruct>{
    fromModel(value: MonthDateStruct): MonthDateStruct {
      return (value && isInteger(value.year) && isInteger(value.month)) ?
       {year:value.year, month: value.month} :
       null;
  
    }
    toModel(value: MonthDateStruct): MonthDateStruct {
      return (value && isInteger(value.year) && isInteger(value.month)) ?
      {year:value.year, month: value.month} :
      null;
    }
    
  }