import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import * as _ from 'lodash';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { CustomerService } from 'client/imports/service/customerService';
import { CustomerCommon } from '../customers/customer.common';
import { __await } from 'tslib';
@Component({
    templateUrl:"login.component.html",
    providers:[CustomerService]
})
export class LoginComponent implements OnInit{
    loginForm:FormGroup;
    loginSuccess = false;
    constructor(public alertControl:AlertController,public router:Router,public customerService:CustomerService){
        
    }
    ngOnInit(){
        this.loginForm = new FormGroup({
            'username':new FormControl('',[
                Validators.required
            ]),
            'password':new FormControl('',[
                Validators.required
            ])
        });
    }
    async loginUser(){
        if(this.loginForm.invalid){
            const alert = this.alertControl.create({
                title:"登陆",
                subTitle:"登陆失败，请检查输入内容",
                buttons:['OK']
            });
            alert.present();
            
            
        }else{
            /*const res = Meteor.loginWithPassword(_.get(this.loginForm.value,'username'),_.get(this.loginForm.value,'password'),(err)=>{
               
               
            })*/
            const res = await new Promise((resolve, reject) => {
                Meteor.loginWithPassword(
                    _.get(this.loginForm.value,
                        'username'),_.get(this.loginForm.value,'password'),
                         (err, res) => {
                            if (err) resolve(err)
                                resolve(res);
                            });
              });
              if(res){
                const alert = this.alertControl.create({
                    title:"登陆",
                    subTitle:"登陆失败，失败原因:"+_.get(res,'message'),
                    buttons:['OK']
                });
                alert.present();
            }else{
                this.loginForm.reset();
                console.log('login success')
                this.router.navigate(['/customers']);
            }
            /*console.log(this.loginSuccess)
            if(this.loginSuccess){
                console.log('before navigate')
                this.router.navigate(['/customers']);
            }*/
            
            
        }
    }
}