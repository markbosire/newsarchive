import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import NewsArchive from './components/NewsArchive';
import NewsSearch from './components/NewsSearch';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

