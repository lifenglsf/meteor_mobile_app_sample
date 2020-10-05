import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerCommon} from 'client/imports/app/customers/customer.common';
import {RoleService} from 'client/imports/service/roleService';
import {modules} from 'imports/collections/module';
import {roles} from 'imports/collections/role';
import {AlertController} from 'ionic-angular';
import * as _ from 'lodash'
import {MeteorObservable} from 'meteor-rxjs';

export class BaseComponnet {
  public role = {};
  protected componentModule;
  protected componentAction;
  protected componentRoleList;
  protected componentModuleList;
  protected componentUserList;
  protected router: Router
  ngOnInit() {
    console.log('abc')
  }
  protected checkPerm() {
    console.log('perm')
    MeteorObservable.subscribe('roleList').subscribe(() => {
      this.componentRoleList = _.keyBy(roles.find().fetch(), '_id');
    });
    MeteorObservable.subscribe('userList').subscribe(() => {
      var componentUserList = _.keyBy(Meteor.users.find().fetch(), '_id');
      var role = _.get(componentUserList[Meteor.userId()], 'role')
      var permedModule = [];
      _.each(role, (val) => {
        console.log(
            _.get(this.componentRoleList[val], 'module'), 'componentRoleList');
        permedModule =
            _.union(permedModule, _.get(this.componentRoleList[val], 'module'));
      })
      const actions = this.componentModule + '_' + this.componentAction;
      if (_.indexOf(permedModule, actions) == -1) {
        this.router.navigateByUrl('/403')
      }
      console.log(permedModule);
      console.log(this.componentRoleList)
    });
  }
}