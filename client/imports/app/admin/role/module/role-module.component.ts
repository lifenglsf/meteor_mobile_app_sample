import { OnInit, Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { modules } from 'imports/collections/module';
import { MeteorObservable } from 'meteor-rxjs';
import {_} from 'lodash'
import { RoleService } from 'client/imports/service/roleService';
import { CustomerCommon } from 'client/imports/app/customers/customer.common';
import { AlertController } from 'ionic-angular';
import { roles } from 'imports/collections/role';
import { PopUp } from 'client/imports/app/popup/popup';
@Component({
    selector: 'app-roles-module-list',
    templateUrl: 'role-module.component.html',
    providers:[RoleService,CustomerCommon,PopUp]

})
export class RoleModuleComponent implements OnInit{
    moduleList: any;
    roleModule={module:[]};
    role:any;
    demo: any;
    page = 1;
    pageSize = 1;
    collectionSize: any;
    constructor(private router: Router,private activeRouter:ActivatedRoute,private roleService:RoleService,public customerCommon: CustomerCommon, public alertController: AlertController,protected popup:PopUp ) {
    }
    ngOnInit(): void {
        MeteorObservable.subscribe('moduleList').subscribe(() => {
            this.getModuleList();
        });
        MeteorObservable.subscribe('roleList').subscribe(() => {
            this.getRole();
        });
    }
    toRoleList() {
        this.router.navigateByUrl('/admin/role');
    }
    check(){
        var module=arguments[0];
        var code=arguments[1]
        var roleModule = _.get(this.role,'module')
        if(roleModule){
            if(roleModule.indexOf(module+'_'+code)!=-1){
                return "checked";
            }
        }
        
    }
    loadPage(page) {
        this.page = page
        this.getModuleList();
    }
    getRole(){
        const urlData=this.activeRouter.snapshot.params
        const id = _.get(urlData,'id')
        this.role=roles.findOne({_id:id})
    }
    getModuleList() {

        var tmpobj = modules.find({},{transform:function(obj){
            obj.mcode=[]
            obj.module_action.forEach(element => {
                obj.mcode.push({"code":element})
            });
            return obj;
        }})
        this.moduleList = tmpobj.fetch();
        var cusor = modules.find();
        this.collectionSize = cusor.count();

    }
    async addRoleModule(){
        try {
            const urlData=this.activeRouter.snapshot.params
            const id = _.get(urlData,'id')
            const res=this.roleService.updateRole(id,this.roleModule)
            let title = '设置模块角色';
            var subTitle = '设置模块角色记录成功';
            let isError=false;
            let url="";
            if(_.has(res,'error')){
                subTitle = '设置模块角色记录失败,失败原因:'+_.get(res,'message');
                isError=true;
            }else{
                url='/admin/role';
            }
            this.popup.addPopUp(this.alertController,isError,1,title,subTitle,url,this.router);
          } catch (error) {
          }
        
    }
   
    getSelectedValue(){
        const module = arguments[0]
        const code=arguments[1]
        const isCheck = arguments[2].target.checked
        const mcode = module+'_'+code
        const rouleModule=_.get(this.role,'module')
        if(rouleModule != undefined && rouleModule.length>0){
            this.roleModule.module = rouleModule;
        }
        if(isCheck){
            const index = this.roleModule.module.indexOf(mcode)
            if(index == -1){
                this.roleModule.module.push(mcode)
            }
        }else{
            const len = this.roleModule.module.length
            if(len == 1){
                this.roleModule.module=[]
            }
            const index = this.roleModule.module.indexOf(mcode)
            this.roleModule.module.splice(index,1)
        }
    }
}