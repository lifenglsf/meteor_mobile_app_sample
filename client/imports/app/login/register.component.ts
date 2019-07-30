import { Component, OnInit } from "@angular/core";
import {Accounts} from 'meteor/accounts-base';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from 'ionic-angular';
@Component({
    templateUrl:"register.compnent.html"
})
export class Register implements OnInit{
    users = {}
    registerForm:FormGroup;
    constructor(public alertControl:AlertController){

    }
    ngOnInit(){
        this.registerForm = new FormGroup({
            'username':new FormControl(null,[
                Validators.required
            ]),
            'emails':new FormControl(null,[
                Validators.required,
                Validators.email
            ]),
            'password':new FormControl(null,[
                Validators.required
            ])
        });
    
    }
    registerUser(){
        //this.registerForm.markAsPristine();
        console.log(this.registerForm.value);
        if(this.registerForm.invalid){
           const  alert =this.alertControl.create({
                title:"注册用户",
                subTitle:"请检查您输入的表格的内容",
                buttons:['OK']
            });
            alert.present();
        }else{
            Accounts.createUser(this.registerForm.value,(err)=>{
                if(err){
                    const alert =this.alertControl.create({
                        title:"注册用户",
                        subTitle:"注册失败，失败原因"+err,
                        buttons:['OK']
                    })
                    alert.present()
                }
            })
            this.registerForm.reset();
        }
       
       
    }
}