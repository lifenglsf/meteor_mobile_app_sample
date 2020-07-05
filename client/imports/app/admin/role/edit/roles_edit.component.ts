import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';
import * as _ from 'lodash'
import { AlertController } from 'ionic-angular';
import { roles } from 'imports/collections/role';
import { RoleService } from 'client/imports/service/roleService';
import { PopUp } from 'client/imports/app/popup/popup';
@Component({
    templateUrl: '../add/roles-add.component.html',
    providers:[RoleService,PopUp]
})
export class RolesEditComponnet implements OnInit {
    public role = {}
    constructor(public router: ActivatedRoute, public roleService: RoleService, public alertController: AlertController, public route: Router,protected popup:PopUp) {
    }
    ngOnInit() {
        MeteorObservable.subscribe('roleList').subscribe(() => {
            const data = this.router.snapshot.params
            this.role = this.findRole(_.get(data, 'id'));
        });
    }
    findRole(id) {
        return roles.findOne({ _id: id });
    }
    addRole() {
        try {
          const id = _.get(this.role,'_id');
            _.unset(this.role,'_id');
            const res = this.roleService.updateRole(id,this.role)
            let title = '编辑角色记录';
            var subTitle = '编辑角色记录成功';
            let isError=false;
            let url="";
            if(_.has(res,'error')){
                subTitle = '编辑角色记录失败,失败原因:'+_.get(res,'message');
                isError=true;
            }else{
                url='/admin/role';
            }
            this.popup.addPopUp(this.alertController,isError,1,title,subTitle,url,this.route);

        } catch (error) {
        }

    }
}