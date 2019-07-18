import { Meteor } from 'meteor/meteor';

import { Todos } from '../../../imports/collections/todos';

Meteor.publish('todoList', function() {
  console.log('todolist')
  return Todos.find({});
});
