
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Defines the information stored for each task.
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'normal' | 'high';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // Stores tasks and notifies subscribers of changes.
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  // Observable used by components to display tasks.
  tasks$ = this.tasksSubject.asObservable();

  // Adds a new task.
  addTask(title: string, priority: 'normal' | 'high' = 'normal'): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      priority
    };

    this.tasksSubject.next([
      ...this.tasksSubject.value,
      newTask
    ]);
  }

  // Marks a task as completed or incomplete.
  toggleTask(id: number): void {
    const updatedTasks = this.tasksSubject.value.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    this.tasksSubject.next(updatedTasks);
  }

  // Removes a task.
  deleteTask(id: number): void {
    const updatedTasks = this.tasksSubject.value.filter(
      task => task.id !== id
    );

    this.tasksSubject.next(updatedTasks);
  }
}
