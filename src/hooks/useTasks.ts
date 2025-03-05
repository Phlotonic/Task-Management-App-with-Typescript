import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '../models/Task';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../utils/api';

interface UseTasksResult {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  getTask: (id: string) => Promise<Task | undefined>;
  addTask: (taskData: TaskFormData) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const useTasks = (): UseTasksResult => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getAllTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to load tasks.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getTask = async (id: string) => {
    try {
      setError(null);
      return await getTaskById(id);
    } catch (err) {
      setError('Failed to get task.');
      return undefined;
    }
  };

  const addTask = async (taskData: TaskFormData) => {
    try {
      setError(null);
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Failed to add task.');
    }
  };

  const updateTask = async (task: Task) => {
    try {
      setError(null);
      const updatedTask = await updateTask(task);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setError(null);
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  return {
    tasks,
    loading,
    error,
    getTask,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
