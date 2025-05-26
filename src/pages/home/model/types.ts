export interface ITaskFormData {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  priority: 'low' | 'medium' | 'high';
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  priority: 'low' | 'medium' | 'high';
}
