import { Component, OnInit, Injectable } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import * as _ from 'lodash';
import { AlertController } from 'ionic-angular';
import { Router } from '@angular/router';
import { RoleService } from 'client/imports/service/roleService';
import { PopUp } from 'client/imports/app/popup/popup';
@Component({
  selector: 'ngbd-datepicker',
  templateUrl: './roles-add.component.html',
  styleUrls: ['./roles-add.component.scss'],
  providers:[RoleService,PopUp]
})
@Injectable()
export class RolesAddComponent implements OnInit {
  role ={};
  constructor(public alertController:AlertController,private router:Router,public roleService:RoleService,protected popup:PopUp) {
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
  
  async addRole(){
  try {
      _.set(this.role,'manager',Meteor.userId());
      const res = await this.roleService.addRole(this.role)
      let title = '添加角色记录';
            var subTitle = '添加角色记录成功';
            let isError=false;
            let url="";
            if(_.has(res,'error')){
                subTitle = '添加角色记录失败,失败原因:'+_.get(res,'message');
                isError=true;
            }else{
                url='/admin/role';
            }
            this.popup.addPopUp(this.alertController,isError,1,title,subTitle,url,this.router);
    } catch (error) {
    }
  
  }

}
