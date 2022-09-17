import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
import { RecoilRoot } from 'recoil';

import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);
