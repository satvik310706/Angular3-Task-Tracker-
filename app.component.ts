import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Task} from './task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  taskName = '';
  taskPriority: 'High' | 'Medium' | 'Low' = 'Medium';
  taskDueDate = '';
  tasks: Task[] = [];
  filter = 'all';

  addTask(taskNameRef: any, priorityRef: any, dueDateRef: any) {
    if (!this.taskName || !this.taskDueDate) return;

    const newTask: Task = {
      name: this.taskName,
      priority: this.taskPriority,
      dueDate: this.taskDueDate,
      completed: false
    };

    this.tasks.push(newTask);

    // Reset inputs using template refs
    taskNameRef.value = '';
    priorityRef.value = 'Medium';
    dueDateRef.value = '';
    this.taskName = '';
    this.taskPriority = 'Medium';
    this.taskDueDate = '';
  }

  toggleStatus(task: Task) {
    task.completed = !task.completed;
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all tasks?')) {
      this.tasks = [];
    }
  }

  filteredTasks(): Task[] {
    if (this.filter === 'completed') return this.tasks.filter(t => t.completed);
    if (this.filter === 'pending') return this.tasks.filter(t => !t.completed);
    return this.tasks;
  }

  getColor(priority: string): string {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'green';
      default: return 'black';
    }
  }

  isOverdue(task: Task): boolean {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate < today && !task.completed;
  }

  get completedCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  get pendingCount(): number {
    return this.tasks.filter(t => !t.completed).length;
  }

  get overdueCount(): number {
    return this.tasks.filter(t => this.isOverdue(t)).length;
  }
}