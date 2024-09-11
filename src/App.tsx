import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
      <ErrorBoundary>
        {(handleCatchError) => (
          <Home handleCatchError={handleCatchError} />
        )}
      </ErrorBoundary>
  );
};

export default App;
