import { Component, Inject } from '@angular/core';  
import {MAT_DIALOG_DATA} from '@angular/material'; 
@Component({  
    selector: 'dialog-error',  
    templateUrl:'./dialog.error.component.html'
})  
export class DialogErrorComponent{  
    constructor(@Inject(MAT_DIALOG_DATA) public message:any){  
    }  
}  