import { render, screen } from '@testing-library/react';
import App from './App';
import Properties from './components/property_page/Properties';

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

test('renders app without crashing', () => {
  render(<App />)
});
