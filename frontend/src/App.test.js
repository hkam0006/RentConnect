import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(async () => {
  global.TextEncoder = require('util').TextEncoder;
  global.TextDecoder = require('util').TextDecoder;
});

test('renders app without crashing', () => {
  render(<App />)
});
