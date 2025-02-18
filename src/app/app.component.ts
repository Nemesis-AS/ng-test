import { Component } from '@angular/core';

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentTaskText: string = '';
  tasks: Task[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  addTask() {
    this.tasks.push({
      title: this.currentTaskText,
      completed: false,
    });

    this.currentTaskText = '';
    this.saveToLocalStorage();
  }

  updateCompleted(taskObj: Task) {
    for (const task of this.tasks) {
      if (task === taskObj) {
        task.completed = !task.completed;
      }
    }

    this.saveToLocalStorage();
  }

  deleteTask(taskObj: Task) {
    this.tasks = this.tasks.filter((task) => !(task === taskObj));

    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('ng-tasks', JSON.stringify(this.tasks));
  }

  loadFromLocalStorage() {
    if (!localStorage.getItem('ng-tasks')) return;

    this.tasks = JSON.parse(localStorage.getItem('ng-tasks') || '[]');
  }
}
