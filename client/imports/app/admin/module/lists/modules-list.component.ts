import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { modules } from '../../../../../../imports/collections/module';
import { MeteorObservable } from 'meteor-rxjs';
import * as _ from 'lodash'
@Component({
    selector: 'app-modules-list',
    templateUrl: 'modules-list.component.html',
    styleUrls: ['modules-list.component.scss'],
})



export class ModulesListComponent implements OnInit {
    moduleList: any;
    demo: any;
    page = 1;
    pageSize = 1;
    collectionSize: any;
    constructor(private router: Router) {
    }

    ngOnInit() {
        MeteorObservable.subscribe('moduleList').subscribe(() => {
            this.getModuleList();
        });

    }
    toAddModule() {
        this.router.navigateByUrl('/admin/module/add');
    }

    loadPage(page) {
        this.page = page
        this.getModuleList();
    }
    getModuleList() {
        const skip = (this.page - 1) * this.pageSize
        var tmpobj = modules.find({}, {
            skip: skip, limit: this.pageSize
        })
        this.moduleList = tmpobj.fetch();
        var cusor = modules.find();
        this.collectionSize = cusor.count();
    }
}
