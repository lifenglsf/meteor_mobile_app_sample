import { Injectable } from "@angular/core";
@Injectable()
 export class CustomerService{
    async addCustomer(customer){
        return   await this.callWithPromise('addCustomer',customer);
        
    }
    callWithPromise = (method, myParameters) => {
        return new Promise((resolve, reject) => {
          Meteor.call(method, myParameters, (err, res) => {
            if (err) resolve(err)
            resolve(res);
          });
        });
    }
    abc :()=>{

    }
}