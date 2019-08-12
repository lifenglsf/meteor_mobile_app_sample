import { AlertController } from 'ionic-angular';
import * as _ from 'lodash';
import { Router } from '@angular/router';
export class PopUp{
    addPopUp(alertController:AlertController,ok,cancel,title,subTitle,router:Router){
        let alert;
        var okbtn:any,cancelbtn:any;
        var btn = [];
        if(ok){
            okbtn = {
                "text":ok.text,
                handler:ok.callback,
                router:router
            };
            btn = _.concat(btn,okbtn);
        }
        if(cancel){
            cancelbtn = {
                text:cancel.text,
                handler:cancel.callback,
                router:router
            }
            btn =_.concat(btn,cancelbtn);
        }
        if((!ok) && (!cancel)){
            btn =_.concat(btn,'ok')
        }
        alert =alertController.create({
            title:title,
            subTitle:subTitle,
            buttons:btn
          })
        alert.present()
    }
}