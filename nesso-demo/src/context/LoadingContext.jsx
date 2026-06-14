// frontend/src/context/LoadingContext.jsx
import { createContext, useContext, useState, useRef, useCallback } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const activeRequests = useRef(0);
  const timeoutId = useRef(null);

  const startRequest = useCallback(() => {
    activeRequests.current += 1;
    if (timeoutId.current === null && activeRequests.current === 1) {
      timeoutId.current = setTimeout(() => {
        if (activeRequests.current > 0) {
          setIsVisible(true);
        }
        timeoutId.current = null;
      }, 3000);
    }
  }, []);

  const endRequest = useCallback(() => {
    activeRequests.current = Math.max(activeRequests.current - 1, 0);
    if (activeRequests.current === 0) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
      setIsVisible(false);
    }
  }, []);

  return (
    <LoadingContext.Provider value={{ startRequest, endRequest, isLoading: isVisible }}>
      {children}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700">Caricamento in corso...</span>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};