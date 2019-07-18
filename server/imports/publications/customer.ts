import {Meteor} from 'meteor/meteor';
import {customers} from '../../../imports/collections/customer';
Meteor.publish('abc',function(){
    console.log('publish')
    /*var skip = (obj.page-1)*obj.limit;
    var objects = customers.find({},{skip:skip,limit:obj.limit});
    console.log(obj.limit,'limit',skip,'skip','result',objects.fetch());
    return objects;*/
    return customers.find();
});