import { AlertController } from 'ionic-angular';
import * as _ from 'lodash';
import { Router } from '@angular/router';
export class PopUp{
    addPopUp(alertController:AlertController,isError,type,title,subTitle,url,router:Router){
        let alert;
        var okbtn:any,cancelbtn:any;
        var btn = [];
        let ok={};
        let cancel={};
        if(isError){
            ok=undefined;
            cancel=undefined
            btn =_.concat(btn,'ok')
        }else{
            _.set(cancel,'text','去列表');
            _.set(cancel,'callback',function(){console.log(this);this.router.navigateByUrl(url)});
            if(type ==1){//添加
                okbtn = {
                    "text":"继续添加",
                    handler:function(){location.reload()},
                    router:router
                };
                btn = _.concat(btn,okbtn);
            }else{//编辑
                ok=undefined;
            }
            cancelbtn = {
                text:"去列表",
                handler:function(){this.router.navigateByUrl(url)},
                router:router
            }
            btn =_.concat(btn,cancelbtn);
        }
        alert =alertController.create({
            title:title,
            subTitle:subTitle,
            buttons:btn
          })
        alert.present()
    }
}