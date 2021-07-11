import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {isNumber} from 'ionic-angular/umd/util/util';

import {MonthDate} from './month-date';
import {MonthDateStructAdapter} from './month-date-adapter';
import {MonthDateStruct} from './month-date-struct';

/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
@Component({
  selector: 'month-date-picker',
  templateUrl: './month-date-picker.component.html',
  styleUrls: ['./month-date-picker.component.scss'],
  exportAs: 'monthDatePicker',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthDatePickerComponent),
      multi: true
    },
    MonthDateStructAdapter
  ]
})

export class MonthDatePickerComponent implements ControlValueAccessor,
                                                 OnChanges {
  disabled: boolean;
  model: MonthDate;

  private year: number;
  private month: number;

  isyear: boolean = false;
  incr: number = 0;

  dataTxt: string;
  separator: string;
  monthFirst: boolean;
  place: number;
  months: string[] = [
    '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
    '十月', '十一月', '十二月'
  ];
  // Allow the input to be disabled, and when it is make it somewhat
  // transparent.
  @Input() mask = 'mm-yyyy';
  @Output() valueChange = new EventEmitter();
  @ViewChild('calendarPanel') calendar: NgbDropdown;
  constructor(
      private adapter: MonthDateStructAdapter, private cd: ChangeDetectorRef) {
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.separator = this.mask.replace(/m|y|M/gi, '');
  }

  onChange = (_: any) => {};
  onTouched = () => {};


  writeValue(value: MonthDateStruct) {
    if (value != null) {
      console.log('write value', value)
      const structValue = this.adapter.fromModel(value);
      this.model = structValue ?
          new MonthDate(structValue.year, structValue.month) :
          new MonthDate();
      if (!this.year && (!structValue || !isNumber(structValue.year))) {
        this.model.year = (new Date()).getFullYear()
      }
      if (!this.month && (!structValue || !isNumber(structValue.month))) {
        this.model.year = (new Date()).getMonth()
      }
      this.cd.markForCheck()
    } else {
      const date = new Date()
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      month < 10 ? '0' + month : '' + month
      const defaultDate = {year: year, month: month};
      this.model = defaultDate ?
          new MonthDate(defaultDate.year, defaultDate.month) :
          new MonthDate();
      this.propagateModelChange()
    }
  }

  change(value: string) {
    console.log('change');
    this.propagateModelChange()
    this.setRelatedValue(value)
  }

  selectYearMonth($event, index: number) {
    console.log('select year month')
    if (this.isyear) {
      $event.stopPropagation();
      $event.preventDefault();

      this.model.year = index + this.incr;
      // this.formatData(this.model);
      this.isyear = false;
      this.incr = this.getIncr(this.model.year);
    }
    else {
      this.model.month = index + 1;
      //  this.formatData(this.model);
    }
    this.propagateModelChange();
  }

  nothing($event) {
    $event.stopPropagation();
    $event.preventDefault();
  }
  getIncr(year: number): number {
    return (year - year % 10) - 1;
  }
  formatData(data: MonthDate): string {
    if (data != null) {
      let monthTxt = data.month < 10 ? '0' + data.month : '' + data.month;
      return this.monthFirst ? monthTxt + this.separator + data.year :
                               '' + data.year + this.separator + monthTxt
    }
    return ''
  }
  showYear($event: any, show: boolean) {
    console.log('show year')
    $event.stopPropagation();
    $event.preventDefault();
    this.isyear = !this.isyear;
  }
  addYear($event: any, incr: number) {
    $event.stopPropagation();
    $event.preventDefault();

    let year =
        this.isyear ? this.model.year + 10 * incr : this.model.year + incr;
    console.log(year);
    this.model.year = year;
    this.incr = this.getIncr(year);
    this.propagateModelChange();
  }
  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.propagateModelChange(false);
  }

  private propagateModelChange(touched = true) {
    if (touched) {
      this.onTouched();
    }
    this.setRelatedValue(this.model);
    this.onChange(
        this.adapter.toModel({year: this.model.year, month: this.model.month}));
  }
  setRelatedValue(value){
    console.log("set relate value")
    this.valueChange.emit(value);
  }
}
