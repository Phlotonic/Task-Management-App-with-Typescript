import { TaskFormData } from '../models/Task';

export const validateTaskFormData = (task: TaskFormData) => {
  const errors: Record<string, string> = {};

  if (!task.title.trim()) {
    errors.title = 'Title is required';
  } else if (task.title.length > 50) {
    errors.title = 'Title must be less than 50 characters';
  }

  if (!task.description.trim()) {
    errors.description = 'Description is required';
  } else if (task.description.length > 200) {
    errors.description = 'Description must be less than 200 characters';
  }

  if (task.dueDate && task.dueDate < new Date()) {
    errors.dueDate = 'Due date must be in the future';
  }

  return errors;
};
