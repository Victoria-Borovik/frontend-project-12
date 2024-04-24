import React from 'react';
import ReactDOM from 'react-dom/client';
import init from './init';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <React.StrictMode>
      {await init()}
    </React.StrictMode>,
  );
};

app();
