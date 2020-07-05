import {NgbDateParserFormatter,NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';
@Injectable()
export class NgbDateYYYYMMParserFormatter extends NgbDateParserFormatter{
    parse(value:string):NgbDateStruct{
       
          return null;
    }
    format(date:NgbDateStruct):string{
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
        return date.year+'-'+month;
    }
}