import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, Button } from 'ionic-angular';
import { Meteor } from 'meteor/meteor';
import * as _ from 'lodash';
import {  Router } from '@angular/router';
import { CustomerService } from 'client/imports/service/customerService';
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
        if(Meteor.userId()){
            this.router.navigateByUrl('/customers');
        }else{
            this.loginForm = new FormGroup({
                'username':new FormControl('',[
                    Validators.required
                ]),
                'password':new FormControl('',[
                    Validators.required
                ])
            });
        }
       
    }
    async loginUser(){
        const formValue = this.loginForm.value;
        if(this.loginForm.invalid){
            const alert = this.alertControl.create({
                title:"登陆",
                subTitle:"登陆失败，请检查输入内容",
                buttons:['OK']
            });
            alert.present();
        }else{
            const res = await new Promise((resolve, reject) => {
                Meteor.loginWithPassword(
                    _.get(formValue,
                        'username'),_.get(formValue,'password'),
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
                const alert = this.alertControl.create({
                    title:"登陆",
                    subTitle:"登陆成功",
                    buttons:[{
                        text:'ok',
                        handler:()=>{
                            this.router.navigate(['/customers']);
                        }
                    }]
                });
                alert.present();
               
            }
          
        }
    }
}