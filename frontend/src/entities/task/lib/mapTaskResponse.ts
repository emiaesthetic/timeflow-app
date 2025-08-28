import { Task, TaskResponse } from '../model/types';

export function mapTaskResponse(item: TaskResponse): Task {
  return {
    ...item,
    date: new Date(item.date),
  };
}
