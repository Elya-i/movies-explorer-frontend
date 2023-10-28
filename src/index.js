import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { MoviesProvider } from './contexts/MoviesContext';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MoviesProvider>
        <App/>
    </MoviesProvider>  
    </BrowserRouter>
  </React.StrictMode>
);
