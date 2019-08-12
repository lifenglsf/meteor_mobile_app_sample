import { Meteor } from 'meteor/meteor';
import { customers } from '../../../imports/collections/customer';
import * as _ from 'lodash'
import { orders } from 'imports/collections/orders';
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
    addOrder(obj){
        return orders.insert(obj);
        
    },
    updateOrder(id,obj){
        return orders.update({_id:id},obj);
    },
    async publishCustomer(obj){
        //if(this.isSimulation){
            var skip = (obj.page-1)*obj.limit;
            return customers.find({"manager":this.userId},{skip:skip,limit:obj.limit}).fetch();
        //}
      
    }

   
});