import { Component, OnInit } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import {DialogErrorComponent} from '../../dialog/dialog.error.component';
import {DialogSuccessComponent} from '../../dialog/dialog.success.component';
import { MatDialog } from '@angular/material';  
import * as _ from 'lodash';
@Component({
  selector: 'ngbd-datepicker',
  templateUrl: './customers-add.component.html',
  styleUrls: ['./customers-add.component.scss'],
})
export class CustomersAddComponent implements OnInit {
  customer = {};
  constructor(public dialog:MatDialog) {
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
      if(_.has(res,'error')){
        this.dialog.open(DialogErrorComponent,{width:"800px",data:{message:_.get(res,'message')}})
      }else{
        this.dialog.open(DialogSuccessComponent)
      }
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
