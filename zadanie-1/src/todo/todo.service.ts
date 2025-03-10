import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SortType, Todo, TodoPriority, TodoStatus } from './models/todo.model';
import * as fs from 'fs/promises';
import * as path from 'path';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TodoService {
  private readonly filePath = path.join(__dirname, '..', '..', 'data.json');
  todos: Array<Todo>;

  constructor() {
    this.loadData();
  }

  findAll(data?: SortType): Array<TodoDto> {
    let date: Array<TodoDto> = [];

    if (data) {
      if (data === SortType.ASC) {
        date = this.todos.sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
        );
      } else {
        date = this.todos.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );
      }
    } else {
      date = this.todos;
    }

    date = plainToInstance(TodoDto, date, {
      excludeExtraneousValues: true,
    });
    return date;
  }

  SortByStatus(data: Array<TodoDto>, status: SortType) {
    const statusOrder = {
      PENDING: 1,
      IN_PROGRESS: 2,
      COMPLETED: 3,
      CANCELED: 4,
    };

    let sortedByStatus: Array<TodoDto> = [];

    if (status === SortType.ASC) {
      sortedByStatus = data
        .slice()
        .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    } else {
      sortedByStatus = data
        .slice()
        .sort((a, b) => statusOrder[b.status] - statusOrder[a.status]);
    }

    return sortedByStatus;
  }
  SortByPriority(data: Array<TodoDto>, priority: SortType) {
    const priorityOrder = {
      LOW: 1,
      MEDIUM: 2,
      HIGH: 3,
    };
    let sortedByPriority: Array<TodoDto> = [];

    if (priority === SortType.ASC) {
      sortedByPriority = data
        .slice()
        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else {
      sortedByPriority = data
        .slice()
        .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }

    return sortedByPriority;
  }

  findOne(id: string): TodoDto {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }

  async create(todo: CreateTodoDto) {
    const createdTodo: Todo = {
      id: crypto.randomUUID(),
      title: todo.title,
      description: todo.description,
      createdAt: new Date(),
      status: todo.status || TodoStatus.PENDING,
      priority: todo.priority || TodoPriority.LOW,
    };
    this.todos.push(createdTodo);
    await this.saveData();
    const { createdAt, ...rest } = createdTodo;
    return rest;
  }

  async update(id: string, todo: UpdateTodoDto) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      title: todo.title,
      description: todo.description,
    };

    await this.saveData();

    return this.todos[todoIndex];
  }

  async delete(id: string) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    const todo = this.todos[todoIndex];

    this.todos.splice(todoIndex, 1);

    await this.saveData();

    return todo;
  }

  private async loadData() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      this.todos = JSON.parse(data);
    } catch (err) {
      this.todos = [];
    }
  }

  private async saveData() {
    try {
      await fs.writeFile(
        this.filePath,
        JSON.stringify(this.todos, null, 2),
        'utf-8',
      );
    } catch (err) {
      console.error(err);
    }
  }
}
