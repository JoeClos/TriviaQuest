import React from 'react';
import ErrorBoundary from './components/ErrorBoundary ';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    // <Router>
      <ErrorBoundary>
        {(handleCatchError) => (
          <Home handleCatchError={handleCatchError} />
          // <Routes>
          //   <Route path="/" element={<Home handleCatchError={handleCatchError} />} />
          // </Routes>
        )}
      </ErrorBoundary>
    // </Router>
  );
};

export default App;
