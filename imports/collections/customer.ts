import { MongoObservable } from 'meteor-rxjs';

export const customers = new MongoObservable.Collection('customers');
