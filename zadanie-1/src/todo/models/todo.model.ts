enum TodoStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

enum TodoPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

class Todo {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  status: TodoStatus;
  priority: TodoPriority;
}

export { Todo, TodoStatus, TodoPriority, SortType };
