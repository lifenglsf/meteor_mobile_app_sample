import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import {DialogErrorComponent} from '../../dialog/dialog.error.component';
import {DialogSuccessComponent} from '../../dialog/dialog.success.component';
import { MatDialog } from '@angular/material';  
import * as _ from 'lodash';
import { AlertController, NavController, App } from 'ionic-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'ngbd-datepicker',
  templateUrl: './customers-add.component.html',
  styleUrls: ['./customers-add.component.scss'],
})
@Injectable()
export class CustomersAddComponent implements OnInit {
  customer = {};
  constructor(public dialog:MatDialog,public alertController:AlertController,private route:Router) {
    console.log(this);
   }
   callWithPromise = (method, myParameters) => {
    return new Promise((resolve, reject) => {
      Meteor.call(method, myParameters, (err, res) => {
        if (err) resolve(err)
        resolve(res);
      });
    });
  }
  ngOnInit() {}
  async addCustomer(){
    console.log(this.customer);
    try {
      const res = await this.callWithPromise('addCustomer',this.customer);
      console.log(res);
      let alert;
      if(_.has(res,'error')){
         alert =this.alertController.create({
          title:"添加结果",
          subTitle:_.get(res,'message'),
          buttons:['OK']
        })
        //this.dialog.open(DialogErrorComponent,{width:"800px",data:{message:_.get(res,'message')}})
      }else{
         alert =this.alertController.create(
         {
          title:"添加结果",
          subTitle:"成功",
          buttons:[
            {
            text:"继续添加",
            handler:()=>{
                this.customer=null;
            }
          },
          {
            text:"去列表",
            handler:()=>{
              this.route.navigateByUrl('/customers')
            }
          }
        ]
        })
        //this.dialog.open(DialogSuccessComponent)
      }
      alert.present()

    } catch (error) {
      console.log(error);
    }
   
   
    //const dialogRef=dialogs.open(DialogErrorComponent,{width:"800px",data:{message:"134"}});   
     /*Meteor.call('addCustomer',this.customer,function(error,result){
      if(error){
         
         dialogs.open(DialogErrorComponent,{width:"800px",data:{message:"134"}});
        //todo 错误信息
      }else{
        //todo成功信息
      }
    });*/
  }

}
