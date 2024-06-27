import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './Routes.tsx';
import { Provider } from 'react-redux';
import store from './store';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>,
)
