import { render, screen } from '@testing-library/react';
import App from './App';
import Properties from './components/property_page/Properties';

test('TextEncoder is globally defined in Jest', () => {
  expect(global.TextEncoder).toBeDefined();
});

test('TextDecoder is globally defined in Jest', () => {
  expect(global.TextDecoder).toBeDefined();
});


test('renders app without crashing', () => {
  render(<Properties />)
});
