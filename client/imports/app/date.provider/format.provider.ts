import {NgbDateParserFormatter,NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';
@Injectable()
export class NgbDateMMDDParserFormatter extends NgbDateParserFormatter{
    parse(value:string):NgbDateStruct{
        console.log(value,'parse');
       
          return null;
    }
    format(date:NgbDateStruct):string{
        console.log(date,'format');
        if(date == null){
            return null;
        }
        var omonth = date.month
        var month;
        if(omonth<10){
            month = '0'+String(omonth)
        }else{
            month = String(omonth);
        }
        return month+'-'+date.day;
    }
}