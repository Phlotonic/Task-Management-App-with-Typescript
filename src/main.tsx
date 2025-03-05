import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { TaskProvider } from './contexts/TaskContext';
import { Auth0Provider } from '@auth0/auth0-react';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const AppWrapper: React.FC = () => {
  const auth0Domain = "dev-00zrxyb4mxu3ez8q.us.auth0.com";
  const auth0ClientId = "se085IqoHt1JSVRX87m6dPc6YZiHk18U";
  const auth0Audience = "http://localhost:5173";

  console.log("Auth0 Configuration:");
  console.log("  Domain:", auth0Domain);
  console.log("  ClientId:", auth0ClientId);

  const redirectUri = window.location.origin;
  console.log("  Redirect URI:", redirectUri);

  const authorizationParams = {
    redirect_uri: redirectUri,
    audience: auth0Audience,
  };

  console.log("  Authorization Parameters:", authorizationParams);


  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={authorizationParams}
    >
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </Auth0Provider>
  );
};

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
