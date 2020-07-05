import {Injectable} from '@angular/core';
@Injectable()
export class TimeFormat {
    /**
     * 
     * @param event 
     * @param type 2为md，3为ym,其他为ymd
     */
    format(event,type):string{
        var month = event.month
        if (month<10){
            month="0"+month
        }
        var day=event.day
        if(day<10){
            day="0"+day
        } 
        var year=event.year
        var res=year+'-'+month+'-'+day
        if(type ==2){
            res=month+"-"+day
        }else if(type == 3){
            res=year+'-'+month
        }
        console.log(res)
       
        return res
        
    }
}