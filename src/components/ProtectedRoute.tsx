import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const location = useLocation();

console.log("isAuthenticated", isAuthenticated);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/callback" replace />;
};

export default ProtectedRoute;
