import React, { ReactNode } from 'react';
import './App.css';

interface AppProps {
    children?: ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
    return (
            <div className="app-container">
                {children}
            </div>
    );
};

export default App;
