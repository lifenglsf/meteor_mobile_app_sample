import { Meteor } from 'meteor/meteor';
import { customers } from '../../../imports/collections/customer';
console.log("abc");
Meteor.methods({
    addCustomer(obj){
        console.log("enter");
        return customers.insert(obj);
    },
    async publishCustomer(obj){
        //if(this.isSimulation){
            var skip = (obj.page-1)*obj.limit;
            return customers.find({},{skip:skip,limit:obj.limit}).fetch();
        //}
      
    },

    async countCustomer(){
        const count = customers.find().count();
        console.log(count);
        return count;
    }
});