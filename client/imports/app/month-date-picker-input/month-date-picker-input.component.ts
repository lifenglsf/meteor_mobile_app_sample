import {ChangeDetectorRef, Component, Directive, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges, ViewChild,} from '@angular/core';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {isNumber} from 'ionic-angular/umd/util/util';

import {MonthDateStructAdapter} from './month-date-adapter-input';
import {MonthDate} from './month-date-input';
import {MonthDatePickerInputConfig} from './month-date-picker-input-config';
import {MonthDateStruct} from './month-date-struct-input';

/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
@Component({
  selector: 'month-date-picker-input',
  templateUrl: './month-date-picker.component-input.html',
  styleUrls: ['./month-date-picker.component-input.scss'],
  exportAs: 'monthDatePickerInput',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthDatePickerInputComponent),
      multi: true
    },
    MonthDateStructAdapter
  ]
})


@Directive({
  selector: 'input[monthDatePickerInput]',
  exportAs: 'monthDatePickerInput',
  host: {
    '(input)': 'manualDateChange($event.target.value)',
    '(change)': 'manualDateChange($event.target.value, true)',
    '(blur)': 'onBlur()',
    '[disabled]': 'disabled'
  }
})
export class MonthDatePickerInputComponent implements ControlValueAccessor,
                                                      OnChanges {
  private disabled: boolean
  model: MonthDate;
  @Input()
  oDate: {year: number, month: number}
  @Output() valueChange = new EventEmitter()

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

  @ViewChild('calendarPanel') calendar: NgbDropdown;
  private inputValue: string
  autoFillValue = (_: any) => {};
  _renderer: any;
  _elRef: any;
  _cRef: any;
  _dateAdapter: any;
  _inputValue: string;
  constructor(
      private adapter: MonthDateStructAdapter, private cd: ChangeDetectorRef,
      private config: MonthDatePickerInputConfig) {
    this.separator = this.mask.replace(/m|y|M/gi, '');
  }
  valueChanged() {
    this.valueChange.emit(this.model)
  }


  onChange = (_: any) => {};
  onTouched = () => {};


  writeValue(value: MonthDateStruct) {
    if (value != null) {
      console.log('write value', value)
      const structValue = this.adapter.fromModel(value);
      this.model = structValue ?
          new MonthDate(structValue.year, structValue.month) :
          new MonthDate()
      if (!this.year && (!structValue || !isNumber(structValue.year))) {
        this.model.year = (new Date()).getFullYear()
      }
      if (!this.month && (!structValue || !isNumber(structValue.month))) {
        this.model.year = (new Date()).getMonth()
      }
      this.cd.markForCheck()
    } else {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()
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
    this.onChange(
        this.adapter.toModel({year: this.model.year, month: this.model.month}));
  }


  isOpen() {
    throw new Error('Method not implemented.');
  }
  _onTouched() {
    throw new Error('Method not implemented.');
  }

  manualDateChange(value: string, updateView = false) {
    const inputValueChanged = value !== this._inputValue;
    if (inputValueChanged) {
      this._inputValue = value;
      // this.model = this.fromDateStruct(this._parserFormatter.parse(value));
    }
    if (inputValueChanged || !updateView) {
      this.onChange(
          this.model ? this.adapter.toModel(this.model) :
                       (value === '' ? null : value));
    }
    if (updateView && this.model) {
      this.writeModelValue(this._model);
    }
  }
  fromDateStruct(arg0: any): MonthDate {
    throw new Error('Method not implemented.');
  }
  writeModelValue(_model: any) {
    throw new Error('Method not implemented.');
  }
  _model(_model: any) {
    throw new Error('Method not implemented.');
  }
}
