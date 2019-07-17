import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { customers } from '../../../../../imports/collections/customer';
import { Meteor } from 'meteor/meteor';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss','../../../../public/scss/bootstrap.scss'],
})



export class CustomersListComponent implements OnInit {
  customerList:any;
  demo:any;
  page = 1;
  pageSize = 1;
  collectionSize:any;
  constructor(private router:Router) { 
   this.getCustomerList();   
  }
  
  ngOnInit() {
    //console.log(this.customerList);
    //this.customerList = Session.get('customerList');
    
  }
  toAddCustomer(){
      this.router.navigateByUrl('/tabs/customer/add');
  }
  setCustomerList(customer){
    console.log(customer,"customerrrrrrrrrrr");
    this.customerList = customer;
  }
   callWithPromise = (method, myParameters) => {
    return new Promise((resolve, reject) => {
      Meteor.call(method, myParameters, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
  callSubscribeWithPromise = (method, myParameters) => {
    return new Promise((resolve, reject) => {
      Meteor.subscribe(method, myParameters, function(){
        resolve(true)
      });
    });
  }
  
   loadPage(page){
    this.page=page
    this.getCustomerList();
  }
  async getCustomerList(){
    const skip = (this.page-1)*this.pageSize
    await this.callSubscribeWithPromise('customer.customerList',{page:this.page,limit:this.pageSize});
    this.customerList = customers.find({},{skip:skip,limit:this.pageSize,transform:function(obj){
      if(obj.frequency==1){
        obj.frequencyConvert = '每月';
      }else if(obj.frequency==3){
        obj.frequencyConvert = '每季';
      }else if(obj.frequency==6){
        obj.frequencyConvert = '每半年';
      }else if(obj.frequency==12){
        obj.frequencyConvert = '每年';
      }
      
      console.log(this);
      obj.buildNextPayTime=(feeDate,rate)=>{
        var now = new Date();
        var nowYear = now.getFullYear();
        var nowMonth = now.getMonth()+1;
        var nowDay = now.getDate();
        var registerMonth = feeDate.month;
        var registerYear = feeDate.year;
        var nextMonth;
            console.log(feeDate,nowMonth,registerMonth,nowMonth-registerMonth);
            if(nowMonth>=registerMonth){
              var interval = nowMonth-registerMonth;
            
            }else{
              var nowMonth=nowMonth+12;
            }
            var mod = interval%rate;
            if(mod==0){
              mod=parseInt(rate);
            }
            nextMonth = nowMonth+mod;
            console.log(nowMonth);
            if(nextMonth>12){
              nextMonth = nextMonth%12;
              
              nowYear +=1;
            }
      
        if(nextMonth<10){
          nextMonth = '0'+nextMonth;
        }
        var next = nowYear+'-'+nextMonth;
        return next;
    }
    
      obj.nextPay = obj.buildNextPayTime(obj.fee_date,obj.frequency);
      
      return obj;
    }}).fetch();
    console.log(this.customerList);
    this.collectionSize= await this.callWithPromise('countCustomer',[]);   
  }

  
}
