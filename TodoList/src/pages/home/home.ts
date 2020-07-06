import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private host : string = "http://h2857701.stratoserver.net:8080";
  private todo : any;
  private taskList : any[] = [];

  constructor(private httpClient : HttpClient, public navCtrl: NavController) {
    this.todo = {};
  }

  ngOnInit() {
   this.getTasks();
  }

  public addTask(form: NgForm) : void {
    this.todo = form;
    this.postTask(this.todo);
  }

  public completeTask(id : number) : void {
    this.deleteTask(id);
  }

  public getTasks() : void {
    this.httpClient.get(this.host+"/all").subscribe((data: any[]) => {
      console.log("GET data: ",data);
      this.taskList = data;
    });
  }

  public postTask(task : any){
    this.httpClient.post(this.host+"/new",task).subscribe((data: any) => {
      console.log("Add new task: ",data);
      this.getTasks();
    });
  }

  public deleteTask(id:number) : void {
    this.httpClient.delete(this.host+"/"+id).subscribe((data: any[]) => {
      console.log("Delete task with id: ",id);
      this.getTasks();
    });
  }
}
