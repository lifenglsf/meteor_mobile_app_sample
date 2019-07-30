import { Meteor } from 'meteor/meteor';
import { customers } from '../../../imports/collections/customer';
import * as _ from 'lodash'
Meteor.methods({
    addCustomer(obj){
        if(_.has(obj,'_id') && _.get(obj,'_id')){
              const id=_.get(obj,'_id');
              _.unset(obj,'_id')
             const sub = customers.update({_id:id},obj)
        }else{
            return customers.insert(obj);
        }
        
    },
    async publishCustomer(obj){
        //if(this.isSimulation){
            var skip = (obj.page-1)*obj.limit;
            return customers.find({},{skip:skip,limit:obj.limit}).fetch();
        //}
      
    }

   
});