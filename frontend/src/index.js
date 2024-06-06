import React from 'react';
import ReactDOM from 'react-dom/client';
import init from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <React.StrictMode>
      {await init()}
    </React.StrictMode>,
  );
};

app();
