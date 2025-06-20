export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  priority: 'low' | 'medium' | 'high';
}

export interface TaskFormData {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  priority: 'low' | 'medium' | 'high';
}
