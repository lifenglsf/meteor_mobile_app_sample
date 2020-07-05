import { AlertController } from 'ionic-angular';
import * as _ from 'lodash';
import { Router } from '@angular/router';
export class CustomerCommon{
    addCustomerPopup(res,alertController:AlertController,router:Router,obj){
        let alert;
        if(_.has(res,'error')){
           alert =alertController.create({
            title:"添加结果",
            subTitle:_.get(res,'message'),
            buttons:['OK']
          })
        }else{
           alert =alertController.create(
           {
            title:"添加结果",
            subTitle:"成功",
            buttons:[
              {
              text:"继续添加",
              handler:()=>{
                  document.getElementsByTagName("form")[0].reset()
                  //this.customer=null;
              }
            },
            {
              text:"去列表",
              handler:()=>{
                router.navigateByUrl('/customers')
              }
            }
          ]
          })
        }
        alert.present()
    }
}