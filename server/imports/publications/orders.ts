import {Meteor} from 'meteor/meteor';
import {orders} from '../../../imports/collections/orders';
Meteor.publish('orders.list',function(){
    console.log('publish orders')
    /*var skip = (obj.page-1)*obj.limit;
    var objects = customers.find({},{skip:skip,limit:obj.limit});
    console.log(obj.limit,'limit',skip,'skip','result',objects.fetch());
    return objects;*/
    return orders.find({manager:this.userId});
});