import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../models/Task';

interface TaskContextProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Task) => Promise<void>;
  getTask: (id: string) => Promise<Task | undefined>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = async (task: Task) => {
    setTasks([...tasks, task]);
  };

  const getTask = async (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  const updateTask = async (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = async (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const contextValue: TaskContextProps = {
    tasks,
    loading,
    error,
    addTask,
    getTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};
