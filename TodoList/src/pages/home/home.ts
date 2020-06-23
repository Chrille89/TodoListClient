import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private taskList : any[] = [];


  constructor(public navCtrl: NavController) {

  }

  public addTask() : void {
    if(this.taskName && this.taskName.length > 0) {
      this.taskList.push(this.taskName);
      this.taskName = "";
    }
 
  }

}
