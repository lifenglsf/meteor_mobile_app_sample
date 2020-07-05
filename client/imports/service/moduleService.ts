import { Injectable } from "@angular/core";
@Injectable()
 export class ModuleService{
    async addModule(module){
        return   await this.callWithPromise('addModule',module);
    }

    async updateModule(id,modules){
      return await this.callWithPromise('updateModule',{id,modules});
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
