import React, { useState, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: (handleCatchError: (error: Error) => void) => ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const resetErrorBoundary = () => {
        setHasError(false);
        setError(null);
    }

    const handleCatchError = (error: Error) => {
        setHasError(true);
        setError(error);
    };

    if (hasError) {
        return (
            <div className="p-4 bg-red-100 text-red-600">
                <h1>Something went wrong.</h1>
                <p>{error?.message}</p>
                <button onClick={resetErrorBoundary} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Try Again
                </button>
            </div>
        );
    }

    return <>{children(handleCatchError)}</>;
}


export default ErrorBoundary;