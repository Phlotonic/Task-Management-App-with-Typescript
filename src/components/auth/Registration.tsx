import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Registration: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleRegularRegistration = () => {
    loginWithRedirect({
        authorizationParams:{
            screen_hint: 'signup',
        }
    });
  };

  const handleGoogleRegistration = () => {
    loginWithRedirect({
        authorizationParams: {
            connection: 'google-oauth2', 
            screen_hint: 'signup',
        }
    });
  };

  return (
    <div>
      <button onClick={handleRegularRegistration}>
        Register with Email
      </button>
      <button onClick={handleGoogleRegistration}>
        Register with Google
      </button>
    </div>
  );
};

export default Registration;
