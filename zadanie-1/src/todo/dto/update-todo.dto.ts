import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { TodoPriority, TodoStatus } from '../models/todo.model';

export class UpdateTodoDto {
  @ApiProperty({
    description: 'tytuł zadania',
  })
  @IsString()
  title: string;
  @ApiProperty({
    description: 'opis zadania',
  })
  description: string;

  @ApiProperty({
    enum: TodoStatus,
    description: 'Status zadania',
    example: TodoStatus.IN_PROGRESS,
  })
  status: TodoStatus;

  @ApiProperty({
    enum: TodoPriority,
    description: 'Priorytet zadania',
    example: TodoPriority.MEDIUM,
  })
  priority: TodoPriority;
}
