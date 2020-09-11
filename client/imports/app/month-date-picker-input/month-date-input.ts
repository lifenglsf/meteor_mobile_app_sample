import { toInteger } from './util';

export class MonthDate{
    year:number;
    month:number;
    constructor(year?:number,month?:number){
      this.year=toInteger(year)
      this.month=toInteger(month)
    }
}