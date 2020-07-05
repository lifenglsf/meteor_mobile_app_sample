import {Meteor} from 'meteor/meteor';
import { roles } from 'imports/collections/role';
Meteor.publish('userList',function(){
    console.log('publish')
    /*var skip = (obj.page-1)*obj.limit;
    var objects = customers.find({},{skip:skip,limit:obj.limit});
    console.log(obj.limit,'limit',skip,'skip','result',objects.fetch());
    return objects;*/
    return Meteor.users.find();
});