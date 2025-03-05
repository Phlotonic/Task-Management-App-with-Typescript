import { Task, TaskFormData } from '../models/Task';

// Mock data for demonstration
let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    description: 'Buy milk, eggs, bread, and cheese.',
    dueDate: new Date('2024-03-10'),
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Finish Project',
    description: 'Complete all remaining tasks for the project.',
    dueDate: new Date('2024-03-15'),
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getAllTasks = async (): Promise<Task[]> => {
  await simulateDelay(500); // Simulate network latency
  return mockTasks;
};

export const getTaskById = async (id: string): Promise<Task | undefined> => {
  await simulateDelay(500); // Simulate network latency
  return mockTasks.find((task) => task.id === id);
};

export const createTask = async (taskData: TaskFormData): Promise<Task> => {
  await simulateDelay(500); // Simulate network latency
  const newTask: Task = {
    id: Date.now().toString(), // Generate a new ID (replace with UUID in real API)
    ...taskData,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockTasks.push(newTask);
  return newTask;
};

export const updateTask = async (task: Task): Promise<Task> => {
  await simulateDelay(500); // Simulate network latency
  const index = mockTasks.findIndex((t) => t.id === task.id);
  if (index === -1) {
    throw new Error('Task not found');
  }
  mockTasks[index] = task;
  return task;
};

export const deleteTask = async (id: string): Promise<void> => {
  await simulateDelay(500); // Simulate network latency
  mockTasks = mockTasks.filter((task) => task.id !== id);
};
