import { Injectable } from "@angular/core";
@Injectable()
 export class RoleService{
    async addRole(role){
        return   await this.callWithPromise('addRole',role);
    }

    async updateRole(id,role){
      return await this.callWithPromise('updateRole',{id,role});
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
