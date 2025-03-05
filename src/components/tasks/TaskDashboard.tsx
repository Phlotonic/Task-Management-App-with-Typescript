import React from 'react';
import { useTask } from '../../contexts/TaskContext';
import TaskList from './TaskList';
import { Link } from 'react-router-dom';

const TaskDashboard: React.FC = () => {
  const { tasks, loading, error } = useTask();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='task-dashboard'>
      <h2>Task Dashboard</h2>
      <Link to="/protected/tasks/create">Create New Task</Link>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskDashboard;
