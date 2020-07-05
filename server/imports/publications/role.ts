import {Meteor} from 'meteor/meteor';
import { roles } from 'imports/collections/role';
Meteor.publish('roleList',function(){
    console.log('publish role')
    /*var skip = (obj.page-1)*obj.limit;
    var objects = customers.find({},{skip:skip,limit:obj.limit});
    console.log(obj.limit,'limit',skip,'skip','result',objects.fetch());
    return objects;*/
    return roles.find({manager:this.userId});
});