import { AlertController } from 'ionic-angular';
import * as _ from 'lodash';
import { Router } from '@angular/router';
export class CustomerCommon{
    addCustomerPopup(res,alertController:AlertController,router:Router){
        let alert;
        if(_.has(res,'error')){
           alert =alertController.create({
            title:"添加结果",
            subTitle:_.get(res,'message'),
            buttons:['OK']
          })
          //this.dialog.open(DialogErrorComponent,{width:"800px",data:{message:_.get(res,'message')}})
        }else{
           alert =alertController.create(
           {
            title:"添加结果",
            subTitle:"成功",
            buttons:[
              {
              text:"继续添加",
              handler:()=>{
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
          //this.dialog.open(DialogSuccessComponent)
        }
        alert.present()
    }
}