import { Meteor } from 'meteor/meteor';
import { roles } from '../../../imports/collections/role';
import * as _ from 'lodash'
Meteor.methods({
    addRole(obj){
        if(_.has(obj,'_id') && _.get(obj,'_id')){
              const id=_.get(obj,'_id');
              _.unset(obj,'_id')
             const sub = roles.update({_id:id},obj)
        }else{
            return roles.insert(obj);
        }
        
    },
   
    updateRole(objects){
        const id = _.get(objects,'id');
        const obj = _.get(objects,'role');
        console.log(objects)
        return roles.update({_id:id},{$set:obj});
    },
    async publishRole(obj){
        //if(this.isSimulation){
            var skip = (obj.page-1)*obj.limit;
            return roles.find({"manager":this.userId},{skip:skip,limit:obj.limit}).fetch();
        //}
      
    }

   
});