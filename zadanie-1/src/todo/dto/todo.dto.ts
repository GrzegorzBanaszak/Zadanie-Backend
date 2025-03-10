import { Expose } from 'class-transformer';
import { TodoPriority, TodoStatus } from '../models/todo.model';

class TodoDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  description?: string;
  @Expose()
  status: TodoStatus;
  @Expose()
  priority: TodoPriority;
}

export { TodoDto };
