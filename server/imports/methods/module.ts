import * as _ from 'lodash'
import {Meteor} from 'meteor/meteor';

import {modules} from '../../../imports/collections/module';

Meteor.methods({
  addModule(obj) {
    if (_.has(obj, '_id') && _.get(obj, '_id')) {
      const id = _.get(obj, '_id');
      _.unset(obj, '_id')
      const sub = modules.update({_id: id}, obj)
    } else {
      return modules.insert(obj);
    }
  },

  updateModule(objects) {
    const id = _.get(objects, 'id');
    const obj = _.get(objects, 'module');
    return modules.update({_id: id}, obj);
  },
  async publishModule(obj) {
    // if(this.isSimulation){
    var skip = (obj.page - 1) * obj.limit;
    return modules
        .find({'manager': this.userId}, {skip: skip, limit: obj.limit})
        .fetch();
    //}
  }


});