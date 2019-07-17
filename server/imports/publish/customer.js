import {customers} from '../collections/customer';
Meteor.publish('customer.customerList',function(obj){
    skip = (obj.page-1)*obj.limit;
    objects = customers.find({},{skip:skip,limit:obj.limit});
    console.log(obj.limit,'limit',skip,'skip','result',objects.fetch());
    return objects;
});