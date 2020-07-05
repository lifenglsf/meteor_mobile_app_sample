import { Component, OnInit, Injectable } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import * as _ from 'lodash';
import { AlertController} from 'ionic-angular';
import { Router } from '@angular/router';
import { ModuleService } from 'client/imports/service/moduleService';
import { PopUp } from 'client/imports/app/popup/popup';
@Component({
  selector: 'ngbd-datepicker',
  templateUrl: './modules-add.component.html',
  styleUrls: ['./modules-add.component.scss'],
  providers:[ModuleService,PopUp]
})
@Injectable()
export class ModulesAddComponent implements OnInit {
  module ={
    "module_name":"",
    "module_code":"",
    "module_action":[{"code":""}]
  };
  constructor(public alertController:AlertController,private router:Router,public moduleService:ModuleService,public popup:PopUp) {
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
  
  async addModule(){
  try {
      _.set(this.module,'manager',Meteor.userId());
      var modules={}
      modules["module_name"] = this.module.module_name
      modules["module_code"]=this.module.module_code
      modules["manager"] = _.get(this.module,"manager")
      var modulecode = _.get(this.module,"module_action")
      var code = _.map(modulecode,"code")
      modules["module_action"] = code
      console.log(modules) 
      const res = await this.moduleService.addModule(modules)
      let title = '添加module记录';
            var subTitle = '添加module记录成功';
            let isError=false;
            let url="";
            if(_.has(res,'error')){
                subTitle = '添加module记录失败,失败原因:'+_.get(res,'message');
                isError=true;
            }else{
                url='/admin/module';
            }
            this.popup.addPopUp(this.alertController,isError,1,title,subTitle,url,this.router);
    } catch (error) {
    }
  
  }
  addModuleAction(){
    console.log(this)
    this.module.module_action.push({"code":""})
      
  }
  removeModuleAction(i){
    this.module.module_action.splice(i, 1);
  }
}
