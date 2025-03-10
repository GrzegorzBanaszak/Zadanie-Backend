import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiQuery } from '@nestjs/swagger';
import { SortType } from './models/todo.model';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Sortuj po statusie',
    enum: SortType,
  })
  @ApiQuery({
    name: 'priority',
    required: false,
    description: 'Sortuj po priorytecie',
    enum: SortType,
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Sortuj po dacie utworzenia',
    enum: SortType,
  })
  getAll(
    @Query('status') status?: SortType,
    @Query('priority') priority?: SortType,
    @Query('date') date?: SortType,
  ) {
    let data = this.todoService.findAll();

    if (status) {
      data = this.todoService.SortByStatus(data, status);
    }

    if (priority) {
      data = this.todoService.SortByPriority(data, priority);
    }

    return data;
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() todo: CreateTodoDto) {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() todo: UpdateTodoDto) {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
