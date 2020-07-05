import { Injectable } from "@angular/core";
@Injectable()
 export class UserService{
    

    async updateUser(id,user){
      return await this.callWithPromise('users.update',{id,user});
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
