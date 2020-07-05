import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { CustomerService } from 'client/imports/service/customerService';
import *  as _ from 'lodash';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
@Component({
    templateUrl: "register.compnent.html",
    providers: [CustomerService]
})
export class Register implements OnInit {
    users = {}
    registerForm: FormGroup;
    constructor(public alertControl: AlertController, public customerService: CustomerService, public router: Router) {

    }
    ngOnInit() {
        if (Meteor.userId()) {
            this.router.navigateByUrl('/customers');
        } else {
            this.registerForm = new FormGroup({
                'username': new FormControl(null, [
                    Validators.required
                ]),
                'email': new FormControl(null, [
                    Validators.required,
                    Validators.email
                ]),
                'password': new FormControl(null, [
                    Validators.required
                ])
            });
        }


    }
    async registerUser() {
        if (this.registerForm.invalid) {
            const alert = this.alertControl.create({
                title: "注册用户",
                subTitle: "请检查您输入的表格的内容",
                buttons: ['OK']
            });
            alert.present();
        } else {
            const res = await this.customerService.callWithPromise('users.create', this.registerForm.value);
            if (_.get(res, 'error')) {
                const alert = this.alertControl.create({
                    title: "注册用户",
                    subTitle: "注册失败，失败原因" + _.get(res, 'reason'),
                    buttons: ['OK']
                })
                alert.present()
            } else {
                this.registerForm.reset();
                const alert = this.alertControl.create({
                    title: "注册用户",
                    subTitle: "注册成功",
                    buttons: [{
                        text: "ok",
                        handler: () => {
                           this.router.navigateByUrl('/login');     
                        }
                    }]
                })
                alert.present()
              

            }
        }


    }
}