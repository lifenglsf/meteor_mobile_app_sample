import { Meteor } from 'meteor/meteor';
import { customers } from '../../../imports/collections/customer';
import * as _ from 'lodash'
console.log("abc");
Meteor.methods({
    addCustomer(obj){
        console.log("enter",obj);
        let res
        let type
        
        if(_.has(obj,'_id') && _.get(obj,'_id')){
              type="update";
              const id=_.get(obj,'_id');
              _.unset(obj,'_id')
             const sub = customers.update({_id:id},obj).subscribe((data)=>{
                res = data;
                 sub.unsubscribe()
                
             })
        }else{
            type="insert";
            const sub = customers.insert(obj).subscribe((data)=>{
                 console.log('insert data',data)
                 res = data;
                 sub.unsubscribe()
             });
        }
        
        console.log(type+' res',res);
        return res;
    },
    async publishCustomer(obj){
        //if(this.isSimulation){
            var skip = (obj.page-1)*obj.limit;
            return customers.find({},{skip:skip,limit:obj.limit}).fetch();
        //}
      
    }

   
});