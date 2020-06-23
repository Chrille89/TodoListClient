import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private taskName : string;
  private taskList : any[] = [];

  constructor(private httpClient : HttpClient, public navCtrl: NavController) {

  }

  ngOnInit() {
   this.getTasks();
  }

  public addTask() : void {
    if(this.taskName && this.taskName.length > 0) {
      let task = {};
      task["label"] =  this.taskName;
      this.taskName = "";
      this.postTask(task);
    }
  }

  public completeTask(id : number) : void {
    this.deleteTask(id);
  }

  public getTasks() : void {
    this.httpClient.get("http://192.168.1.224:8080/all").subscribe((data: any[]) => {
      this.taskList = data;
    });
  }

  public postTask(task : any){
    this.httpClient.post("http://192.168.1.224:8080/new",task).subscribe((data: any) => {
      console.log("Add new task: ",data);
      this.getTasks();
    });
  }

  public deleteTask(id:number) : void {
    this.httpClient.delete("http://192.168.1.224:8080/"+id).subscribe((data: any[]) => {
      console.log("Delete task with id: ",id);
      this.getTasks();
    });
  }
}
