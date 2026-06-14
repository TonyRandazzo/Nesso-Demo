import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { LoadingProvider } from './context/LoadingContext';
import { setLoadingManager } from './lib/axios';
import { useLoading } from './context/LoadingContext';

const AxiosLoaderConnector = () => {
  const loadingManager = useLoading();
  React.useEffect(() => {
    setLoadingManager(loadingManager);
  }, [loadingManager]);
  return null;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingProvider>
      <BrowserRouter>
        <AxiosLoaderConnector />
        <App />
      </BrowserRouter>
    </LoadingProvider>
  </React.StrictMode>
);