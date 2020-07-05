import { OnInit, Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';
import {_} from 'lodash'
import { CustomerCommon } from 'client/imports/app/customers/customer.common';
import { AlertController } from 'ionic-angular';
import { roles } from 'imports/collections/role';
import { UserService } from 'client/imports/service/userService';
import { BaseComponnet } from 'client/imports/app/base.component';
import { PopUp } from 'client/imports/app/popup/popup';
@Component({
    selector: 'app-roles-user-list',
    templateUrl: 'role-user.component.html',
    providers:[UserService,CustomerCommon,PopUp]

})
export class RoleUserModuleComponent extends BaseComponnet implements OnInit{
    roleList: any;
    roleUser={module:[]};
    role=[];
    user:any;
    demo: any;
    page = 1;
    pageSize = 1;
    collectionSize: any;
    componentModule="admin_user";
    componentAction="set_role";
    constructor(protected router: Router,private activeRouter:ActivatedRoute,private userService:UserService,public customerCommon: CustomerCommon, public alertController: AlertController,protected popup:PopUp ) {
        super();
    }
    ngOnInit(): void {
        MeteorObservable.subscribe('userList').subscribe(() => {
            this.getUser();
        });
        MeteorObservable.subscribe('roleList').subscribe(() => {
            this.getRoleList();
        });
    }
    toRoleList() {
        this.router.navigateByUrl('/admin/role');
    }
    check(){
        var roleId=arguments[0];
        var role = _.get(this.user,'role')
        if(role){
            if(role.indexOf(roleId)!=-1){
                return "checked";
            }
        }
        
    }
    
    getUser(){
        const urlData=this.activeRouter.snapshot.params
        const id = _.get(urlData,'id')
        this.user=Meteor.users.findOne({_id:id})
    }
    getRoleList() {

        var tmpobj = roles.find({})
        this.roleList = tmpobj.fetch();

    }
    async addRoleModule(){
        try {
            const urlData=this.activeRouter.snapshot.params
            const id = _.get(urlData,'id')
            const res=this.userService.updateUser(id,{'role':this.role})
            let title = '设置用户角色';
            var subTitle = '设置用户角色成功';
            let isError=false;
            let url="";
            if(_.has(res,'error')){
                subTitle = '设置用户角色失败,失败原因:'+_.get(res,'message');
                isError=true;
            }else{
                url='/admin/user';
            }
            this.popup.addPopUp(this.alertController,isError,2,title,subTitle,url,this.router);
          } catch (error) {
              console.log(error)
          }
        
    }
   
    getSelectedValue(){
        const roleId = arguments[0]
        const isCheck = arguments[1].target.checked
        if(this.user.role != undefined && this.user.role.length>0){
            this.role = _.get(this.user,'role');
        }
        if(isCheck){
            const index = this.role.indexOf(roleId)
            if(index == -1){
                this.role.push(roleId)
            }
            console.log(this.role)
        }else{
            const len = this.role.length
            if(len == 1){
                this.role=[]
            }
            const index = this.role.indexOf(roleId)
            this.role.splice(index,1)
        }
    }
}