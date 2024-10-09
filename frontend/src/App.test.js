import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './utils/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@mui/x-charts/BarChart', () => ({
  BarChart: () => null, // Return a simple functional component that renders nothing
}));

let persistor = persistStore(store)

test('renders app without crashing', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Router>
      </Provider>
  </React.StrictMode>
  )
});
