import React, { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import TaskList from '../components/tasks/TaskList';
import { Link } from 'react-router-dom';
import TaskForm from '../components/tasks/TaskForm';

const TaskDashboard: React.FC = () => {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTask(); // Add createTask, updateTask, deleteTask
  const [isCreating, setIsCreating] = useState(false); // Track if creating a new task
  const [editingTask, setEditingTask] = useState<null | any>(null); // Track task being edited


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCreateTask = (newTask: any) => {
    createTask(newTask);
    setIsCreating(false); // Close the form after creation
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setIsCreating(true); // Open the form for editing
  };

  const handleUpdateTask = (updatedTask: any) => {
    updateTask(updatedTask);
    setEditingTask(null); // Close the form after update
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  return (
    <div className='task-dashboard'>
      <h2>Task Dashboard</h2>
      <button onClick={() => setIsCreating(!isCreating)}>
        {isCreating ? 'Cancel' : 'Create New Task'}
      </button>

      {isCreating && (
        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          initialValues={editingTask || {}} // Pass initial values for editing
        />
      )}

      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TaskDashboard;
