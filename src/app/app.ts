
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { ShortenPipe } from './shorten.pipe';


import { HighlightDirective } from './highlight.directive';


@Component({
  selector: 'app-root',
  imports: [FormsModule, AsyncPipe, ShortenPipe, HighlightDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Inject the task service.
  private taskService = inject(TaskService);

  // Get tasks from the observable.
  tasks$ = this.taskService.tasks$;

  newTaskTitle = '';
  newTaskPriority: 'normal' | 'high' = 'normal';

  // Add a new task.
 
  // Add a new task.
  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(
        this.newTaskTitle,
        this.newTaskPriority
      );

      this.newTaskTitle = '';
      this.newTaskPriority = 'normal';
    }
  }


  // Mark a task as completed or incomplete.
  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  // Delete a task.
  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}
