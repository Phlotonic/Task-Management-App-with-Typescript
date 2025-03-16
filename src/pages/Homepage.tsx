import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Registration from '../components/auth/Registration';
import Logout from '../components/auth/Logout';
import Login from '../components/auth/Login';
import TaskDashboard from './TaskDashboard';

const Homepage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0(); // Added isLoading

  if (isLoading) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <h1>Homepage</h1>
      {!isAuthenticated && (
        <>
          <Login />
          <Registration />
        </>
      )}
      {isAuthenticated && (
        <>
          <TaskDashboard />
          <Logout />
        </>
      )}
    </div>
  );
};

export default Homepage;
