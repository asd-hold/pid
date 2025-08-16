import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import { ThemeProvider } from './shared/themes/ThemeProvider';
// import { AppProvider } from './app/AppProvider';
// import App from './App';
import AdminMain from './AdminMain';
// import SimpleApp from './SimpleApp';
import './global.css';
import './shared/config/i18n';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AdminMain />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
