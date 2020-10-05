import {modules} from 'imports/collections/module';
import {Meteor} from 'meteor/meteor';

Meteor.publish('moduleList', function() {
  console.log('publish')
  /*var skip = (obj.page-1)*obj.limit;
  var objects = customers.find({},{skip:skip,limit:obj.limit});
  console.log(obj.limit,'limit',skip,'skip','result',objects.fetch());
  return objects;*/
  return modules.find({});
});