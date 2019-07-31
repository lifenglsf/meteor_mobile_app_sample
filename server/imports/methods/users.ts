import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'users.create':(user)=>{
       return Accounts.createUser(user)
    }
})