import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

interface Task{
  id : number;
  title : string;
  description : string;
  category : string;
  priority : string;
  dueDate : Date;
  status : string;
  createdAt : Date;
  completedAt? : Date;
}

@Component({
  selector: 'app-task-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.css',
})
export class TaskManager {
  tasks: Task[] = [
  {
    id: 1,
    title: 'Learn Angular Basics',
    description: 'Understand components, modules and data binding',
    category: 'Learning',
    priority: 'high',
    dueDate: new Date('2024-12-15'),
    status: 'pending',
    createdAt: new Date('2026-02-01')
  },
  {
    id: 2,
    title: 'Complete .NET Interview Prep',
    description: 'Revise C#, OOP, SOLID and Web API',
    category: 'Career',
    priority: 'high',
    dueDate: new Date('2026-02-20'),
    status: 'pending',
    createdAt: new Date('2026-02-05')
  },
  {
    id: 3,
    title: 'Workout Session',
    description: 'Leg day workout at gym',
    category: 'Health',
    priority: 'medium',
    dueDate: new Date('2026-02-10'),
    status: 'completed',
    createdAt: new Date('2026-02-08'),
    completedAt: new Date('2026-02-09')
  },
  {
    id: 4,
    title: 'Read Stock Market Basics',
    description: 'Go through Zerodha Varsity module 1',
    category: 'Finance',
    priority: 'low',
    dueDate: new Date('2026-02-25'),
    status: 'pending',
    createdAt: new Date('2026-02-07')
  }
];

// Dropdown Options
categories: string[] = [
  'work',
  'personal',
  'shopping',
  'health',
  'finance',
  'education',
  'other'
];

priorities: string[] = [
  'low',
  'medium',
  'high',
  'urgent'
];

statuses: string[] = [
  'pending',
  'in-progress',
  'completed',
  'cancelled'
];
 
// Form Data
newTask: {
  title : string,
  description : string,
  category : string,
  priority : string,
  dueDate : Date | string,
  status : string
}={
  title: '',
  description: '',
  category: '',
  priority : 'medium',
  dueDate : '',
  status : 'pending'
};

//filter controls
filterStatus : string = 'all';
filterCategory : string = 'all';
filterPriority : string = 'all';
showCompleted : boolean = true;

//method
getCompletedTaskCount(): number{
  return this.tasks.filter(task => task.status === 'completed').length;
}

getPendingTaskCount(): number{
  return this.tasks.filter(task => task.status === 'pending').length;
}

getOverdueTaskCount(): number{
  const today = new Date();
  today.setHours(0,0,0,0);
  return this.tasks.filter(task => new Date(task.dueDate) < today && task.status != 'completed').length;
}

getCompletionRate() : number{
  if (this.tasks.length == 0) {
    return 0;
  }
  return Math.round((this.getCompletedTaskCount() / this.tasks.length) * 100);
}

getProductivityLevel() : string
{
  const rate = this.getCompletionRate();
  if (rate >= 80) return "excellent";
  if (rate >= 60) return "good";
  if (rate >= 40) return "needs-improvement";
  return "poor"; 
}

onFieldFocus(field : string) : void 
{

}

onFieldBlur(field : string) : void
{

}

addTask() : void
{
  if (!this.newTask.title || !this.newTask.category || !this.newTask.dueDate) {
    return;
  }

  const task : Task = {
    id : Date.now(),
    title : this.newTask.title,
    description : this.newTask.description,
    category : this.newTask.category,
    priority : this.newTask.priority,
    dueDate : new Date(this.newTask.dueDate),
    status : this.newTask.status,
    createdAt : new Date(),    
  }

  this.tasks.push(task);
  this.clearForm();
}

clearForm() : void
{
  this.newTask = {
    title : '',
    description :'',
    category : '',
    priority : 'medium',
    dueDate : '',
    status : 'pending'
  }
}

getFilteredTasks() : Task[]
{
  let filtered = [...this.tasks];

  if(this.filterStatus != 'all')
  {
    filtered = filtered.filter(task => task.status === this.filterStatus);
  }

  if(this.filterCategory != 'all')
  {
    filtered = filtered.filter(task => task.category === this.filterCategory);
  }

  if(this.filterPriority != 'all')
  {
    filtered = filtered.filter(task => task.priority === this.filterPriority);
  }

  if(!this.showCompleted)
  {
    filtered = filtered.filter(task => task.status !== 'completed');
  }

  return filtered;
}

toggelTaskComplete(id : number)
{
  const task = this.tasks.find(t => t.id === id);
  if (task) {
    if (task.status === 'completed') {
      task.status = 'pending'; 
      delete task.completedAt;     
    }
    else{
      task.status = 'completed';
      task.completedAt = new Date();
    }
  }
}

isOverdue(task : Task) : boolean
{
  const today = new Date();
  today.setHours(0,0,0,0);
  return new Date(task.dueDate) < today && task.status != "completed";
}

deleteTask(id : number) : void
{
  const index = this.tasks.findIndex(task => task.id === id);
  if(index != -1)
  {
    this.tasks.splice(index,1);
  }
}



}
