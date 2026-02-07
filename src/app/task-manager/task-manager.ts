import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    priority: 'High',
    dueDate: new Date('2026-02-15'),
    status: 'Pending',
    createdAt: new Date('2026-02-01')
  },
  {
    id: 2,
    title: 'Complete .NET Interview Prep',
    description: 'Revise C#, OOP, SOLID and Web API',
    category: 'Career',
    priority: 'High',
    dueDate: new Date('2026-02-20'),
    status: 'Pending',
    createdAt: new Date('2026-02-05')
  },
  {
    id: 3,
    title: 'Workout Session',
    description: 'Leg day workout at gym',
    category: 'Health',
    priority: 'Medium',
    dueDate: new Date('2026-02-10'),
    status: 'Completed',
    createdAt: new Date('2026-02-08'),
    completedAt: new Date('2026-02-09')
  },
  {
    id: 4,
    title: 'Read Stock Market Basics',
    description: 'Go through Zerodha Varsity module 1',
    category: 'Finance',
    priority: 'Low',
    dueDate: new Date('2026-02-25'),
    status: 'Pending',
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

}
