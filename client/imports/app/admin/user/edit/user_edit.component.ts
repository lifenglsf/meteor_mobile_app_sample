import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';
import * as _ from 'lodash'
import { AlertController } from 'ionic-angular';
import { CustomerCommon } from 'client/imports/app/customers/customer.common';
import { BaseComponnet } from 'client/imports/app/base.component';
import { PopUp } from 'client/imports/app/popup/popup';
import { UserService } from 'client/imports/service/userService';
@Component({
    templateUrl: 'user-edit.component.html',
    providers:[UserService,CustomerCommon,PopUp]
})
export class UserEditComponnet extends BaseComponnet implements OnInit {
    public user = {}
    constructor(protected activeRouter:ActivatedRoute, public customerCommon: CustomerCommon, public alertController: AlertController, public router: Router,protected popup:PopUp,protected userService:UserService) {
        super();
    }
    ngOnInit() {
        //this.checkPerm()
        MeteorObservable.subscribe('userList').subscribe(() => {
            this.getUser();
        });
    }
    getUser() {
        const urlData=this.activeRouter.snapshot.params
        const id = _.get(urlData,'id')
        this.user=Meteor.users.findOne({_id:id})
    }
    editUser() {
        try {
          const id = _.get(this.user,'_id');
            _.unset(this.user,'_id');
            const res = this.userService.updateUser(id,this.user)
            let title = '设置身份';
            var subTitle = '设置身份成功';
            let isError=false;
            let url="";
            if(_.has(res,'error')){
                subTitle = '设置身份失败,失败原因:'+_.get(res,'message');
                isError=true;
            }else{
                url='/admin/user';
            }
            this.popup.addPopUp(this.alertController,isError,2,title,subTitle,url,this.router);

        } catch (error) {
        }

    }
}