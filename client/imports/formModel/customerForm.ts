import {Mongo} from 'meteor/mongo';
export class customerForm{
    constructor(
        public company:string='',
        public fee_date:string='',
        public frequency:string='',
        public description:string=''
    ){

    }
        
    
}