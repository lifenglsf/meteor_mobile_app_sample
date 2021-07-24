import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';
import * as _ from 'lodash'
import { roles } from 'imports/collections/role';
@Component({
    selector: 'app-roles-list',
    templateUrl: 'roles-list.component.html',
    styleUrls: ['roles-list.component.scss'],
})



export class RolesListComponent implements OnInit {
    roleList: any;
    demo: any;
    page = 1;
    pageSize = 1;
    collectionSize: any;
    constructor(private router: Router) {
    }

    ngOnInit() {
        MeteorObservable.subscribe('roleList').subscribe(() => {
            this.getRoleList();
        });

    }
    toAddRole() {
        this.router.navigateByUrl('/admin/role/add');
    }

    loadPage(page) {
        this.page = page
        this.getRoleList();
    }
    getRoleList() {
        const skip = (this.page - 1) * this.pageSize

        var tmpobj = roles.find({}, {
            skip: skip, limit: this.pageSize
        })
        this.roleList = tmpobj.fetch();
        var cusor = roles.find();
        this.collectionSize = cusor.count();

    }


}
