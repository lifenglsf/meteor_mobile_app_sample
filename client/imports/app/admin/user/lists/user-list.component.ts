import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';
import * as _ from 'lodash'
import { Meteor } from 'meteor/meteor';
import { roles } from 'imports/collections/role';
import { BaseComponnet } from 'client/imports/app/base.component';
@Component({
    selector: 'app-users-list',
    templateUrl: 'user-list.component.html',
})



export class UserListComponent extends BaseComponnet implements OnInit {
    userList: any;
    demo: any;
    page = 1;
    pageSize = 1;
    collectionSize: any;
    roleByPK:any;
    componentModule="admin_user";
    componentAction="list"
    constructor(protected router: Router) {
        super();
    }

    ngOnInit() {
        MeteorObservable.subscribe('roleList').subscribe(() => {
            this.roleByPK =_.keyBy(roles.find().fetch(),'_id');
        });
        MeteorObservable.subscribe('userList').subscribe(() => {
            this.getUserList();
        });
    }
  

    loadPage(page) {
        this.page = page
        this.getUserList();
    }
    getUserList() {
        const skip = (this.page - 1) * this.pageSize
        const roleByPK=this.roleByPK
        var tmpobj = Meteor.users.find({}, {
            skip: skip, limit: this.pageSize,transform:(obj)=>{
                var role = _.get(obj,'role')
                console.log(role)
                if(role!=undefined && role.length>0){
                    var rolename = [];
                    _.forEach(role,(val)=>{
                        var roleobj = roleByPK[val]
                        if(roleobj){
                            rolename.push(_.get(roleByPK[val],'name'))

                        }
                    })
                    obj.rolename = _.join(rolename,',')
                }
                return obj;
            }
        })
        this.userList = tmpobj.fetch();
        console.log(this.userList);
        var cusor = Meteor.users.find();
        this.collectionSize = cusor.count();

    }


}
