import { render, screen } from '@testing-library/react';
import App from './App';

test('TextEncoder is globally defined in Jest', () => {
  expect(global.TextEncoder).toBeDefined();
});

test('renders app without crashing', () => {
  render(<App />)
});
