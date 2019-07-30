import { Injectable } from '@angular/core';
import { Meteor } from 'meteor/meteor';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
 
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  getLoginStatus(){
    let res = false;
    if(Meteor.userId()){
        res = true;
    }
    return res;
  }
}