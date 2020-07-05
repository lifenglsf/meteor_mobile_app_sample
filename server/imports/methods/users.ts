import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';
import {_} from "lodash"
Meteor.methods({
    'users.create':(user)=>{
        console.log(user)
       return Accounts.createUser(user)
    },
    'users.update':(obj)=>{
        if(_.has(obj,'id') && _.get(obj,'id')){
            const id=_.get(obj,'id');
            const user = _.get(obj,'user')
            console.log(obj)
           return Meteor.users.update({_id:id},{$set:user})
      }
    }
})