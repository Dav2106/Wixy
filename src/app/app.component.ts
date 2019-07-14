import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  tasks: Task[];
  task = new Task();

  constructor(private ts : TaskService){ }

  ngOnInit(){
    this.ts.getTasks().subscribe(data => {
      this.tasks = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
        } as Task;
      })
    });
  }

  create(){
    var data = JSON.parse(JSON.stringify(this.task));
    this.ts.createTask(data);
  }

  update(task: Task) {
    this.ts.updateTask(task);
  }

  delete(id: string) {
    this.ts.deleteTask(id);
  }
}
