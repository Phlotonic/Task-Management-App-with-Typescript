import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Registration from '../components/auth/Registration';
import Logout from '../components/auth/Logout';
import Login from '../components/auth/Login';

const Homepage: React.FC = () => {
  const { isAuthenticated } = useAuth0();

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
       <Logout />
      )}
    </div>
  );
};

export default Homepage;
