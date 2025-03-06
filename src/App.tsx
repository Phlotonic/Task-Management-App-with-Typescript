import React, { ReactNode } from 'react';
import './App.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { TaskProvider } from './contexts/TaskContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

interface AppProps {
    children?: ReactNode;
}

const App: React.FC<AppProps> = () => {
  const auth0Domain = "dev-00zrxyb4mxu3ez8q.us.auth0.com";
  const auth0ClientId = "se085IqoHt1JSVRX87m6dPc6YZiHk18U";
  const redirectUri = "http://localhost:5173/callback";

  console.log("Auth0 Configuration:");
  console.log("  Domain:", auth0Domain);
  console.log("  ClientId:", auth0ClientId);
  console.log("  Redirect URI:", redirectUri);

  const authorizationParams = {
    redirect_uri: redirectUri,
    scope: "openid profile email",
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

export default App;
